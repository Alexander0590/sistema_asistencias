<?php
include('../conecxion/conecxion.php');
date_default_timezone_set('America/Lima');
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
    case 'readfil':
            
            // Verificar si se enviaron parámetros
            if (!empty($_POST['dnire']) || (!empty($_POST['fechai']) && !empty($_POST['fechaf']))) {
                $dni = isset($_POST['dnire']) ? trim($_POST['dnire']) : '';
                $fechai = isset($_POST['fechai']) ? trim($_POST['fechai']) : '';
                $fechaf = isset($_POST['fechaf']) ? trim($_POST['fechaf']) : '';
            
                $query = "SELECT * FROM asistencia WHERE 1";
            
                if (!empty($dni)) {
                    $dni = mysqli_real_escape_string($cnn, $dni);
                    $query .= " AND dni = '$dni'";
                }
            
                if (!empty($fechai) && !empty($fechaf)) {
                    $fechai = mysqli_real_escape_string($cnn, $fechai);
                    $fechaf = mysqli_real_escape_string($cnn, $fechaf);
                    $query .= " AND fecha BETWEEN '$fechai' AND '$fechaf'";
                }
            
                $result = mysqli_query($cnn, $query);
            
                if ($result) {
                    $asistencia = mysqli_fetch_all($result, MYSQLI_ASSOC);
                    header('Content-Type: application/json');
                    echo json_encode($asistencia);
                } else {
                    echo json_encode(['error' => 'Error al ejecutar la consulta: ' . mysqli_error($cnn)]);
                }
            } else {
                echo json_encode(['error' => 'Los campos estan vacios']);
            }
    
        
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
    case 'create':
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $dni = isset($_POST['dni']) ? $_POST['dni'] : ''; 
            $fechare = isset($_POST['fechare']) ? $_POST['fechare'] : ''; 
            $horaim = isset($_POST['horaim']) ? $_POST['horaim'] : ''; 
            $estadom = isset($_POST['estadom']) ? $_POST['estadom'] : ''; 
            $minutos_descum = isset($_POST['minutos_descum']) && $_POST['minutos_descum'] !== '' ? floatval($_POST['minutos_descum']) : 0;
            $comentariom = isset($_POST['comentariom']) ? $_POST['comentariom'] : ''; 
            $horait = isset($_POST['horait']) ? $_POST['horait'] : ''; 
            $horast = isset($_POST['horast']) ? $_POST['horast'] : ''; 
            $estadot = isset($_POST['estadot']) ? $_POST['estadot'] : ''; 
            $minutos_descut = isset($_POST['minutos_descut']) && $_POST['minutos_descut'] !== '' ? floatval($_POST['minutos_descut']) : 0;
            $comentariot = isset($_POST['comentariot']) ? $_POST['comentariot'] : ''; 
            $totaldes = isset($_POST['totaldes']) && $_POST['totaldes'] !== '' ? floatval($_POST['totaldes']) : 0;
        
            $estadomc = ($estadom == "1") ? "Puntual" : (($estadom == "2") ? "Tardanza" : "");
            $estadotc = ($estadot == "1") ? "Puntual" : (($estadot == "2") ? "Tardanza" : "");
        
            $dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
            $nombreDia = ucfirst($dias[date('w', strtotime($fechare))]);
        
            $dni_query = "SELECT * FROM asistencia WHERE dni = '$dni' AND fecha = '$fechare'";
            $result = mysqli_query($cnn, $dni_query);
            
            if (mysqli_num_rows($result) > 0) {
                echo json_encode(["error" => false, "message" => "El personal con DNI $dni ya está registrado"]);
                mysqli_close($cnn);
                exit;
            } else {
                
                $cargo_query = "
                    SELECT c.nombre AS cargo_nombre
                    FROM personal p
                    INNER JOIN cargos c ON p.idcargo = c.idcargo
                    WHERE p.dni = '$dni'
                ";
                $cargo_result = mysqli_query($cnn, $cargo_query);
            
                if (mysqli_num_rows($cargo_result) == 0) {
                    echo json_encode(["error" => true, "message" => "No se encontró información del personal con ese DNI."]);
                    mysqli_close($cnn);
                    exit;
                }
            
                $cargo_data = mysqli_fetch_assoc($cargo_result);
                
                if (strtolower($cargo_data['cargo_nombre']) == 'serenazgo') {
                    echo json_encode(["error" => true, "message" => "El trabajador con DNI $dni pertenece a Serenazgo y no puede registrarse en este formulario."]);
                    mysqli_close($cnn);
                    exit;
                }
            
                $query = "INSERT INTO asistencia (dni, fecha, dia, horaim, horasm, estadom, minutos_descum, horait, horast, estadot, comentario, comentariot, minutos_descut, descuento_dia) 
                VALUES ('$dni', '$fechare', '$nombreDia', '$horaim', '13:00:00', '$estadomc', $minutos_descum, '$horait', '$horast', '$estadotc', '$comentariom', '$comentariot', $minutos_descut, $totaldes)";
            
                if (mysqli_query($cnn, $query)) {
                    echo json_encode(["success" => true, "message" => "Asistencia registrada correctamente"]);
                } else {
                    echo json_encode(["error" => false , "message" => "Error en la base de datos: " . mysqli_error($cnn)]);
                }
            

                mysqli_close($cnn);
            }
        
           
        }
    break;
    
    case'update':

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $dni = $_POST['codigo'];
            $fecha = $_POST['fecha'];
            $horaim = $_POST['hentradam'];
            $horasm = $_POST['hentradam']; 
            $estadom = $_POST['estadom'];
            $minutos_descum = $_POST['mdesm'];
            $horait = $_POST['hentradat'];
            $horast = $_POST['hsalidat'];
            $estadot = $_POST['estadot'];
            $minutos_descut = $_POST['mdest'];
            $comentario = $_POST['comenm'];
            $comentariot = $_POST['coment'];
            $descuento_dia = $_POST['totdescu'];
            $tiempo_tardanza_dia = $_POST['totminu'];
        
            $sql = "UPDATE asistencia SET
                fecha = ?,
                horaim = ?,
                horasm = ?,
                estadom = ?,
                minutos_descum = ?,
                horait = ?,
                horast = ?,
                estadot = ?,
                minutos_descut = ?,
                comentario = ?,
                comentariot = ?,
                descuento_dia = ?,
                tiempo_tardanza_dia = ?
                WHERE dni = ?";
        
            $stmt = $cnn->prepare($sql);
        
            $stmt->bind_param("sssssdsssssdss",
                $fecha, $horaim, $horasm, $estadom, $minutos_descum,
                $horait, $horast, $estadot, $minutos_descut,
                $comentario, $comentariot, $descuento_dia,
                $tiempo_tardanza_dia, $dni
            );
        
            if ($stmt->execute()) {
                echo "Registro actualizado correctamente.";
            } else {
                echo "Error al actualizar: " . $stmt->error;
            }
        
            $stmt->close();
            $cnn->close();
        }
        
        

    break;

    default:
    echo json_encode(["status" => "error", "message" => "Acción no válida"]);
        break;
}
?>

