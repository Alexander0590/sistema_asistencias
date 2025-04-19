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
    
        $sql_insert = "INSERT INTO asistencia_seguridad (dni, fecha, dia, turno,  estado, horai, horas, estado_salida, justificado, justificado_salida, minutos_descu, comentario, descuento_dia) 
        VALUES ('$dni', '$fecha_hoy', '$dia_es', '$turno',  'Falto','00:00:00','00:00:00','Falto','$justi','$justi', '$minutosdes', '$comentario', '$montodescu')";

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
        $turno = $_POST['turno'];
        $justi = $_POST['justificar'];
        $comen = $_POST['comen'];

        date_default_timezone_set('America/Lima');

        if ($justi == "No") {
            
            $fechaActual = date('Y-m-d');
            
            if($turno=="Mañana"){
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
    
        $sql_insert = "INSERT INTO asistencia_seguridad (dni, fecha, dia, turno,  estado, horai, horas, estado_salida, justificado,justificado_salida,minutos_descu, comentario, descuento_dia) 
        VALUES ('$dni', '$fecha', '$dia_es', '$turno',  'Falto','00:00:00','00:00:00','Falto','$justi','$justi', '$minutosdes', '$comentario', '$montodescu')";

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
            if ($turno == 'Mañana') {
                $hora_permitida_ingreso = strtotime('08:15:59');
                $hora_permitida_salida = strtotime('16:00:00');
            } else if ($turno == 'Tarde') {
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
    case"readreporte";
    $query = "SELECT * FROM asistencia_seguridad";
    $result = mysqli_query($cnn, $query);
    $serenazgo = [];
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $serenazgo[] = $row;
        }
    }
    echo json_encode($serenazgo);

    break;
    case "filtroreporte":
        if (!empty($_POST['dnire']) || (!empty($_POST['fechai']) && !empty($_POST['fechaf']))) {
            $dni = isset($_POST['dnire']) ? trim($_POST['dnire']) : '';
            $fechai = isset($_POST['fechai']) ? trim($_POST['fechai']) : '';
            $fechaf = isset($_POST['fechaf']) ? trim($_POST['fechaf']) : '';
        
            $query = "SELECT * FROM asistencia_seguridad WHERE 1";
        
            if (!empty($dni)) {
                $dni = mysqli_real_escape_string($cnn, $dni);
                $query .= " AND dni = '$dni'";
            }
        
            if (!empty($fechai) && !empty($fechaf)) {
                $fechai = mysqli_real_escape_string($cnn, $fechai);
                $fechaf = mysqli_real_escape_string($cnn, $fechaf);
                $query .= " AND fecha BETWEEN '$fechai' AND '$fechaf'";
            }
        
            $result = mysqli_query($cnn, $query);
        
            if ($result) {
                $serenazgo = mysqli_fetch_all($result, MYSQLI_ASSOC);
                header('Content-Type: application/json');
                echo json_encode($serenazgo);
            } else {
                echo json_encode(['error' => 'Error al ejecutar la consulta: ' . mysqli_error($cnn)]);
            }
        } else {
            echo json_encode(['error' => 'Los campos estan vacios']);
        }

    break;

    case "obtener_turno":
        if ($_GET['action'] == 'obtener_turno') {
            $dni = $_POST['dni'];
            $fecha = $_POST['fecha2'];
        
            // Consulta para obtener el turno del trabajador
            $query = "SELECT turno FROM asistencia_seguridad WHERE dni = ? and fecha = ?";
            $stmt = $cnn->prepare($query);
            $stmt->bind_param("ss", $dni,$fecha);
            $stmt->execute();
            $result = $stmt->get_result();
        
            if ($row = $result->fetch_assoc()) {
                echo json_encode(['turno' => $row['turno']]);
            } else {
                echo json_encode(['turno' => null]);
            }
            exit;
        }
    break;

    case 'readone':

        $dni = $_POST['dni'];

        $sql = "SELECT * FROM asistencia_seguridad WHERE dni = ? AND fecha = CURDATE()";
        $stmt = $cnn->prepare($sql);
        $stmt->bind_param("s", $dni);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($row = $result->fetch_assoc()) {
          echo json_encode($row);
        } else {
          echo json_encode(null);
        }

    break;


case 'update':
// Recibiendo datos del formulario
$dni = $_POST['dni'] ?? '';
$fecha = $_POST['fecha'] ?? '';
$turno = $_POST['turno'] ?? '';
$horaIngreso = $_POST['horaIngreso'] ?? '';
$estadoIngreso = $_POST['estadoIngreso'] ?? '';
$horaSalida = $_POST['horaSalida'] ?? '';
$estadoSalida = $_POST['estadoSalida'] ?? '';
$comentario = $_POST['comentario'] ?? '';

$justificacionIngreso = ($estadoIngreso === 'Puntual') ? '' : ($_POST['justificacionIngreso'] ?? '');
$justificacionSalida = ($estadoSalida === 'Salida Normal') ? '' : ($_POST['justificacionSalida'] ?? '');

// Variables por defecto
$minutosdes = 0;
$montodescu = 0;
$sueldo = 0;
$gaxminuto = 0;

// Obtener sueldo del empleado
$sqlSueldo = "SELECT sueldo FROM personal WHERE dni = ?";
$stmtSueldo = $cnn->prepare($sqlSueldo);
$stmtSueldo->bind_param("s", $dni);
$stmtSueldo->execute();
$stmtSueldo->bind_result($sueldo);
$stmtSueldo->fetch();
$stmtSueldo->close();

if ($sueldo > 0) {
    $gaxminuto = $sueldo / (30 * 8 * 60); 
}

// Si faltó y no justificó
if ($estadoIngreso === 'Falto' && $justificacionIngreso === 'No') {
    $minutosdes = 480;
    $montodescu = round($minutosdes * $gaxminuto, 2);
}

// Tardanza sin justificación
if ($estadoIngreso === 'Tardanza' && $justificacionIngreso === 'No' && !empty($horaIngreso)) {
    $tolerancia = ($turno === 'Mañana') ? "08:15:59" : "18:10:59";

    $horaIngresada = strtotime($horaIngreso);
    $horaTolerancia = strtotime($tolerancia);

    if ($horaIngresada > $horaTolerancia) {
        $diferenciaMinutos = intval(($horaIngresada - $horaTolerancia) / 60);
        $minutosdes += $diferenciaMinutos;
        $montodescu += round($diferenciaMinutos * $gaxminuto, 2);
    }
    
}

// Salida anticipada sin justificación
if ($estadoSalida === 'Salida Anticipada' && $justificacionSalida === 'No' && !empty($horaSalida)) {
    $limite = ($turno === "Mañana") ? "16:00:00" : "02:00:00";
    $horaLimite = strtotime($limite);

    if ($turno !== "Mañana") {
        $horaLimite = strtotime($limite . " +1 day");
    }

    $horaSalidaTimestamp = strtotime($horaSalida);

    if ($horaSalidaTimestamp < $horaLimite) {
        $diferenciaMinutos = intval(($horaLimite - $horaSalidaTimestamp) / 60);
        $minutosdes += $diferenciaMinutos;
        $montodescu += round($diferenciaMinutos * $gaxminuto, 2);
    }
}

// Día de la semana
$dias = array(
    'Monday' => 'Lunes',
    'Tuesday' => 'Martes',
    'Wednesday' => 'Miércoles',
    'Thursday' => 'Jueves',
    'Friday' => 'Viernes',
    'Saturday' => 'Sábado',
    'Sunday' => 'Domingo'
);
$diaSemana = date('l', strtotime($fecha));
$dia = $dias[$diaSemana] ?? $diaSemana;

// Actualizar asistencia
$sqlUpdate = "UPDATE asistencia_seguridad SET 
    turno = ?, 
    estado = ?, 
    estado_salida = ?, 
    justificado = ?, 
    justificado_salida = ?, 
    horai = ?, 
    horas = ?, 
    comentario = ?, 
    minutos_descu = ?, 
    descuento_dia = ?, 
    dia = ?
    WHERE dni = ? AND fecha = ?";

$stmt = $cnn->prepare($sqlUpdate);
if (!$stmt) {
    die("Error en la preparación de la consulta: " . $cnn->error);
}

$stmt->bind_param(
    "sssssssddssss",  
    $turno,
    $estadoIngreso,
    $estadoSalida,
    $justificacionIngreso,
    $justificacionSalida,
    $horaIngreso,
    $horaSalida,
    $comentario,
    $minutosdes,
    $montodescu,
    $dia,
    $dni,
    $fecha
);

if (!$stmt->execute()) {
    echo "Error al actualizar la asistencia: " . $stmt->error;
} else {
    echo "Asistencia actualizada correctamente.";
}

$stmt->close();
break;


default:
break;
}



?>