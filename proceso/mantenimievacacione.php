<?php
 include('../conecxion/conecxion.php');
 $action = $_GET['action'] ?? '';

 date_default_timezone_set("America/Lima");
switch ($action) {
         case 'read':
            // Leer todos los usuarios
            $query = "SELECT 
    p.dni,
    p.nombres,
    p.apellidos,
    c.nombre AS cargo,
    p.vacaciones,
    MIN(v.dias_restantes) AS ultimo_dias_restantes,
    SUM(v.dias) AS total_dias_vacaciones,
    ult.fecha_inicio AS ultima_fecha_inicio,
    ult.fecha_fin AS ultima_fecha_fin,
    ult.year AS ultimo_año_registro
FROM 
    personal p
INNER JOIN 
    vacaciones v ON p.dni = v.dni
INNER JOIN 
    cargos c ON p.idcargo = c.idcargo
INNER JOIN 
    (
        SELECT 
            v2.dni,
            v2.fecha_inicio,
            v2.fecha_fin,
            v2.year,
            v2.dias_restantes
        FROM vacaciones v2
        WHERE v2.year = YEAR(CURDATE())
        AND (v2.fecha_inicio, v2.dni) IN (
            SELECT 
                MAX(v3.fecha_inicio), v3.dni
            FROM vacaciones v3
            WHERE v3.year = YEAR(CURDATE())
            GROUP BY v3.dni
        )
    ) AS ult ON p.dni = ult.dni
WHERE 
    v.year = YEAR(CURDATE())
GROUP BY 
    p.dni, p.nombres, p.apellidos, c.nombre, p.vacaciones, 
    ult.fecha_inicio, ult.fecha_fin, ult.year
ORDER BY 
    p.vacaciones";
            $result = mysqli_query($cnn, $query);
            
            $vacaciones = [];
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $vacaciones[] = $row;
                }
            }
            echo json_encode($vacaciones);
            break;
            case 'createv': 
                    $dni = mysqli_real_escape_string($cnn, $_POST['dni']);
                    $dias = intval($_POST['dias']);
                    $fechaInicio = $_POST['fechaini'];
                    $anioActual = date('Y', strtotime($fechaInicio));
                
                    $sql3 = "SELECT c.nombre AS cargo
                    FROM personal
                    INNER JOIN cargos c ON personal.idcargo = c.idcargo
                    WHERE personal.dni = '$dni'";
            
                    $result = mysqli_query($cnn, $sql3);
                    
                    if (mysqli_num_rows($result) > 0) {
                        $fila = mysqli_fetch_assoc($result);
                        $cargo = $fila['cargo'];

                    // 1. Sumar días de vacaciones ya tomados este año
                    $sqlSuma = "SELECT COALESCE(SUM(dias), 0) AS total_dias 
                                FROM vacaciones 
                                WHERE dni = '$dni' AND year = '$anioActual'";
                    $resultado = mysqli_query($cnn, $sqlSuma);
                    $fila = mysqli_fetch_assoc($resultado);
                    $totalDiasActuales = intval($fila['total_dias']);
                
                    // 2. Calcular total con nuevos días
                    $totalConNuevo = $totalDiasActuales + $dias;
                    $diasRestantes = 31 - $totalConNuevo;
                
                    // 3. Validar si excede los 31 días
                    if ($diasRestantes < 0 || $totalConNuevo > 31 ) {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Excedió el límite de vacaciones por año. Solo quedan ' . (31 - $totalDiasActuales) . ' días disponibles.'
                        ]);
                        exit;
                    }
                
                    // 4. Calcular la fecha de fin
                    $fechaFin = date('Y-m-d', strtotime("+$dias days", strtotime($fechaInicio)));
                
                    // 5. Insertar en tabla vacaciones incluyendo dias_restantes y anio
                    $sqlInsert = "INSERT INTO vacaciones (dni, fecha_inicio, fecha_fin, dias, dias_restantes, year, fecha_registro) 
                                  VALUES ('$dni', '$fechaInicio', '$fechaFin', '$dias', '$diasRestantes', $anioActual, Now())";
                    mysqli_query($cnn, $sqlInsert);

                    //INSERTAR LAS ASISTENCIAS
                    $fechasVacaciones = [];

                    // Configuramos el formateador para español (Perú)
                    $formatter = new IntlDateFormatter(
                        'es_PE', 
                        IntlDateFormatter::FULL,
                        IntlDateFormatter::NONE,
                        'America/Lima',
                        IntlDateFormatter::GREGORIAN,
                        'EEEE' 
                    );

                    for ($i = 0; $i < $dias; $i++) {
                        $fecha = date('Y-m-d', strtotime($fechaInicio . " +$i days"));
                        $timestamp = strtotime($fecha);
                        $nombreDia = ucfirst($formatter->format($timestamp)); // Capitaliza la primera letra
                        $fechasVacaciones[] = [$fecha, $nombreDia];
                    }

                    // Mostrar resultado
                    foreach ($fechasVacaciones as [$fecha, $nombreDia]) {
                        $sql2 = "INSERT INTO asistencia (dni, fecha, dia, horaim, horasm , estadom, minutos_descum,horait,horast,estadot, minutos_descut, comentario, comentariot, descuento_dia, tiempo_tardanza_dia) 
                        VALUES ('$dni','$fecha', '$nombreDia', '08:00:00', '13:00:00','Vacaciones',0,'14:00:00','16:30:00','Vacaciones',0,'','',0,0)";
                        mysqli_query($cnn, $sql2);
                    }

                    $hoy=date('Y-m-d');
                   

                   if($fechaInicio==$hoy){
                    // 6. Actualizar campo 'vacaciones' en tabla personal
                    $sqlUpdate = "UPDATE personal SET vacaciones = 'En proceso' WHERE dni = '$dni'";
                    mysqli_query($cnn, $sqlUpdate);
                    }
                    if($fechaInicio>$hoy){
                        // 6. Actualizar campo 'vacaciones' en tabla personal
                        $sqlUpdate = "UPDATE personal SET vacaciones = 'Asignado' WHERE dni = '$dni'";
                        mysqli_query($cnn, $sqlUpdate);
                    }
                    echo json_encode([
                        'status' => 'success',
                        'message' => 'Vacaciones registradas correctamente',
                        'dias_restantes' => $diasRestantes
                    ]);
                
                } else {
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'El DNI no existe en la base de datos.'
                    ]);
                  
                }
              
            break;

        case'updatcampo':
            $hoy = date('Y-m-d');

// Consulta principal para obtener los registros
            $sql_campo = "SELECT v.dni
                FROM vacaciones v
                INNER JOIN (
                    SELECT dni, MAX(fecha_inicio) AS max_fecha
                    FROM vacaciones
                    GROUP BY dni
                ) ult ON v.dni = ult.dni AND v.fecha_inicio = ult.max_fecha
                INNER JOIN personal p ON v.dni = p.dni
                WHERE v.fecha_inicio <= ? AND p.vacaciones = 'Asignado'"; 

            $stmt = $cnn->prepare($sql_campo);
            $stmt->bind_param("s", $hoy); 
            $stmt->execute();
            $resultado_campo = $stmt->get_result();

            if ($resultado_campo->num_rows > 0) {
                $actualizados = 0;
                while ($fila = $resultado_campo->fetch_assoc()) {
                    $dni2 = $fila['dni'];

                    // Actualizar el estado de vacaciones solo si está en "ASIGNADO"
                    $update = "UPDATE personal SET vacaciones = 'En proceso' WHERE dni = ? AND vacaciones = 'ASIGNADO'";
                    $stmt_update = $cnn->prepare($update);
                    $stmt_update->bind_param("s", $dni2); 
                    if ($stmt_update->execute()) {
                        $actualizados++;
                    }
                }
                echo "Se actualizaron correctamente $actualizados registros.";
            } else {
                echo "No se encontraron registros de vacaciones para hoy o fechas anteriores en estado";
            }
            $stmt->close();  
        break;
        case'updateatodos':
            $hoy = date('Y-m-d');
            // 1. Buscar los ID de personal que ya terminaron sus vacaciones
            $sql_vencidos = "SELECT v.dni
                FROM vacaciones v
                INNER JOIN (
                    SELECT dni, MAX(fecha_fin) as max_fecha
                    FROM vacaciones
                    GROUP BY dni
                ) ult ON v.dni = ult.dni AND v.fecha_fin = ult.max_fecha
                INNER JOIN personal p ON v.dni = p.dni
                WHERE v.fecha_fin < '$hoy'
                AND p.vacaciones = 'En proceso'";
            
            $resultado_vencidos = $cnn->query($sql_vencidos);
            $anio_actual = date('Y');
            if ($resultado_vencidos->num_rows > 0) {
                while ($fila = $resultado_vencidos->fetch_assoc()) {
                    $id_personal = $fila['dni'];
            
                    // 2. Para cada uno, calcular la suma de días
                    $sql_suma = "SELECT SUM(dias) AS total_dias 
                                 FROM vacaciones 
                                 WHERE dni = '$id_personal'and year='$$anio_actual'";
            
                    $resultado_suma = $cnn->query($sql_suma);
                    $datos = $resultado_suma->fetch_assoc();
                    $total_dias = $datos['total_dias'];
            
                    // 3. Según la suma de días, actualizar personal
                    if ($total_dias < 31) {
                        $update = "UPDATE personal SET vacaciones = 'Dias restantes' WHERE dni= '$id_personal'";
                    } else {
                        $update = "UPDATE personal SET vacaciones = 'Finalizado' WHERE dni = '$id_personal'";
                    }
            
                    if (!$cnn->query($update)) {
                        echo "Error actualizando ID $id_personal: " . $cnn->error . "<br>";
                    }
                }
            
                echo "Actualización de vacaciones finalizada correctamente.";
            } else {
                echo "No hay registros de vacaciones vencidas.";
            }
            
            $cnn->close();
        break;
        case "filtrovaca":
                $dni = isset($_POST['dnire']) ? trim($_POST['dnire']) : '';
                $fechai = isset($_POST['fechai']) ? trim($_POST['fechai']) : '';
                $fechaf = isset($_POST['fechaf']) ? trim($_POST['fechaf']) : '';

                
                $query = "SELECT 
                        v.*,              
                        p.nombres, 
                        p.apellidos, 
                        p.idcargo,
                        c.nombre
                    FROM 
                        vacaciones v
                    JOIN 
                        personal p ON v.dni = p.dni
                    JOIN 
                        cargos c ON p.idcargo = c.idcargo
                    WHERE 1";
        
        if (!empty($dni)) {
            $dni = mysqli_real_escape_string($cnn, $dni);
            $query .= " AND v.dni = '$dni'";
        }
        
        if (!empty($fechai) && !empty($fechaf)) {
            $fechai = mysqli_real_escape_string($cnn, $fechai);
            $fechaf = mysqli_real_escape_string($cnn, $fechaf);
            $query .= " AND v.fecha_registro BETWEEN '$fechai' AND '$fechaf'";
        }
        
        $result = mysqli_query($cnn, $query);
        
                if ($result) {
                    $fvaca = mysqli_fetch_all($result, MYSQLI_ASSOC);
                    header('Content-Type: application/json');
                    echo json_encode($fvaca);
                } else {
                    echo json_encode(['error' => 'Error al ejecutar la consulta: ' . mysqli_error($cnn)]);
                }
          
        break;
     default:
         echo json_encode(["status" => "error", "message" => "Acción no válida"]);
 }
 ?>