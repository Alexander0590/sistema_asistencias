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

    case "regisfdomingo":

        $dni = $_POST['dni'];
        $turno = $_POST['turno'];
        $justi = $_POST['justi'];
        $comentario = $_POST['comentario'];
        $fecha = $_POST['fecha3'];

        $timestamp = strtotime($fecha);
        
        $dia_semana_es = date("N", $timestamp);
        
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
    
        $sql_insert = "INSERT INTO asistencia_seguridad (dni, fecha, dia, turno,  estado, estado_salida, justificado,justificado_salida,minutos_descu, comentario, descuento_dia) 
        VALUES ('$dni', '$fecha', '$dia_es', '$turno',  'Falto','Falto','$justi','$justi', '$minutosdes', '$comentario', '$montodescu')";

        if ($cnn->query($sql_insert) === TRUE) {
        echo "Falta registrada correctamente";
        } else {
        echo "Error al insertar: " . $cnn->error;
}

        
    break;

    case "regisregidomingo":
        $dni = $_POST['dni'];
        $fecha3 = $_POST['fecha3'];
        $horai = $_POST['horai'];
        $estadoing = $_POST['estadoing'];
        $justifiingreso = $_POST['justifiingreso'];
        $estadosalida = $_POST['estadosalida'];
        $justisalida = $_POST['justisalida'];
        $turno = $_POST['turno'];
        $comentario = $_POST['comentario'];
        $hora_salida = ($_POST['horas']); 
        
        // Convertir fecha a timestamp
        $timestamp = strtotime($fecha3);
        
        // Calcular el día de la semana en español
        $dia_semana_es = date("N", $timestamp);
        $dias_espanol = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        $dia_es = $dias_espanol[$dia_semana_es];
        
        // Obtener sueldo del personal
        $query = "SELECT sueldo FROM personal WHERE dni = '$dni'";
        $result = mysqli_query($cnn, $query);
        $row = mysqli_fetch_assoc($result);
        $sueldo = $row['sueldo'];
        
        // Calcular el costo por minuto
        $gaxminuto = $sueldo / (30 * 8 * 60); 
        $descuento = 0;
        
        // Inicialización de variables
        $justificado = isset($justifiingreso) ? $justifiingreso : 'no';
        $justificado_salida = isset($justisalida) ? $justisalida : 'no';
        $minutosdes = 0;
        $montodescu = 0;
        
        if (empty($justifiingreso) || empty($justisalida) || $justifiingreso == 'si' && $justisalida == 'si') {
            $minutos_tarde = 0;
            $descuento = 0;
        } else if ($justifiingreso == 'no' || $justisalida == 'no') {
            // Determinar las horas permitidas de acuerdo al turno
            if ($turno == 'mañana') {
                $hora_permitida_ingreso = strtotime('08:15:59');
                $hora_permitida_salida = strtotime('16:00:00');
            } else if ($turno == 'tarde') {
                $hora_permitida_ingreso = strtotime('18:10:00');
                $hora_permitida_salida = strtotime('02:00:00');
            }
        
            // Calcular minutos de retraso en el ingreso
            $hora_ingreso = strtotime($horai);
            if ($hora_ingreso > $hora_permitida_ingreso) {
                $minutos_tarde = ($hora_ingreso - $hora_permitida_ingreso) / 60;
                $descuento += $minutos_tarde * $gaxminuto;
            }
        
            // Si el estado de salida es 'no', calcular minutos de retraso en la salida
            if ($estadosalida == 'no') {
                $hora_salida = strtotime($_POST['horas']); 
                if ($hora_salida > $hora_permitida_salida) {
                    $minutos_tarde_salida = ($hora_salida - $hora_permitida_salida) / 60;
                    $descuento += $minutos_tarde_salida * $gaxminuto;
                }
            }
        }
        
        // Asignar las variables calculadas
        $minutosdes = $minutos_tarde; // O el valor calculado que corresponda
        $montodescu = $descuento; // O el valor calculado que corresponda
        
        // Consulta SQL para insertar los datos
        $sql_insert = "INSERT INTO asistencia_seguridad (dni, fecha, dia, turno, estado, estado_salida, justificado, justificado_salida, minutos_descu, comentario, descuento_dia, horai, horas) 
        VALUES ('$dni', '$fecha3', '$dia_es', '$turno', '$estadoing', '$estadosalida', '$justificado', '$justificado_salida', '$minutosdes', '$comentario', '$montodescu', '$horai', '$hora_salida')";
        
        // Ejecutar la consulta
        mysqli_query($cnn, $sql_insert);
                
    break;
    default:

    break;
}



?>