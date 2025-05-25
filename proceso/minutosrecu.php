<?php
 include('../conecxion/conecxion.php');

 $action = $_GET['action'] ?? '';

 switch ($action) {
    case 'minutorecu':
         // Leer todos los usuarios
            $query = "SELECT dr.*, p.nombres ,p.apellidos,a.fecha,p.dni 
            FROM dias_recuperados dr
            JOIN asistencia a ON dr.idasis = a.idasis
            JOIN personal p ON a.dni = p.dni";
            $result = mysqli_query($cnn, $query);
            
            $minutorecu = [];
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $minutorecu[] = $row;
                }
            }
            echo json_encode($minutorecu);
    break;
    
    default:
       
        break;
 }

 ?>