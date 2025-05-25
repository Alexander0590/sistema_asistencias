<?php
 include('../conecxion/conecxion.php');

 $action = $_GET['action'] ?? '';

 date_default_timezone_set('America/Lima');
 switch ($action) {
    case 'resali':
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Obtener los datos enviados por POST
        $dni = $_POST['dni'] ?? '';
        $fecha_salida = $_POST['fecha_salida'] ?? '';
        $hora_salida = $_POST['hora_salida'] ?? '';
        $hora_reingreso = $_POST['hora_reingreso'] ?? '';
        $motivo = $_POST['motivo'] ?? '';
        $turno = $_POST['turno'] ?? '';
        $alterna = $_POST['alterna'] ?? '';
        $comentario = $_POST['comentario'] ?? '';
       $hoy= date('Y-m-d');
        //si retonra o no
        if($alterna=="no"){
            $hora="16:30:00";
            if($turno=="Mañana"){
            $sql = "UPDATE asistencia SET horast = '$hora', horait='14:00:00',horasm='13:00:00', estadot='Puntual',tiempo_tardanza_dia=0 WHERE dni = '$dni' AND fecha = '$fecha_salida'";
            $stmt = $cnn->prepare($sql);
            $stmt->execute();
            }else{
                $sql = "UPDATE asistencia SET horast = '$hora', estadot='Puntual',tiempo_tardanza_dia=0 WHERE dni = '$dni' AND fecha = '$fecha_salida'";
            $stmt = $cnn->prepare($sql);
            $stmt->execute();
            }
        }else{
            $hora=$hora_reingreso;
        }

      // Convertir fecha a timestamp
        $timestamp = strtotime($fecha_salida);

        // Calcular el día de la semana en español sin acentos
        $dia_semana_es = date("N", $timestamp);
        $dias_espanol = ["", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
        $dia_es = $dias_espanol[$dia_semana_es];

        $sql_check_asistencia = "SELECT * FROM asistencia WHERE dni = '$dni' AND fecha = '$fecha_salida'  ";
        $result_check_asistencia = $cnn->query($sql_check_asistencia);

        $sql_check_asistencia2 = "SELECT * FROM asistencia WHERE dni = '$dni' AND fecha = '$fecha_salida' and estadot='Falta'";
        $result_check_asistencia2 = $cnn->query($sql_check_asistencia2);

        $sql_check_salida = "SELECT * FROM salidas WHERE dni = '$dni' AND estado = 'En proceso' ";
        $result_check_salida = $cnn->query( $sql_check_salida);
            if ($result_check_salida->num_rows > 0) {
                    echo "Esta persona ya tiene una salida en proceso.";
                    exit;
                }
            if ($result_check_asistencia2->num_rows > 0) {
                    echo "Esta persona esta registrado como faltante el dia de hoy.";
                    exit;
            }


            if ($result_check_asistencia->num_rows == 0) {
                $sql_check_asistencia_seguridad = "SELECT * FROM asistencia_seguridad WHERE dni = '$dni' AND fecha ='$fecha_salida' ";
                $result_check_asistencia_seguridad = $cnn->query($sql_check_asistencia_seguridad);
                
                
                // Si tampoco se encuentra ninguna entrada, mostrar un mensaje de error
                if ($result_check_asistencia_seguridad->num_rows == 0) {
                    echo "No se ha registrado ninguna entrada para este DNI en el día de hoy. No se puede registrar la salida.";
                    exit;
                }
            }
          if($alterna=="si" ){
            // Preparar la consulta SQL para insertar la salida
            $sql_insert = "INSERT INTO salidas (dni, dia , fecha_salida, hora_salida, hora_reingreso, motivo, turno, comentario,estado,tiene_reingreso) 
                        VALUES ('$dni', '$dia_es','$fecha_salida', '$hora_salida', '$hora', '$motivo', '$turno', '$comentario','En proceso','$alterna')";
          }else{
// Preparar la consulta SQL para insertar la salida
            $sql_insert = "INSERT INTO salidas (dni, dia , fecha_salida, hora_salida, hora_reingreso, motivo, turno, comentario,estado,tiene_reingreso,hora_ingreso_real) 
                        VALUES ('$dni', '$dia_es','$fecha_salida', '$hora_salida', '$hora', '$motivo', '$turno', '$comentario','Ingreso correctamente','$alterna','$hora')";
          }
            // Ejecutar la consulta
            if ($cnn->query($sql_insert) === TRUE) {
                echo "ok";
            } else {
                echo "Error al insertar: " . $cnn->error;
            }
            } else {
            echo "Método no permitido.";
            }
    break;
    case 'readhoysal':
        $fecha = $_GET['fecha'] ?? date('Y-m-d');
        $sql = "SELECT s.*, p.apellidos, p.nombres 
        FROM salidas s
        INNER JOIN personal p ON s.dni = p.dni
        WHERE s.fecha_salida = '$fecha'";
        $result = mysqli_query($cnn, $sql);
        
        $salidas = [];
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $salidas[] = $row;
            }
        }
        echo json_encode($salidas);
  
    break;
    case 'readone':
        if (isset($_GET['id_salida'])) {
            $id = intval($_GET['id_salida']); 
            $sql = "SELECT * FROM salidas WHERE id_sali = $id";
            $result = mysqli_query($cnn, $sql);
        
            if ($result && mysqli_num_rows($result) > 0) {
                $salida = mysqli_fetch_assoc($result);
                echo json_encode($salida);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Salida no encontrada.']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID de salida no recibido.']);
        }
    break;
    case 'updatesali':

        $id = $_POST['id'];
        $dni = $_POST['dni'];
        $fecha_salida = $_POST['fecha_salida'];
        $hora_salida = $_POST['hora_salida'];
        $hora_reingreso = $_POST['hora_reingreso'];
        $motivo = $_POST['motivo'];
        $turno = $_POST['turno'];
        $comentario = $_POST['comentario'];

        if (
            empty($id) || empty($dni) || empty($fecha_salida) || empty($hora_salida) ||
            empty($hora_reingreso) || empty($motivo) || empty($turno)
        ) {
            echo "Todos los campos obligatorios deben ser completados.";
            exit;
        }

        // Prepara la actualización
        $sql = "UPDATE salidas SET 
                    dni = ?, 
                    fecha_salida = ?, 
                    hora_salida = ?, 
                    hora_reingreso = ?, 
                    motivo = ?, 
                    turno = ?, 
                    comentario = ? 
                WHERE id_sali = ?";

        $stmt = $cnn->prepare($sql);
        if ($stmt->execute([$dni, $fecha_salida, $hora_salida, $hora_reingreso, $motivo, $turno, $comentario, $id])) {
            echo "ok";
        } else {
            echo "Error al actualizar la salida.";
        }
     break;
    case'reportesalidas':
        $query = "SELECT * FROM salidas";
        $result = mysqli_query($cnn, $query);

        $salida = [];
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $salida[] = $row;
            }
        }

        echo json_encode($salida);
    break;
    case 'filtroresali':
        if (!empty($_GET['dnire']) || (!empty($_GET['fechai']) && !empty($_GET['fechaf']))) {
            // Obtener los parámetros desde la solicitud GET
            $dni = isset($_GET['dnire']) ? trim($_GET['dnire']) : '';
            $fechai = isset($_GET['fechai']) ? trim($_GET['fechai']) : '';
            $fechaf = isset($_GET['fechaf']) ? trim($_GET['fechaf']) : '';
        
            // Construir la consulta base
            $query = "SELECT * FROM salidas WHERE 1";
        
            // Si el DNI no está vacío, agregar filtro a la consulta
            if (!empty($dni)) {
                $dni = mysqli_real_escape_string($cnn, $dni); // Escape para evitar SQL injection
                $query .= " AND dni = '$dni'";
            }
        
            // Si las fechas están definidas, agregar filtro por rango de fechas
            if (!empty($fechai) && !empty($fechaf)) {
                // Convertir las fechas a formato 'Y-m-d' (asegurarse de que sean válidas)
                $fechai = mysqli_real_escape_string($cnn, $fechai);
                $fechaf = mysqli_real_escape_string($cnn, $fechaf);
                $query .= " AND fecha_salida BETWEEN '$fechai' AND '$fechaf'";
            }
        
            // Ejecutar la consulta
            $result = mysqli_query($cnn, $query);
        
            // Verificar si se obtuvo un resultado
            if ($result) {
                $fsalida = mysqli_fetch_all($result, MYSQLI_ASSOC); // Obtener los resultados en formato de array asociativo
                header('Content-Type: application/json');
                echo json_encode($fsalida); 
            } else {
                echo json_encode(['error' => 'Error al ejecutar la consulta: ' . mysqli_error($cnn)]);
            }
        } else {
            echo json_encode(['error' => 'Los campos están vacíos']);
        }
break;
 case'updateestado':
   $id = $_POST['id'];
   $reingreso = $_POST['reingreso'];

    if (!empty($id)) {
        $sql = "UPDATE salidas SET estado = 'Ingreso correctamente',hora_ingreso_real='$reingreso' WHERE id_sali = ?";
        $stmt = $cnn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("i", $id);

            if ($stmt->execute()) {
                echo "Ingreso registrado correctamente.";
            } else {
                echo "Error al actualizar el estado.";
            }

            $stmt->close();
        } else {
            echo "Error en la preparación de la consulta.";
        }
    } else {
        echo "ID no recibido.";
    }

    break;
 case 'updatenoingre':
    $id = $_POST['id'];
    $dni = $_POST['dni'];
    $fecha = $_POST['fecha'];
    $turno = $_POST['turno'];
    $reingreso = $_POST['reingreso'];

    if (!empty($id) && $dni != '' && $fecha != '') {
        // Actualizar estado de la salida
        $sql = "UPDATE salidas SET estado = 'Finalizado' ,comentario='No ingreso en la hora coordinada de reingreso' WHERE id_sali = $id";
        $cnn->query($sql);

        if ($turno == "Mañana") {
            $horaSalidaEsperada = new DateTime('16:30:00');
            $horaSalidaReal = new DateTime($reingreso);

           $diffSegundos =  $horaSalidaEsperada->getTimestamp() -  $horaSalidaReal->getTimestamp();
           $minutos = intval($diffSegundos / 60);
            $minutos_descuento_nuevo2  = $minutos- 60;


                $sqlSueldo = "SELECT sueldo FROM personal WHERE dni = '$dni'";
                $resSueldo = $cnn->query($sqlSueldo);
                $filaSueldo = $resSueldo->fetch_assoc();
                $sueldo = $filaSueldo['sueldo'];

                if ($sueldo) {
                    $totalMinutosMes = 30 * 8 * 60;
                    $pagoPorMinuto = $sueldo / $totalMinutosMes;
                    $monto_descuento_nuevo = round($minutos_descuento_nuevo2 * $pagoPorMinuto, 2);

   
                
                    $sqlDesc = "SELECT minutos_descum FROM asistencia WHERE dni = '$dni' AND fecha = '$fecha'";
                    $resDesc = $cnn->query($sqlDesc);
                    $filaDesc = $resDesc->fetch_assoc();

                    $minutodescum = isset($filaDesc['minutos_descum']) ? (int)$filaDesc['minutos_descum'] : 0;
                    $monto_descuento=round($minutodescum  * $pagoPorMinuto,2);

                    $minutos_descuento_total = $minutodescum + $minutos_descuento_nuevo2;
                    $monto_descuento_total = $monto_descuento + $monto_descuento_nuevo;

                    $sql2 = "UPDATE asistencia 
                             SET horait = '$reingreso', 
                                 horast = '$reingreso', 
                                 estadot='Falta',
                                 minutos_descut = $minutos_descuento_nuevo2,
                                 descuento_dia=  $monto_descuento_total, 
                                 comentariot='EL DESCUENTO TARDE GENERADO POR LA INACISTENCIA DE LA SALIDA',
                                 tiempo_tardanza_dia = $minutos_descuento_total 
                             WHERE dni = '$dni' AND fecha = '$fecha'";
                    $cnn->query($sql2);
                }
        
              
              
          
      } else {
    // Validar que el reingreso sea una hora válida
    if (strtotime($reingreso) !== false) {
        $horaSalidaEsperada = new DateTime('16:30:00');
        $horaSalidaReal = new DateTime($reingreso);

        // Calcular minutos de diferencia, solo si se salió antes
        $diffSegundos = $horaSalidaEsperada->getTimestamp() - $horaSalidaReal->getTimestamp();
        $minutos = intval($diffSegundos / 60);
        $minutos_descuento_nuevo2 =  $minutos; 

        // Obtener sueldo del empleado
        $sqlSueldo = "SELECT sueldo FROM personal WHERE dni = '$dni'";
        $resSueldo = $cnn->query($sqlSueldo);

        if ($resSueldo && $filaSueldo = $resSueldo->fetch_assoc()) {
            $sueldo = $filaSueldo['sueldo'];

            if ($sueldo > 0) {
                $totalMinutosMes = 30 * 8 * 60; 
                $pagoPorMinuto = $sueldo / $totalMinutosMes;

                $monto_descuento_nuevo = round($minutos_descuento_nuevo2 * $pagoPorMinuto, 2);

                $sqlDesc = "SELECT minutos_descum, minutos_descut FROM asistencia WHERE dni = '$dni' AND fecha = '$fecha'";
                $resDesc = $cnn->query($sqlDesc);

                if ($resDesc && $filaDesc = $resDesc->fetch_assoc()) {
                    $minutodescum = isset($filaDesc['minutos_descum']) ? (int)$filaDesc['minutos_descum'] : 0;
                    $minutodescut = isset($filaDesc['minutos_descut']) ? (int)$filaDesc['minutos_descut'] : 0;

                    $totalmit = $minutodescum + $minutodescut + $minutos_descuento_nuevo2;
                    $minutos_descuento_total = $totalmit;
                    $monto_descuento_total = round($minutos_descuento_total * $pagoPorMinuto, 2);

                    $sql2 = "UPDATE asistencia 
                             SET horast = '$reingreso', 
                                 descuento_dia = $monto_descuento_total,
                                 comentariot = 'EL DESCUENTO TARDE GENERADO POR LA INASISTENCIA DE LA SALIDA',
                                 tiempo_tardanza_dia = $minutos_descuento_total 
                             WHERE dni = '$dni' AND fecha = '$fecha'";
                    $cnn->query($sql2);
                }
            }
        }
    } else {
        // Error: hora de reingreso no válida
        // Puedes registrar el error o mostrar una notificación
    }
}


        echo "El no ingreso ha sido registrado correctamente.";
    } else {
        echo "ID no recibido.";
    }
    break;
    case 'ingretarde':
        $horaingreso = $_POST['horaIngreso'];
        $minutosdecu = $_POST['minutosdescu'];
        $turno = $_POST['turno'];
        $dni = $_POST['dni'];
        $fecha = $_POST['fecha'];
        $id = $_POST['id'];
        $hoy=date('Y-m-d');

            if ($hoy < $fecha) {
                // 1. Obtener el sueldo del empleado y los minutos totales de asistencia
                $query_personal = "SELECT sueldo FROM personal WHERE dni = '$dni'";
                $result_personal = mysqli_query($cnn, $query_personal);
                
                if (!$result_personal) {
                    die("Error al obtener el sueldo: " . mysqli_error($cnn));
                }
                
                $row_personal = mysqli_fetch_assoc($result_personal);
                $sueldo = $row_personal['sueldo'];
                
                // 2. Obtener los minutos totales de asistencia
                $query_asistencia = "SELECT tiempo_tardanza_dia , descuento_dia FROM asistencia WHERE dni = '$dni' AND fecha='$fecha'";
                $result_asistencia = mysqli_query($cnn, $query_asistencia);
                
                if (!$result_asistencia) {
                    die("Error al obtener los minutos de asistencia: " . mysqli_error($cnn));
                }
                
                $row_asistencia = mysqli_fetch_assoc($result_asistencia);
                $totalminutos = $row_asistencia['tiempo_tardanza_dia'] ?? 0;
                $descuento2 = $row_asistencia['descuento_dia'] ?? 0;
                $nuevos_minutos = $totalminutos + $minutosdecu;
                
                // 3. Calcular el valor por minuto trabajado
                $valor_por_minuto = $sueldo / 14400;
                
                // 4. Calcular el descuento
                $descuento = round($nuevos_minutos * $valor_por_minuto, 2);
                $totaldescuento=round($descuento+$descuento2,2);
                // 5. Actualizar la base de datos
                $update_query = "UPDATE asistencia 
                                SET tiempo_tardanza_dia = $nuevos_minutos, 
                                    descuento_dia = $totaldescuento,
                                    comentariot = CONCAT(IFNULL(comentariot, ''), ' Ingreso con tardanza en su salida coordinada de reingreso. $minutosdecu minutos de tardanza')
                                WHERE dni = '$dni' AND fecha = '$fecha'";
                
                if (mysqli_query($cnn, $update_query)) {
                    echo "Descuento aplicado correctamente";
                } else {
                    echo "Error al aplicar el descuento: " . mysqli_error($cnn);
                }
                
                
                exit();
            }
        if ($turno == "Mañana") {
            $sql = "UPDATE salidas SET hora_ingreso_real = '$horaingreso',estado='Finalizado', comentario='Ingreso con tardanza en su salida coordinada de reingreso.$minutosdecu minutos de tardanza' WHERE id_sali = $id";
            $cnn->query($sql);

            $sqlDesc = "SELECT minutos_descum FROM asistencia WHERE dni = '$dni' AND fecha = '$fecha'";
            $resDesc = $cnn->query($sqlDesc);
            $filaDesc = $resDesc->fetch_assoc();
            $minutosdiurno = $filaDesc['minutos_descum'];
            $totalminu = $minutosdecu + $minutosdiurno;

            $sql2 = "UPDATE asistencia SET minutos_descum = $totalminu, comentario='Ingreso con tardanza en su salida coordinada de reingreso.$minutosdecu minutos de tardanza' WHERE dni = '$dni' AND fecha = '$fecha'";
            $cnn->query($sql2);

            echo "Tardanza registrada";
        } else {
            $sql3 = "UPDATE salidas SET hora_ingreso_real = '$horaingreso', estado='Finalizado', comentario='Ingreso con tardanza en su salida coordinada de reingreso.$minutosdecu minutos de tardanza' WHERE id_sali = $id";
            $cnn->query($sql3);

            $sqlDesc = "SELECT minutos_descut FROM asistencia WHERE dni = '$dni' AND fecha = '$fecha'";
            $resDesc = $cnn->query($sqlDesc);
            $filaDesc = $resDesc->fetch_assoc();
            $minutostarde = $filaDesc['minutos_descut'];
            $totalminu = $minutosdecu + $minutostarde;

            $sql4 = "UPDATE asistencia SET minutos_descut = $totalminu, comentariot='Ingreso con tardanza en su salida coordinada.$minutosdecu minutos de tardanza' WHERE dni = '$dni' AND fecha = '$fecha'";
            $cnn->query($sql4);

            echo "Tardanza registrada";
        }



    break;

    default:
    break;
 }

?>