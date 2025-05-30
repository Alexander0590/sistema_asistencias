<?php
 include('../conecxion/conecxion.php');

 $action = $_GET['action'] ?? '';

 switch ($action) {
    case 'create':
        // Crear un nuevo personal
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
           $dni = $_POST['dni'];
           $nombres = $_POST['nombres'];
           $apellidos = $_POST['apellidos'];
           $modalidad = $_POST['modalidad'];
           $cargo = $_POST['cargo'];
           $fechanaci = $_POST['fechanaci'];
           $sueldo = $_POST['sueldo'];
           $foto64 = $_POST['foto'];
          
            // busqueda de dni 
            $dni_query = "SELECT dni FROM personal WHERE dni = '$dni'";
            $result = mysqli_query($cnn, $dni_query);

            if (mysqli_num_rows($result) > 0) {
                echo json_encode(["status" => "error", "message" => "El DNI ya está registrado"]);
            } else {
                $query = "INSERT INTO personal (dni, nombres, apellidos, modalidad_contratacion, idcargo, fecha_nacimiento,  sueldo, fecha_registro, foto ,vacaciones) 
                          VALUES ('$dni', '$nombres','$apellidos', '$modalidad', $cargo, '$fechanaci', $sueldo, NOW(), '$foto64', 'Sin solicitar')";
                if (mysqli_query($cnn, $query)) {
                    echo json_encode(["status" => "success"]);
                } else {
                    echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                }
            }
        }
        break;


    case 'readva2':
            // Leer todos los personal sin solicitar para vacaciones
            $query = "SELECT personal.*, cargos.nombre AS nombre_cargo
                    FROM 
                        personal
                    INNER JOIN 
                        cargos 
                    ON 
                    personal.idcargo = cargos.idcargo and vacaciones='Sin solicitar';";
            $result = mysqli_query($cnn, $query);
            
            $personal = [];
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $personal[] = $row;
                }
            }
            echo json_encode($personal);
            break;
            case 'read':
                // Leer todos los usuarios
                $query = "SELECT personal.*, cargos.nombre AS nombre_cargo
                        FROM 
                            personal
                        INNER JOIN 
                            cargos 
                        ON 
                        personal.idcargo = cargos.idcargo;";
                $result = mysqli_query($cnn, $query);
                
                $personal = [];
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $personal[] = $row;
                    }
                }
                echo json_encode($personal);
        break;
     case 'update':
         // Actualizar un usuario
         if ($_SERVER['REQUEST_METHOD'] == 'POST') {
             $dnivie=$_POST['dnivie'];
             $dni = $_POST['dni'];
             $nombres = $_POST['nombres'];
             $apellidos = $_POST['apellidos'];
             $modalidad = $_POST['modalidad'];
             $cargo = $_POST['cargo'];
             $fechanaci = $_POST['fecha_nacimiento'];
             $sueldo = $_POST['sueldo'];
             $foto = $_POST['foto'];
             $estado= $_POST['estado'];
             $vacacio= $_POST['vacacio'];
            
       
             if($estado == "1"){
                $estado1="activo";
             }else{
                $estado1="inactivo";
             }
             
             
             $check_query = "SELECT dni FROM personal WHERE dni = '$dni' AND dni != '$dnivie'";
                    $result = mysqli_query($cnn, $check_query);
            
                    if (mysqli_num_rows($result) > 0) {
                        echo json_encode(["status" => "error", "message" => "El DNI ya está en uso por otro Trabajador."]);
                    } else {
                        $query = "UPDATE personal SET  dni= '$dni' , nombres = '$nombres', apellidos = '$apellidos', modalidad_contratacion = '$modalidad', idcargo = $cargo, fecha_nacimiento= '$fechanaci' ,sueldo= $sueldo , vacaciones= '$vacacio' ,foto = '$foto' ,estado = '$estado1'
                        WHERE dni = '$dnivie'";                        
                        if (mysqli_query($cnn, $query)) {
                            echo json_encode(["status" => "success"]);
                        } else {
                            echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                        }
                        if ($vacacio=="Sin solicitar") {
                           $query2="DELETE FROM vacaciones where dni='$dnivie' and year=YEAR(CURDATE());";
                           mysqli_query($cnn ,$query2);
                        }

                    }
         }
         break;


     case 'readOne':
     //traer usuario 
        $id = $_GET['id'];
        $sql = "SELECT * FROM personal WHERE dni = $id";
        $result = mysqli_query($cnn, $sql);
 
        if ($result && mysqli_num_rows($result) > 0) {
            $usuario = mysqli_fetch_assoc($result);
            echo json_encode($usuario);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado.']);
        }
            
        break;
//eliminar personal
        case 'delete':
            $id = $_GET['id'];
        
            if (!empty($id)) {
                mysqli_begin_transaction($cnn);
        
                try {
                    $queryAsistencia = "DELETE FROM asistencia WHERE dni = ?";
                    $stmtAsistencia = mysqli_prepare($cnn, $queryAsistencia);
                    mysqli_stmt_bind_param($stmtAsistencia, "s", $id);
                    mysqli_stmt_execute($stmtAsistencia);
        
                    $queryPersonal = "DELETE FROM personal WHERE dni = ?";
                    $stmtPersonal = mysqli_prepare($cnn, $queryPersonal);
                    mysqli_stmt_bind_param($stmtPersonal, "s", $id);
                    mysqli_stmt_execute($stmtPersonal);
        
                    mysqli_commit($cnn);
        
                    echo json_encode(["status" => "success"]);
                } catch (Exception $e) {
                    mysqli_rollback($cnn);
                    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "ID no válido"]);
            }
            break;
            case 'createcargo':
            $nombres = $_POST['nombre'];
            $descripcion = $_POST['descripcion'];

            $query = "INSERT INTO cargos (nombre, descripcion, fecha_creacion, estado) 
                          VALUES ('$nombres', '$descripcion', NOW() ,'activo')";
                if (mysqli_query($cnn, $query)) {
                    echo json_encode(["status" => "success"]);
                } else {
                    echo json_encode(["status" => "error", "message" => mysqli_error($cnn)]);
                }

            break;
            case 'createmodalidad':

                $nombres = $_POST['nombre'];
                $descripcion = $_POST['descripcion'];
    
                $query = "INSERT INTO modalidad (nombrem, descripcion, fecha_creacion, estado) 
                              VALUES ('$nombres', '$descripcion', NOW() ,'activo')";
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