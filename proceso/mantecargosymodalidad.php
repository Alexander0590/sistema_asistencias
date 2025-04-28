<?php
include('../conecxion/conecxion.php');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'read':
        // Leer todos los cargos
        $query = "SELECT * FROM cargos";
        $result = mysqli_query($cnn, $query);
        
        $cargos = [];
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $cargos[] = $row;
            }
        }
        echo json_encode($cargos);
    break;

    case 'read2':
        // Leer todos los modalidad
        $query = "SELECT * FROM modalidad";
        $result = mysqli_query($cnn, $query);
        
        $modalidad = [];
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $modalidad[] = $row;
            }
        }
        echo json_encode($modalidad);

    break;

    case 'readOne':
        //traer cargos
           $id = $_GET['id'];
           $sql = "SELECT * FROM cargos WHERE idcargo = $id";
           $result = mysqli_query($cnn, $sql);
    
           if ($result && mysqli_num_rows($result) > 0) {
               $cargos = mysqli_fetch_assoc($result);
               echo json_encode($cargos);
           } else {
               http_response_code(404);
               echo json_encode(['error' => 'Usuario no encontrado.']);
           }
               
    break;


    case 'readOne2':
        //traer modalidad
           $id = $_GET['id'];
           $sql = "SELECT * FROM modalidad WHERE idmodalidad = $id";
           $result = mysqli_query($cnn, $sql);
    
           if ($result && mysqli_num_rows($result) > 0) {
               $modalidad = mysqli_fetch_assoc($result);
               echo json_encode($modalidad);
           } else {
               http_response_code(404);
               echo json_encode(['error' => 'Usuario no encontrado.']);
           }
               
    break;

    case 'update':
        // Actualizar cargo
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            
                $id = intval($_POST['idc']); 
                $nombre = mysqli_real_escape_string($cnn, $_POST['nombre']);
                $descripcion = mysqli_real_escape_string($cnn, $_POST['descripcion']);
                $estado = mysqli_real_escape_string($cnn, $_POST['estado']);
    
                $query = "UPDATE cargos 
                          SET nombre = '$nombre', descripcion = '$descripcion', estado = '$estado' 
                          WHERE idcargo = $id";
    
                if (mysqli_query($cnn, $query)) {
                    echo json_encode(["status" => "success"]);
                } else {
                    echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                }
          
        }
        break;
    
    case 'update2':
        // Actualizar modalidad
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            
                $id = intval($_POST['idm']); 
                $nombre = mysqli_real_escape_string($cnn, $_POST['nombre']);
                $descripcion = mysqli_real_escape_string($cnn, $_POST['descripcion']);
                $estado = mysqli_real_escape_string($cnn, $_POST['estado']);
    
                $query = "UPDATE modalidad 
                          SET nombrem = '$nombre', descripcion = '$descripcion', estado = '$estado' 
                          WHERE idmodalidad = $id";
    
                if (mysqli_query($cnn, $query)) {
                    echo json_encode(["status" => "success"]);
                } else {
                    echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                }
          
        }
        break;
    

    case 'delete':
    // Eliminar un usuario
    $id = $_GET['id'];
    echo $id;
    $query = "DELETE FROM cargos WHERE idcargo = $id";
    if (mysqli_query($cnn, $query)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
    }
    break;

    case 'delete2':
        // Eliminar un usuario
        $id = $_GET['id'];
        echo $id;
        $query = "DELETE FROM modalidad WHERE idmodalidad = $id";
        if (mysqli_query($cnn, $query)) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
        }
        break;
    
default:
        # code...
break;

}

?>