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
            $turno = $_POST['turno'];

             
             $estado = $_POST['estado'];

            
             if($estado=="3"){
                $estadoac="Puntual";

             }
        // Convertir la fecha en timestamp
        $timestamp = strtotime($fecha);

        // Obtener el nombre del día en español
        $dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        $nombreDia = $dias[date("w", $timestamp)]; 

        if($turno=="1") {
            $horaigm = $_POST['horaim'];

            $dni_query = "SELECT dni ,fecha FROM asistencia WHERE dni = '$dni' AND fecha ='$fecha'";
            $result = mysqli_query($cnn, $dni_query);


                if (mysqli_num_rows($result) > 0) {
                    echo json_encode(["status" => "error", "message" => "El usuario con DNI $dni ya tiene una asistencia registrada hoy."]);
                }else{
                    $query = "INSERT INTO asistencia (dni, fecha, dia,horaim ,horasm,estadom,minutos_descum) 
                    VALUES ('$dni','$fecha',' $nombreDia', '$horaigm', '13:00:00', '$estadoac',0)";
                    if (mysqli_query($cnn, $query)) {
                        echo json_encode(["status" => "success"]);
                    } else {
                        echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                    }
                }
        }elseif($turno=="2"){
            $query = "SELECT dni, fecha, horaim FROM asistencia 
            WHERE dni = '$dni' 
            AND fecha = '$fecha' 
            AND horaim IS NULL";
         $result = mysqli_query($cnn, $query);
            if (mysqli_num_rows($result) > 0) {
                
                echo json_encode(["status" => "error", "message" => "El usuario con DNI $dni no tiene registro en el turno mañana"]);
            }else{
                $horaingt = $_POST['horait'];
                $horasal = $_POST['horast'];
                $query = "UPDATE asistencia 
                    SET horait='$horaingt', 
                        horast='$horasal', 
                        estadot='$estadoac', 
                        minutos_descut=0 
                    WHERE dni = '$dni' AND fecha='$fecha'";
                     if (mysqli_query($cnn, $query)) {
                        echo json_encode(["status" => "success"]);
                    } else {
                        echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                    }
            }
        }elseif($turno=="3"){

            $horaigm = $_POST['horaim'];
            $horaingt = $_POST['horait'];
             $horasal = $_POST['horast'];
             $dni_query = "SELECT dni ,fecha FROM asistencia WHERE dni = '$dni' AND fecha ='$fecha'";
            $result = mysqli_query($cnn, $dni_query);


            if (mysqli_num_rows($result) > 0) {
                echo json_encode(["status" => "error", "message" => "El usuario con DNI $dni ya tiene una asistencia registrada hoy."]);
            }else{
                $query = "INSERT INTO asistencia (dni, fecha, dia,horaim ,horasm,estadom ,minutos_descum,horait , horast,estadot,minutos_descut) 
                VALUES ('$dni','$fecha',' $nombreDia', '$horaigm', '13:00:00', '$estadoac', 0, '$horaingt' ,'$horasal','$estadoac',0)";
                if (mysqli_query($cnn, $query)) {
                    echo json_encode(["status" => "success"]);
                } else {
                    echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                }
            }
           
        }

            
    }
    break;
    case 'createtar':
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $dni=$_POST['dni'];
                $fecha = $_POST['fecha'];
                $turno = $_POST['turno'];
                $estado = $_POST['estado'];

                
                if($estado=="2"){
                    $estadoac="Tardanza";

                }

                $fecha = trim($fecha); 
                $timestamp = strtotime($fecha);
                
                $dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
                $nombreDia = $dias[date("w", $timestamp)];
                    
                if($turno=="1") {
                            $horaigm = $_POST['horaim'];
                            $comentario = $_POST['comentario'];
                            $toleranciam=new DateTime('08:15:59');
                            $horaingt = new DateTime($horaigm);
                            $interval = $toleranciam->diff($horaingt);
                            $minutos_descut = $interval->h * 60 + $interval->i;


                            $dni_query = "SELECT dni ,fecha FROM asistencia WHERE dni = '$dni' AND fecha ='$fecha'";
                            $result = mysqli_query($cnn, $dni_query);
            
            
                            if (mysqli_num_rows($result) > 0) {
                                echo json_encode(["status" => "error", "message" => "El usuario con DNI $dni ya tiene una asistencia registrada hoy."]);
                            }else{
                                $query = "INSERT INTO asistencia (dni, fecha, dia,horaim ,horasm,estadom,minutos_descum,comentario,minutos_descut) 
                                VALUES ('$dni','$fecha',' $nombreDia', '$horaigm', '13:00:00', '$estadoac',$minutos_descut,'$comentario',0)";
                                if (mysqli_query($cnn, $query)) {
                                    echo json_encode(["status" => "success"]);
                                } else {
                                    echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                                }
                            }
                    }elseif($turno=="2"){
                            $horait = $_POST['horait'];
                            $comentario = $_POST['comentario'];

                            $toleranciat=new DateTime('14:10:59');

                                $query = "SELECT dni, fecha, horaim FROM asistencia 
                                WHERE dni = '$dni' 
                                AND fecha = '$fecha' 
                                AND horaim IS NULL";
                              $result = mysqli_query($cnn, $query);
                                if (mysqli_num_rows($result) > 0) {
                                    
                                    echo json_encode(["status" => "error", "message" => "El usuario con DNI $dni no tiene registro en el turno mañana"]);
                                }else{
                                    $horaingt = new DateTime($horait);
                                    $interval = $toleranciat->diff($horaingt);
                                    //$seconds = $interval->h * 3600 + $interval->i * 60 + $interval->s . " seconds <br>";
                                    $minutos_descut = $interval->h * 60 + $interval->i;
                                        $query = "UPDATE asistencia 
                                            SET horait='$horait', 
                                                estadot='$estadoac', 
                                                comentario='$comentario',
                                                minutos_descut= $minutos_descut
                                            WHERE dni = '$dni' AND fecha='$fecha'";
                                            if (mysqli_query($cnn, $query)) {
                                                echo json_encode(["status" => "success"]);
                                            } else {
                                                echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                                            }
                                }
                    }
            }
    break;
    default:
    echo json_encode(["status" => "error", "message" => "Acción no válida"]);
        break;
}
?>

