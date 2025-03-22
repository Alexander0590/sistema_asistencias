<?php
 include('../conecxion/conecxion.php');

 $action = $_GET['action'] ?? '';


 switch ($action) {
    case 'readcargo':
        $adni = $_POST['adni'];

        $sql = "SELECT c.nombre
        FROM personal p
        JOIN cargos c ON p.idcargo = c.idcargo
        WHERE p.dni = '$adni'";
        $result = $cnn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $cargo = $row['nombre'];
            echo $cargo; 
        } else {
            echo "no_encontrado"; 
        }
    break;
    case 'crearasisegu':
    $adni = $_POST['adni'];
    $fecha_actual = $_POST['fecha_actual'];
    $dia = $_POST['dia'];
    $estado = $_POST['estado'];
    $ashora = $_POST['ashora']; 
    $turno = trim($_POST['turno']);

    // Definir la hora de tolerancia según el turno
    if ($turno == "Mañana") {
        $hora_tolerancia = "08:15:59";
    } elseif ($turno == "Tarde") {
        $hora_tolerancia = "18:10:59";
    } else {
        die("Error: Turno no válido.");
    }


    if ($estado == "Salida") {
        $query = "SELECT idasisse, horas FROM asistencia_seguridad WHERE dni = '$adni' AND fecha = '$fecha_actual'";
        $resultado = $cnn->query($query);

        if ($resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();

            if (!empty($fila['horas'])) {
                echo "Su salida ya fue registrada previamente.";
            } else {
                $updateQuery = "UPDATE asistencia_seguridad SET horas = '$ashora' WHERE dni = '$adni' AND fecha = '$fecha_actual'";

                if ($cnn->query($updateQuery) === TRUE) {
                    echo "Hora de salida  de personal de serenazgo registrada correctamente.";
                } else {
                    echo "Error al actualizar la salida: " . $cnn->error;
                }
            }
        } else {
            echo "No tiene un registro de entrada en el día de hoy.";
        }
} else {
    $query = "SELECT idasisse FROM asistencia_seguridad WHERE dni = '$adni' AND fecha = '$fecha_actual'";
    $resultado = $cnn->query($query);

    if ($resultado->num_rows > 0) {
        echo "Su entrada ya fue registrada previamente.";
    } else {
        // Si el estado es "Tardanza", calcular la penalización
        if ($estado == "Tardanza") {
            $query = "SELECT sueldo FROM personal WHERE dni = '$adni'";
            $resultado = $cnn->query($query);

            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
                $sueldo = $fila['sueldo'];

                // Convertir a formato de fecha y hora
                $hora_tolerancia_dt = new DateTime($hora_tolerancia);
                $hora_llegada_dt = new DateTime($ashora);

                if ($hora_llegada_dt > $hora_tolerancia_dt) {
                    // Calcular la diferencia en minutos
                    $diferencia = $hora_llegada_dt->diff($hora_tolerancia_dt);
                    $minutos_tardanza = $diferencia->h * 60 + $diferencia->i;

                    // Calcular descuento por minuto
                    $sueldo_diario = $sueldo / 30;  
                    $pago_por_minuto = $sueldo_diario / 480; 
                    $descuento_total = $pago_por_minuto * $minutos_tardanza;
                    $descuento_total = number_format($descuento_total, 2, '.', '');

                    $sql = "INSERT INTO asistencia_seguridad (dni, fecha, dia, estado, horai, minutos_descu, descuento_dia, turno) 
                            VALUES ('$adni', '$fecha_actual', '$dia', '$estado', '$ashora', '$minutos_tardanza', '$descuento_total', '$turno')";
                    
                    if ($cnn->query($sql) === TRUE) {
                        echo "Tardanza registrada: $minutos_tardanza minutos. Descuento: S/ " . number_format($descuento_total, 2);
                    } else {
                        echo "Error al registrar la asistencia.";
                    }
                } else {
                    echo "Llegó dentro del horario permitido.";
                }
            } else {
                echo "No se encontró el trabajador con DNI: $adni";
            }
        } else {
            // Registro normal de asistencia
            $sql = "INSERT INTO asistencia_seguridad (dni, fecha, dia, estado, horai, turno, minutos_descu, descuento_dia) 
                    VALUES ('$adni', '$fecha_actual', '$dia', '$estado', '$ashora', '$turno', 0, 0)";

            if ($cnn->query($sql) === TRUE) {
                echo "Personal Serenazgo registrado correctamente.";
            } else {
                echo "Error al registrar la asistencia.";
            }
        }
    }
}
      
      // Cerrar conexión
      $cnn->close();
    break;
    default:
echo json_encode(["status" => "error", "message" => "Acción no válida"]);
}
?>