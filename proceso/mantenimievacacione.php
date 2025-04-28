<?php
 include('../conecxion/conecxion.php');
 $action = $_GET['action'] ?? '';

 date_default_timezone_set("America/Lima");
switch ($action) {
         case 'read':
            // Leer todos los usuarios
            $query = "SELECT v.*,  p.nombres , p.apellidos, c.nombre, p.vacaciones
                    from
                        personal p , vacaciones v, cargos c  
                  where
                    p.dni = v.dni and p.idcargo = c.idcargo   and v.year =  Year(curdate())
                 order by p.vacaciones;";
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
                    if ($diasRestantes < 0) {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Excedió el límite de vacaciones por año. Solo quedan ' . (31 - $totalDiasActuales) . ' días disponibles.'
                        ]);
                        exit;
                    }
                
                    // 4. Calcular la fecha de fin
                    $fechaFin = date('Y-m-d', strtotime("+$dias days", strtotime($fechaInicio)));
                
                    // 5. Insertar en tabla vacaciones incluyendo dias_restantes y anio
                    $sqlInsert = "INSERT INTO vacaciones (dni, fecha_inicio, fecha_fin, dias, dias_restantes, year) 
                                  VALUES ('$dni', '$fechaInicio', '$fechaFin', '$dias', '$diasRestantes', $anioActual)";
                    mysqli_query($cnn, $sqlInsert);
                
                    // 6. Actualizar campo 'vacaciones' en tabla personal
                    $sqlUpdate = "UPDATE personal SET vacaciones = 'En proceso' WHERE dni = '$dni'";
                    mysqli_query($cnn, $sqlUpdate);
                
                    echo json_encode([
                        'status' => 'success',
                        'message' => 'Vacaciones registradas correctamente',
                        'dias_restantes' => $diasRestantes
                    ]);
                
                
              
            break;
        case'updateatodos':
            $hoy = date('d-m-y');
            // 1. Buscar los ID de personal que ya terminaron sus vacaciones
            $sql_vencidos = "SELECT DISTINCT v.dni
                            FROM vacaciones v
                            INNER JOIN personal p ON v.dni = p.dni
                            WHERE v.fecha_fin < '$hoy'
                            AND p.vacaciones = 'En proceso'";
            
            $resultado_vencidos = $cnn->query($sql_vencidos);
            
            if ($resultado_vencidos->num_rows > 0) {
                while ($fila = $resultado_vencidos->fetch_assoc()) {
                    $id_personal = $fila['dni'];
            
                    // 2. Para cada uno, calcular la suma de días
                    $sql_suma = "SELECT SUM(dias) AS total_dias 
                                 FROM vacaciones 
                                 WHERE dni = '$id_personal'";
            
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
     default:
         echo json_encode(["status" => "error", "message" => "Acción no válida"]);
 }
 ?>