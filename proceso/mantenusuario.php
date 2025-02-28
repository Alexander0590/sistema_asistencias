<?php
 include('../conecxion/conecxion.php');

 $action = $_GET['action'] ?? '';

 switch ($action) {
     case 'create':
         // Crear un nuevo usuario
         if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $dni=$_POST['dni'];
            $datos = $_POST['datos'];
             $usuario = $_POST['usuario'];
             $password = $_POST['password'];
             $email = $_POST['email'];
             $telefono = $_POST['telefono'];
             $rol = $_POST['rol'];
             
             $query = "INSERT INTO usuarios (idusudni,datos, usuario, password, email,  rol ,telefono) VALUES ('$dni','$datos', '$usuario', '$password', '$email',  '$rol' ,$telefono)";
             if (mysqli_query($cnn, $query)) {
                 echo json_encode(["status" => "success"]);
             } else {
                 echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
             }
         }
         break;

         case 'read':
            // Leer todos los usuarios
            $query = "SELECT * FROM usuarios";
            $result = mysqli_query($cnn, $query);
            
            $usuarios = [];
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $usuarios[] = $row;
                }
            }
            echo json_encode($usuarios);
            break;
            
            case 'update':
                // Actualizar un usuario
                if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                    $dnivie = $_POST['dnivie'];
                    $dniusu = $_POST['dniusu'];
                    $datos = $_POST['datos'];
                    $usuario = $_POST['usuario'];
                    $password = $_POST['pass'];
                    $email = $_POST['email'];
                    $rol = $_POST['rol'];
                    $telefono = $_POST['telefono'];
            
                    $check_query = "SELECT idusudni FROM usuarios WHERE idusudni = '$dniusu' AND idusudni != '$dnivie'";
                    $result = mysqli_query($cnn, $check_query);
            
                    if (mysqli_num_rows($result) > 0) {
                        echo json_encode(["status" => "error", "message" => "El DNI ya está en uso por otro usuario."]);
                    } else {
                        $query = "UPDATE usuarios SET idusudni='$dniusu', datos='$datos', usuario='$usuario', password='$password', email='$email', rol='$rol', Telefono=$telefono WHERE idusudni = '$dnivie'";
                        if (mysqli_query($cnn, $query)) {
                            echo json_encode(["status" => "success"]);
                        } else {
                            echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                        }
                    }
                }
                break;

     case 'readOne':
     //traer usuario 
        $id = $_GET['id'];
        $sql = "SELECT * FROM usuarios WHERE idusudni = '$id'";
        $result = mysqli_query($cnn, $sql);
 
        if ($result && mysqli_num_rows($result) > 0) {
            $usuario = mysqli_fetch_assoc($result);
            echo json_encode($usuario);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado.']);
        }
            
        break;

     case 'delete':
         // Eliminar un usuario
         $id = $_GET['id'];
         echo $id;
         $query = "DELETE FROM usuarios WHERE idusudni = $id";
         if (mysqli_query($cnn, $query)) {
             echo json_encode(["status" => "success"]);
         } else {
             echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
         }
         break;
 
     default:
         echo json_encode(["status" => "error", "message" => "Acción no válida"]);
 }
?>