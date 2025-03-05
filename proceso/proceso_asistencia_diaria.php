<?php
include('../conecxion/conecxion.php'); // Conexión a la base de datos
//$opcion=$_GET['opcion'];
$accion = $_GET['accion'];
date_default_timezone_set('America/Lima');

switch ($accion) {
    case "listar_faltas":
        $sql = "SELECT * FROM personal WHERE personal.dni NOT IN (SELECT dni FROM asistencia WHERE fecha = CURDATE())AND personal.estado = 'activo';";
        $registros = mysqli_query($cnn, $sql);
        $cantidad = mysqli_num_rows($registros);
        $json = ($cantidad > 0) ? mysqli_fetch_all($registros, MYSQLI_ASSOC) : "sin_data";
        echo json_encode($json, JSON_UNESCAPED_UNICODE);
        break;
    
    case "listar_registrados":
        $sql2 = "SELECT * FROM personal p, asistencia a WHERE p.dni = a.dni AND a.fecha = CURDATE()";
        $registros2 = mysqli_query($cnn, $sql2);
        $cantidad2 = mysqli_num_rows($registros2);
        if($cantidad2 <= 0){
            $json2='sin_data';
        } else {
            $json2= mysqli_fetch_all($registros2, MYSQLI_ASSOC);
        }
      
        echo json_encode($json2, JSON_UNESCAPED_UNICODE);
        break;
    case "readOne":
        //traer la asistencia
        $dni= $_GET['id'];
        $sql = "SELECT * FROM asistencia WHERE dni = '$dni' and fecha = CURDATE()";
        $result = mysqli_query($cnn, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            $pasisten = mysqli_fetch_assoc($result);
            echo json_encode($pasisten);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Asistencia no encontrada.']);
        }

    break;
    case "readonef":
        $dni= $_GET['id'];
        $sql = "SELECT dni , nombres ,apellidos ,sueldo FROM personal WHERE dni = '$dni' ";
        $result = mysqli_query($cnn, $sql);
    
        if ($result && mysqli_num_rows($result) > 0) {
            $pasisten = mysqli_fetch_assoc($result);
            echo json_encode($pasisten);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Asistencia no encontrada.']);
        }
  
      break;
      case "createf":
            
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $dni = $_POST['codigo'];
                $fecha = $_POST['fecha'];
                $estador = $_POST['estador'];
                $descuento = $_POST['descuento'];
                $minutos = $_POST['minutos'];
                $comentario = $_POST['comentario'];

                $estadac = ($estador == "3") ? "Falta" : "Presente";
                $minutosdiv = ($minutos == 480) ? 240 : 0;

                $dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
                $nombreDia = ucfirst($dias[date('w', strtotime($fecha))]);

                $dni_query = "SELECT * FROM asistencia WHERE dni = '$dni' AND fecha = CURDATE()";
                $result = mysqli_query($cnn, $dni_query);

                if (mysqli_num_rows($result) > 0) {
                    echo json_encode(["success" => false, "message" => "El personal con DNI $dni ya está registrado"]);
                    exit;
                }

                $query = "INSERT INTO asistencia (dni, fecha, dia, estadom, minutos_descum, estadot, minutos_descut, comentario, descuento_dia) 
                        VALUES ('$dni','$fecha','$nombreDia','$estadac',$minutosdiv,'$estadac',$minutosdiv,'$comentario',$descuento)";

                if (mysqli_query($cnn, $query)) {
                    echo json_encode(["success" => true, "message" => "Falta registrada correctamente"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error en la base de datos: " . mysqli_error($cnn)]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Método no permitido"]);
            }
        break;
        case "createtc":
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $dni = $_POST['id'];
                $estado = $_POST['estador'];
                $horaim = $_POST['horaim'];
                $horait = $_POST['horait'];
                $horasm = $_POST['horasm'];
                $horast = $_POST['horast'];
                $descuento = $_POST['descuento'];
                $minutos = $_POST['minutos'];

                date_default_timezone_set('America/Lima');

                $fecha = date("Y-m-d");


                $dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
                $nombreDia = ucfirst($dias[date('w', strtotime($fecha))]);

                $dni_query = "SELECT * FROM asistencia WHERE dni = '$dni' AND fecha = CURDATE()";
                $result = mysqli_query($cnn, $dni_query);

                if (mysqli_num_rows($result) > 0) {
                    echo json_encode(["success" => false, "message" => "El personal con DNI $dni ya está registrado"]);
                    exit;
                }

                $query = "INSERT INTO asistencia (dni, fecha, dia, horaim, horasm, estadom, minutos_descum, horait, horast, estadot, minutos_descut, descuento_dia) 
                VALUES ('$dni', '$fecha', '$nombreDia', '$horaim', '$horasm', '$estado', '$minutos', '$horait', '$horast', '$estado', '$minutos', '$descuento')";
      

                if (mysqli_query($cnn, $query)) {
                    echo json_encode(["success" => true, "message" => "Falta registrada correctamente"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error en la base de datos: " . mysqli_error($cnn)]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Método no permitido"]);
            }
        break;
    default:
        echo json_encode(["error" => "Acción no válida"], JSON_UNESCAPED_UNICODE);
        break;
}

?>