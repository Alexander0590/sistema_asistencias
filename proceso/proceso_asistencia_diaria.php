<?php
include('../conecxion/conecxion.php'); // Conexión a la base de datos
//$opcion=$_GET['opcion'];
$accion = $_GET['accion'];
date_default_timezone_set('America/Lima');

switch ($accion) {
    case "listar_faltas":
        $sql = "SELECT personal.* FROM personal JOIN cargos ON personal.idcargo = cargos.idcargo
                WHERE personal.dni NOT IN (SELECT dni FROM asistencia WHERE fecha = CURDATE()) 
                AND personal.estado = 'activo'
                AND cargos.nombre <> 'Serenazgo'";
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


    case "listar_serenazgosa":
        mysqli_query($cnn, "SET lc_time_names = 'es_ES'");

        $sql = "WITH ultimo_dia AS (
                    SELECT CURDATE() - INTERVAL 1 DAY AS fecha 
                )
                SELECT 
                    p.dni, 
                    p.nombres, 
                    p.apellidos, 
                    a.fecha AS fecha_asistencia, 
                    DATE_FORMAT(a.fecha, '%W') AS dia_semana, 
                    a.horai,
                    COALESCE(a.horas, 'Falta salida') AS hora_salida
                FROM personal p
                JOIN cargos c ON p.idcargo = c.idcargo
                CROSS JOIN ultimo_dia d
                LEFT JOIN asistencia_seguridad a 
                    ON a.dni = p.dni 
                    AND (
                        (DAYOFWEEK(CURDATE()) = 2 AND (a.fecha = d.fecha - INTERVAL 1 DAY OR a.fecha = d.fecha - INTERVAL 2 DAY)) 
                        OR (DAYOFWEEK(CURDATE()) BETWEEN 3 AND 7 AND a.fecha = d.fecha)
                    )
                WHERE p.estado = 'activo'
                AND c.nombre = 'Serenazgo'
                AND DAYOFWEEK(CURDATE()) IN (2,3,4,5,6,7) 
                AND a.horai IS NOT NULL 
                AND a.horas IS NULL
                ORDER BY a.fecha, a.horai";

        $registro5 = mysqli_query($cnn, $sql);
        $cantidad = mysqli_num_rows($registro5);

        // Convertir los resultados a JSON
        if ($cantidad > 0) {
            $json = mysqli_fetch_all($registro5, MYSQLI_ASSOC); 
        } else {
            $json = []; 
        }
        
        echo json_encode($json, JSON_UNESCAPED_UNICODE);
        
break;
       
case "listar_serenazgoentrada":
    mysqli_query($cnn, "SET lc_time_names = 'es_ES'");
        $sql2="WITH ultimo_dia AS (
            SELECT CURDATE() - INTERVAL 1 DAY AS fecha 
        )
        SELECT 
            p.dni, 
            p.nombres, 
            p.apellidos,
            d.fecha AS fecha_asistencia,  
            DATE_FORMAT(d.fecha, '%W') AS dia_semana  
        FROM personal p
        JOIN cargos c ON p.idcargo = c.idcargo
        CROSS JOIN ultimo_dia d
        LEFT JOIN asistencia_seguridad a 
            ON a.dni = p.dni 
            AND a.fecha = d.fecha 
        WHERE p.estado = 'activo'
        AND c.nombre = 'Serenazgo'
        AND a.dni IS NULL  
        AND DAYOFWEEK(CURDATE()) = 2  
        ORDER BY p.apellidos, p.nombres";

        $registro4 = mysqli_query($cnn, $sql2);
        $cantidad = mysqli_num_rows($registro4);

        // Convertir los resultados a JSON
        if ($cantidad > 0) {
            $json = mysqli_fetch_all($registro4, MYSQLI_ASSOC); 
        } else {
            $json = 'sin_data'; 
        };
        echo json_encode($json, JSON_UNESCAPED_UNICODE);
break;
case "listarfaltaseguri":

    $sql = "SELECT personal.* FROM personal 
    JOIN cargos ON personal.idcargo = cargos.idcargo
    WHERE personal.dni NOT IN (
        SELECT dni FROM asistencia_seguridad 
        WHERE fecha = CURDATE()
    ) 
    AND personal.estado = 'activo'
    AND cargos.nombre = 'Serenazgo'";
    
    $registros = mysqli_query($cnn, $sql);
    $cantidad = mysqli_num_rows($registros);
    $json = ($cantidad > 0) ? mysqli_fetch_all($registros, MYSQLI_ASSOC) : "sin_data";
    echo json_encode($json, JSON_UNESCAPED_UNICODE);


break;
case"listarasistenciaseguri":
    
        $sql = "SELECT 
                personal.*, 
                asistencia_seguridad.fecha AS fecha_asistencia,
                asistencia_seguridad.horai,
                asistencia_seguridad.turno,
                asistencia_seguridad.horas,
                DAYNAME(asistencia_seguridad.fecha) AS dia_semana,
                CASE 
                    WHEN asistencia_seguridad.horas IS NULL AND asistencia_seguridad.estado != 'Falto' THEN 'Falta salida'
                    ELSE 'Registro completo'
                END AS estado_asis
            FROM personal 
            JOIN cargos ON personal.idcargo = cargos.idcargo
            JOIN asistencia_seguridad ON personal.dni = asistencia_seguridad.dni
                AND asistencia_seguridad.fecha = CURDATE()
                AND asistencia_seguridad.horai IS NOT NULL
            WHERE 
                personal.estado = 'activo'
                AND cargos.nombre = 'Serenazgo'
            ORDER BY personal.apellidos ASC";   
    
    $registros = mysqli_query($cnn, $sql);
    
    if (!$registros) {
        echo json_encode(["error" => "Error en la consulta: " . mysqli_error($cnn)]);
        exit;
    }
    
    $cantidad = mysqli_num_rows($registros);
    $data = ($cantidad > 0) ? mysqli_fetch_all($registros, MYSQLI_ASSOC) : [];
    
    ob_clean();
    echo json_encode(["data" => $data], JSON_UNESCAPED_UNICODE);
   
break;
    case "readOne":
        //traer la asistencia
        $dni= $_GET['id'];
        $sql = "SELECT a.*, p.nombres ,p.apellidos,p.sueldo
        FROM asistencia a
        JOIN personal p ON a.dni = p.dni
        WHERE a.dni = '$dni' AND a.fecha = CURDATE()";
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

                $query = "INSERT INTO asistencia (dni, fecha, dia, estadom, minutos_descum, estadot, minutos_descut, comentario, descuento_dia ,tiempo_tardanza_dia) 
                        VALUES ('$dni','$fecha','$nombreDia','$estadac',$minutosdiv,'$estadac',$minutosdiv,'$comentario',$descuento , $minutos)";

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