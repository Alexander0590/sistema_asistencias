<?php
include('../conecxion/conecxion.php');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'busast':
        if (isset($_POST['codigo'])) {
            $codigo = $cnn->real_escape_string($_POST['codigo']);
            
            $sql = "SELECT 
            a.fecha, 
            a.horaim, 
            a.horait, 
            a.horast 
            FROM personal p
            INNER JOIN asistencia a ON p.dni = a.dni
            WHERE p.dni = '$codigo' 
            AND a.fecha = CURDATE()";

        $resultado = $cnn->query($sql);
        
        if ($resultado && mysqli_num_rows($resultado) > 0) {
            $pasistencia = mysqli_fetch_assoc($resultado);
            echo json_encode($pasistencia);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado.']);
        }
        }
    break;
    case 'read':
        $query = "SELECT * FROM asistencia";
        $result = mysqli_query($cnn, $query);
        
        $asistencia = [];
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $asistencia[] = $row;
            }
        }
        echo json_encode($asistencia);
        
    break;
    case 'busp':
        if (isset($_POST['codigo'])) {
    $codigo = $cnn->real_escape_string($_POST['codigo']);
        $query = "SELECT * FROM personal WHERE dni = '$codigo'";
        $result = mysqli_query($cnn, $query);
        
        
        if ($result && mysqli_num_rows($result) > 0) {
            $pbus = mysqli_fetch_assoc($result);
            echo json_encode($pbus);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado.']);
        }
    } else {
        echo "vacio";
    }
    break;
    case 'createtc':
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $dni=$_POST['dni'];
            $fecha = $_POST['fecha'];
             $horaigm = $_POST['horaim'];
             $horaingt = $_POST['horait'];
             $horasal = $_POST['horast'];
             $estado = $_POST['estado'];

            
             if($estado=="1"){
                $estadoac="Trabajo de campo";

             }
        // Convertir la fecha en timestamp
        $timestamp = strtotime($fecha);

        // Obtener el nombre del día en español
        $dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        $nombreDia = $dias[date("w", $timestamp)]; 


        $dni_query = "SELECT dni ,fecha FROM asistencia WHERE dni = '$dni' AND fecha ='$fecha'";
         $result = mysqli_query($cnn, $dni_query);
        if (mysqli_num_rows($result) > 0) {
            echo json_encode(["status" => "error", "message" => "El usuario con DNI $dni ya tiene una asistencia registrada hoy."]);
        } else {
            $query = "INSERT INTO asistencia (dni, fecha, dia,horaim ,horasm,estadom ,horait , horast,estadot,minutos_descut) 
             VALUES ('$dni','$fecha',' $nombreDia', '$horaigm', '13:00:00', '$estadoac',  '$horaingt' ,'$horasal','$estadoac',0)";
             if (mysqli_query($cnn, $query)) {
                 echo json_encode(["status" => "success"]);
             } else {
                 echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
             }
        }

            
        }

    break;
    case 'createpu':
    
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $dni=$_POST['dni'];
            $fecha = $_POST['fecha'];
             $horaigm = $_POST['horaim'];
             $horaingt = $_POST['horait'];
             $horasal = $_POST['horast'];
             $estado = $_POST['estado'];

            
             if($estado=="3"){
                $estadoac="Puntual";

             }
        // Convertir la fecha en timestamp
        $timestamp = strtotime($fecha);

        // Obtener el nombre del día en español
        $dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        $nombreDia = $dias[date("w", $timestamp)]; 
         // busqueda de dni 
         $dni_query = "SELECT dni ,fecha FROM asistencia WHERE dni = '$dni' AND fecha ='$fecha'";
         $result = mysqli_query($cnn, $dni_query);


         if (mysqli_num_rows($result) > 0) {
            echo json_encode(["status" => "error", "message" => "El usuario con DNI $dni ya tiene una asistencia registrada hoy."]);
        } else {
            $query = "INSERT INTO asistencia (dni, fecha, dia,horaim ,horasm,estadom ,horait , horast,estadot,minutos_descut) 
            VALUES ('$dni','$fecha',' $nombreDia', '$horaigm', '13:00:00', '$estadoac',  '$horaingt' ,'$horasal','$estadoac',0)";
            if (mysqli_query($cnn, $query)) {
                echo json_encode(["status" => "success"]);
            } else {
                echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
            }
        }

            
        }
    break;
    default:
    echo json_encode(["status" => "error", "message" => "Acción no válida"]);
        break;
}
?>

