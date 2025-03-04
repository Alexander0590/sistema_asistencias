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
    case 'createpu':
    
   
    break;
    

    default:
    echo json_encode(["status" => "error", "message" => "Acción no válida"]);
        break;
}
?>

