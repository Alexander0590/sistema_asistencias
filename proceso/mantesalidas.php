<?php
 include('../conecxion/conecxion.php');

 $action = $_GET['action'] ?? '';


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
        $comentario = $_POST['comentario'] ?? '';

      // Convertir fecha a timestamp
        $timestamp = strtotime($fecha_salida);

        // Calcular el día de la semana en español sin acentos
        $dia_semana_es = date("N", $timestamp);
        $dias_espanol = ["", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
        $dia_es = $dias_espanol[$dia_semana_es];

        $sql_check_asistencia = "SELECT * FROM asistencia WHERE dni = '$dni' AND fecha = CURDATE() ";
            $result_check_asistencia = $cnn->query($sql_check_asistencia);

            if ($result_check_asistencia->num_rows == 0) {
                $sql_check_asistencia_seguridad = "SELECT * FROM asistencia_seguridad WHERE dni = '$dni' AND fecha =CURDATE() ";
                $result_check_asistencia_seguridad = $cnn->query($sql_check_asistencia_seguridad);
                
                // Si tampoco se encuentra ninguna entrada, mostrar un mensaje de error
                if ($result_check_asistencia_seguridad->num_rows == 0) {
                    echo "No se ha registrado ninguna entrada para este DNI en el día de hoy. No se puede registrar la salida.";
                    exit;
                }
            }

            // Preparar la consulta SQL para insertar la salida
            $sql_insert = "INSERT INTO salidas (dni, dia , fecha_salida, hora_salida, hora_reingreso, motivo, turno, comentario) 
                        VALUES ('$dni', '$dia_es','$fecha_salida', '$hora_salida', '$hora_reingreso', '$motivo', '$turno', '$comentario')";

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
        $sql = "SELECT s.*, p.apellidos, p.nombres 
        FROM salidas s
        INNER JOIN personal p ON s.dni = p.dni
        WHERE s.fecha_salida = CURDATE()";
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
    default:
    break;
 }

?>