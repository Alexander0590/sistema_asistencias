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