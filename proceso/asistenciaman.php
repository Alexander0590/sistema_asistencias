<?php
include('../conecxion/conecxion.php');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'busper':
        if (isset($_POST['codigo'])) {
            $codigo = $cnn->real_escape_string($_POST['codigo']);
            
            $sql = "SELECT 
            p.nombres, 
            p.apellidos, 
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
    
    default:
    echo json_encode(["status" => "error", "message" => "Acción no válida"]);
        break;
}
?>

