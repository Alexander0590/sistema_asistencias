<?php
 include('../conecxion/conecxion.php');
 $action = $_GET['action'] ?? '';
 switch ($action) {
    case 'reccago':
        
        $sql = "SELECT idcargo, nombre FROM cargos WHERE estado = 'activo'";
        $resultado = $cnn->query($sql);

        if ($resultado->num_rows > 0) {
            echo "<option value=''>Seleccione un cargo</option>";
            while ($fila = $resultado->fetch_assoc()) {
                echo "<option value='" . $fila['idcargo'] . "'>" . $fila['nombre'] . "</option>";
            }
        } else {
            echo "<option value=''>No hay cargos disponibles</option>";
        }
    break;
    case 'recmodalidad':
        
        $sql = "SELECT  nombrem FROM modalidad WHERE estado = 'activo'";
        $resultado = $cnn->query($sql);

        if ($resultado->num_rows > 0) {
            echo "<option value=''>Seleccione un Modalidad</option>";
            while ($fila = $resultado->fetch_assoc()) {
                echo "<option value='" . $fila['nombrem'] . "'>" . $fila['nombrem'] . "</option>";
            }
        } else {
            echo "<option value=''>No hay cargos disponibles</option>";
        }
    break;
    default:
       
        break;
 }

 ?>