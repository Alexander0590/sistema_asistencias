<?php

include('../conecxion/conecxion.php');
date_default_timezone_set('America/Lima');
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'regisfh':
        $dni = $_POST['dni'];
        $turno = $_POST['turno'];
        $justi = $_POST['justi'];
        $comentario = $_POST['comentario'];
        
    
        $fecha_hoy = date("Y-m-d"); 
        $dia_semana = date("l"); 
        $dia_semana_es = date("N"); 
    
        // Traducir el día al español 
        $dias_espanol = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        $dia_es = $dias_espanol[$dia_semana_es];
    
        if ($justi == "No") {
            $minutosdes = 480;
            $sql = "SELECT sueldo FROM personal WHERE dni = '$dni'";
            $result = $cnn->query($sql);
    
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $sueldo = $row["sueldo"];
    
                $gaxminuto = $sueldo / (30 * 8 * 60);
            }
    
            $montodescu = round($minutosdes * $gaxminuto, 2);
        } else {
            $minutosdes = 0;
            $montodescu = 0;
        }
    
        $sql_insert = "INSERT INTO asistencia_seguridad (dni, fecha, dia, turno,  estado, justificado,minutos_descu, comentario, descuento_dia) 
        VALUES ('$dni', '$fecha_hoy', '$dia_es', '$turno',  'Falto  ','$justi', '$minutosdes', '$comentario', '$montodescu')";

        if ($cnn->query($sql_insert) === TRUE) {
        echo "Falta registrada correctamente";
        } else {
        echo "Error al insertar: " . $cnn->error;
}
        
        break;
    
    default:
        
        break;
}



?>