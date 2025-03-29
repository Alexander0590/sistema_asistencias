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
    case "registrsali":
        $dni = $_POST['dni'];
        $horasa = $_POST['horasa'];
        $fecha = $_POST['fecha'];
        $estado = $_POST['estado'];

         $sql = "UPDATE asistencia_seguridad SET horas = '$horasa', estado_salida = '$estado', minutos_descu = 0 , descuento_dia = 0 WHERE dni = '$dni' and fecha =' $fecha'";


         if ($cnn->query($sql) === TRUE) {
            echo "success";
        } else {
            echo "error: No se pudo actualizar el registro";
        }

       
    break;

    case "registrsalijusti":
      
        $dni = $_POST['dni'];
        $horasa = $_POST['horas'];
        $fecha = $_POST['fecha2'];
        $justi = $_POST['justificar'];
        $comen = $_POST['comen'];

        date_default_timezone_set('America/Lima');

        if ($justi == "No") {
            
            $fechaActual = date('Y-m-d');
            
            if($fecha==$fechaActual){
            $limite = strtotime("16:00:00");
            }else{
                $limite = strtotime("02:00:00");
            }
             
            $horaIngresada = strtotime($horasa);
        
            $diferenciaSegundos = $limite - $horaIngresada;
            $diferenciaMinutos = $diferenciaSegundos / 60; 
            $minutosdes = $diferenciaMinutos;
            
            $sql = "SELECT p.sueldo, a.descuento_dia, a.minutos_descu
                    FROM personal p
                    JOIN asistencia_seguridad a ON p.dni = a.dni
                    WHERE p.dni = '$dni' and a.fecha = '$fecha'";
        
            $result = $cnn->query($sql);
        
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $sueldo = $row["sueldo"];
                $minutos_descu2 = $row["minutos_descu"];
                $montodes = $row["descuento_dia"];
                $total_minu = $minutosdes + $minutos_descu2;
                $gaxminuto = $sueldo / (30 * 8 * 60);
                $montodescu = round($minutosdes * $gaxminuto, 2);
                $total_montodes = $montodes + $montodescu;
            }
        } else {
            $sql = "SELECT p.sueldo, a.descuento_dia, a.minutos_descu
                    FROM personal p
                    JOIN asistencia_seguridad a ON p.dni = a.dni
                    WHERE p.dni = '$dni' and a.fecha = '$fecha'";
        
            $result = $cnn->query($sql);
        
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $minutos_descu2 = !empty($row["minutos_descu"]) ? $row["minutos_descu"] : 0;
                $montodes = !empty($row["descuento_dia"]) ? $row["descuento_dia"] : 0;
                $total_minu = $minutos_descu2;
                $total_montodes = $montodes;
            }
        }
        
        $sql = "UPDATE asistencia_seguridad SET horas = '$horasa', estado_salida = 'Anticipada', justificado_salida = '$justi', comentario_salida = '$comen', minutos_descu = $total_minu, descuento_dia = $total_montodes WHERE dni = '$dni' and fecha = '$fecha'";
        
        if ($cnn->query($sql) === TRUE) {
            echo "success";
        } else {
            echo "error: No se pudo actualizar el registro";
        }
    break;
    default:

    break;
}



?>