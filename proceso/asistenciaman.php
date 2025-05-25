<?php
include('../conecxion/conecxion.php');
date_default_timezone_set('America/Lima');
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'busast':
        
        if (isset($_POST['codigo']) && isset($_POST['fecha'])) {
        $codigo = $cnn->real_escape_string($_POST['codigo']);
        $fecha = $cnn->real_escape_string($_POST['fecha']); 
        
        $sql = "SELECT 
                a.fecha, 
                a.horaim, 
                a.horait, 
                a.horast 
                FROM personal p
                INNER JOIN asistencia a ON p.dni = a.dni
                WHERE p.dni = '$codigo' 
                AND a.fecha = '$fecha'"; 
        
        $resultado = $cnn->query($sql);
        
        if ($resultado && mysqli_num_rows($resultado) > 0) {
            $pasistencia = mysqli_fetch_assoc($resultado);
            echo json_encode($pasistencia);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'No hay registro para este código y fecha.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan parámetros (código o fecha).']);
    }
    break;
    case 'readfil':
            
            // Verificar si se enviaron parámetros
            if (!empty($_POST['dnire']) || (!empty($_POST['fechai']) && !empty($_POST['fechaf']))) {
                $dni = isset($_POST['dnire']) ? trim($_POST['dnire']) : '';
                $fechai = isset($_POST['fechai']) ? trim($_POST['fechai']) : '';
                $fechaf = isset($_POST['fechaf']) ? trim($_POST['fechaf']) : '';
            
                $query = "SELECT * FROM asistencia WHERE 1";
            
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
                    $asistencia = mysqli_fetch_all($result, MYSQLI_ASSOC);
                    header('Content-Type: application/json');
                    echo json_encode($asistencia);
                } else {
                    echo json_encode(['error' => 'Error al ejecutar la consulta: ' . mysqli_error($cnn)]);
                }
            } else {
                echo json_encode(['error' => 'Los campos estan vacios']);
            }
    
        
    break;
    case 'busp':
            if (isset($_POST['codigo'])) {
            $codigo = $cnn->real_escape_string($_POST['codigo']);
            $query = "SELECT * FROM personal WHERE dni = '$codigo'";
            $result = mysqli_query($cnn, $query);
            
            
            if ($result && mysqli_num_rows($result) > 0) {
                $pbus = mysqli_fetch_assoc($result);
                echo json_encode($pbus);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Usuario no encontrado.']);
            }
        } else {
            echo "vacio";
        }
    break;
    case 'read':
        $query = "SELECT * FROM asistencia";
            $result = mysqli_query($cnn, $query);
            
            $asistencia = [];
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $asistencia[] = $row;
                }
            }
            echo json_encode($asistencia);

    break;
    case 'create':
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $dni = isset($_POST['dni']) ? $_POST['dni'] : ''; 
            $fechare = isset($_POST['fechare']) ? $_POST['fechare'] : ''; 
            $horaim = isset($_POST['horaim']) ? $_POST['horaim'] : ''; 
            $estadom = isset($_POST['estadom']) ? $_POST['estadom'] : ''; 
            $minutos_descum = isset($_POST['minutos_descum']) && $_POST['minutos_descum'] !== '' ? floatval($_POST['minutos_descum']) : 0;
            $comentariom = isset($_POST['comentariom']) ? $_POST['comentariom'] : ''; 
            $horait = isset($_POST['horait']) ? $_POST['horait'] : ''; 
            $horast = isset($_POST['horast']) ? $_POST['horast'] : ''; 
            $estadot = isset($_POST['estadot']) ? $_POST['estadot'] : ''; 
            $minutos_descut = isset($_POST['minutos_descut']) && $_POST['minutos_descut'] !== '' ? floatval($_POST['minutos_descut']) : 0;
            $comentariot = isset($_POST['comentariot']) ? $_POST['comentariot'] : ''; 
            $totaldes = isset($_POST['totaldes']) && $_POST['totaldes'] !== '' ? floatval($_POST['totaldes']) : 0;
            $totalmin = isset($_POST['totalmin']) && $_POST['totalmin'] !== '' ? intval($_POST['totalmin']) : 0;


           

            $estadomc = ($estadom == "1") ? "Puntual" : (($estadom == "2") ? "Tardanza" : "");
            $estadotc = ($estadot == "1") ? "Puntual" : (($estadot == "2") ? "Tardanza" : "");
        
            $dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
            $nombreDia = ucfirst($dias[date('w', strtotime($fechare))]);
        
            $dni_query = "SELECT * FROM asistencia WHERE dni = '$dni' AND fecha = '$fechare'";
            $result = mysqli_query($cnn, $dni_query);
            
            if (mysqli_num_rows($result) > 0) {
                echo json_encode(["error" => false, "message" => "El personal con DNI $dni ya está registrado"]);
                mysqli_close($cnn);
                exit;
            } else {
                
                $cargo_query = "
                    SELECT c.nombre AS cargo_nombre
                    FROM personal p
                    INNER JOIN cargos c ON p.idcargo = c.idcargo
                    WHERE p.dni = '$dni'
                ";
                $cargo_result = mysqli_query($cnn, $cargo_query);
            
                if (mysqli_num_rows($cargo_result) == 0) {
                    echo json_encode(["error" => true, "message" => "No se encontró información del personal con ese DNI."]);
                    mysqli_close($cnn);
                    exit;
                }
            
                $cargo_data = mysqli_fetch_assoc($cargo_result);
                
                if (strtolower($cargo_data['cargo_nombre']) == 'serenazgo') {
                    echo json_encode(["error" => true, "message" => "El trabajador con DNI $dni pertenece a Serenazgo y no puede registrarse en este formulario."]);
                    mysqli_close($cnn);
                    exit;
                }
            
                $query = "INSERT INTO asistencia (dni, fecha, dia, horaim, horasm, estadom, minutos_descum, horait, horast, estadot, comentario, comentariot, minutos_descut, descuento_dia,tiempo_tardanza_dia) 
                VALUES ('$dni', '$fechare', '$nombreDia', '$horaim', '13:00:00', '$estadomc', $minutos_descum, '$horait', '$horast', '$estadotc', '$comentariom', '$comentariot', $minutos_descut, $totaldes, $totalmin)";
            
                if (mysqli_query($cnn, $query)) {
                     if($horast>'17:00:00'){
                    $horaInicio = new DateTime('16:30:00');
                    $horaTermino = new DateTime($horast);
                    $interval = $horaInicio->diff($horaTermino);
                    $minutos = ($interval->h * 60) + $interval->i;

                    $buscar_idasis="SELECT * from asistencia where dni='$dni' and fecha='$fechare'";
                    $rb=mysqli_query($cnn,$buscar_idasis);
                    $rb_a=mysqli_fetch_assoc($rb);  
                    $cod_asis=$rb_a['idasis'];
                    $agregar_dr="INSERT INTO dias_recuperados VALUES(0,$cod_asis,$minutos)";
                    mysqli_query($cnn,$agregar_dr);
                    }
                    echo json_encode(["success" => true, "message" => "Asistencia registrada correctamente"]);
                } else {
                    echo json_encode(["error" => false , "message" => "Error en la base de datos: " . mysqli_error($cnn)]);
                }
            

                mysqli_close($cnn);
            }
        
           
        }
    break;
    
    case'update':

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $dni = $_POST['codigo'];
            $fecha = $_POST['fecha'];
            $horaim = $_POST['hentradam'];
            $horasm = '13:00:00'; 
            $estadom = $_POST['estadom'];
            $minutos_descum = $_POST['mdesm'];
            $horait = $_POST['hentradat'];
            $horast = $_POST['hsalidat'];
            $estadot = $_POST['estadot'];
            $minutos_descut = $_POST['mdest'];
            $comentario = $_POST['comenm'];
            $comentariot = $_POST['coment'];
            $descuento_dia = $_POST['totdescu'];
            $tiempo_tardanza_dia = $_POST['totminu'];

            

            switch ($estadom) {
                case '1':
                    $estadoTexto = 'Puntual';
                    break;
                case '2':
                    $estadoTexto = 'Tardanza';
                    break;
                case '3':
                    $estadoTexto = 'Falta';
                    break;
                case '4':
                    $estadoTexto = 'Trabajo en Campo';
                    break;
                default:
                    $estadoTexto = 'Desconocido';
                    break;
            }
            switch ($estadot) {
                case '1':
                    $estadoTextoT = 'Puntual';
                    break;
                case '2':
                    $estadoTextoT = 'Tardanza';
                    break;
                case '3':
                    $estadoTextoT = 'Falta';
                    break;
                case '4':
                    $estadoTextoT = 'Trabajo en Campo';
                    break;
                default:
                    $estadoTextoT = 'Desconocido';
                    break;
            }
        
            $sql = "UPDATE asistencia SET
                fecha = ?,
                horaim = ?,
                horasm = ?,
                estadom = ?,
                minutos_descum = ?,
                horait = ?,
                horast = ?,
                estadot = ?,
                minutos_descut = ?,
                comentario = ?,
                comentariot = ?,
                descuento_dia = ?,
                tiempo_tardanza_dia = ?
                WHERE dni = ? and fecha=?";
        
            $stmt = $cnn->prepare($sql);
        
            $stmt->bind_param("ssssisssissdiss",
                $fecha, $horaim, $horasm, $estadoTexto, $minutos_descum,
                $horait, $horast, $estadoTextoT, $minutos_descut,
                $comentario, $comentariot, $descuento_dia,
                $tiempo_tardanza_dia, $dni,$fecha
            );
        
            if ($stmt->execute()) {
                echo "Registro actualizado correctamente.";
            } else {
                echo "Error al actualizar: " . $stmt->error;
            }
        
            $stmt->close();
            $cnn->close();
        }
        
        

    break;
case 'cerrardia':
// Obtener la fecha de hoy
$fechaHoy = date('Y-m-d');
$nombreDia = date('l'); // Devuelve el nombre del día en inglés (Monday, Tuesday, etc.)

// Traducir el día al español
$diasInglesEspanol = [
    'Monday' => 'Lunes',
    'Tuesday' => 'Martes',
    'Wednesday' => 'Miércoles',
    'Thursday' => 'Jueves',
    'Friday' => 'Viernes',
    'Saturday' => 'Sábado',
    'Sunday' => 'Domingo'
];
$nombreDiaEspanol = $diasInglesEspanol[$nombreDia] ?? 'Día no definido';

// 1. Obtener todos los empleados activos
$sqlPersonal = "SELECT 
    dni, 
    sueldo, 
    p.idcargo, 
    c.nombre AS nombre_cargo, 
    c.idcargo 
FROM 
    personal p 
JOIN 
    cargos c 
ON 
    p.idcargo = c.idcargo 
WHERE 
    p.estado = 'Activo' 
    AND p.vacaciones <> 'En proceso' 
    AND c.nombre <> 'Serenazgo'";
$resultPersonal = $cnn->query($sqlPersonal);

if (!$resultPersonal) {
    echo json_encode(['success' => false, 'message' => 'Error al obtener personal: ' . $cnn->error]);
    $cnn->close();
    exit;
}

// 2. Obtener los DNIs con asistencia hoy
$sqlAsistencia = "SELECT DISTINCT dni FROM asistencia WHERE fecha = ?";
$stmtAsistencia = $cnn->prepare($sqlAsistencia);
if (!$stmtAsistencia) {
    echo json_encode(['success' => false, 'message' => 'Error al preparar consulta: ' . $cnn->error]);
    $cnn->close();
    exit;
}

$stmtAsistencia->bind_param('s', $fechaHoy);
$stmtAsistencia->execute();
$resultAsistencia = $stmtAsistencia->get_result();
$asistenciasHoy = $resultAsistencia->fetch_all(MYSQLI_ASSOC);
$stmtAsistencia->close();

// 3. Identificar quienes faltaron (no tienen registro de asistencia)
$dnisConAsistencia = array_column($asistenciasHoy, 'dni');
$personalActivo = $resultPersonal->fetch_all(MYSQLI_ASSOC);
$faltantes = array_filter($personalActivo, 
    function($empleado) use ($dnisConAsistencia) {
        return !in_array($empleado['dni'], $dnisConAsistencia);
    }
);

// 4. Registrar las faltas
$filasInsertadas = 0;
$filasActualizadas = 0;

// Configuración de descuentos
$minutosPorMes = 30 * 8 * 60; // 30 días * 8 horas * 60 minutos
$minutosFalta = 8 * 60; // 8 horas en minutos
$minutosMediaFalta = 180; // 3 horas en minutos

foreach ($faltantes as $empleado) {
    $valorPorMinuto = $empleado['sueldo'] / $minutosPorMes;
    $descuento = round($minutosFalta * $valorPorMinuto, 2);
    
    $sqlInsert = "INSERT INTO asistencia 
                 (dni, fecha, dia, horaim,horasm,horait, horast, estadom,estadot,  minutos_descum,minutos_descut, descuento_dia, tiempo_tardanza_dia,comentario,comentariot) 
                 VALUES (?,?,'$nombreDiaEspanol','00:00:00','00:00:00', '00:00:00', '00:00:00','Falta', 'Falta', 300,180, ?, ?,'Generado por el boton de cierre de dia','Generado por el boton de cierre de dia')";
    
    $stmt = $cnn->prepare($sqlInsert);
    if (!$stmt) {
        error_log("Error al preparar inserción para DNI: {$empleado['dni']} - " . $cnn->error);
        continue;
    }
    
    $stmt->bind_param('ssdi', 
        $empleado['dni'], 
        $fechaHoy,
        $descuento,
        $minutosFalta
    );
    
    if ($stmt->execute()) {
        $filasInsertadas++;
    }
    $stmt->close();
}

// 5. Actualizar asistencias incompletas (horait y horasm vacíos)
$sqlIncompletos = "SELECT a.*, p.sueldo 
                  FROM asistencia a
                  JOIN personal p ON a.dni = p.dni
                  WHERE a.fecha = ?
                  AND (a.horait = '00:00:00' OR a.horast = '00:00:00') and(a.horaim  <>'00:00:00' OR a.horasm <> '00:00:00')";
$stmtIncompletos = $cnn->prepare($sqlIncompletos);
if ($stmtIncompletos) {
    $stmtIncompletos->bind_param('s', $fechaHoy);
    $stmtIncompletos->execute();
    $resultIncompletos = $stmtIncompletos->get_result();
    $incompletos = $resultIncompletos->fetch_all(MYSQLI_ASSOC);
    $stmtIncompletos->close();
    
    foreach ($incompletos as $empleado) {
        $valorPorMinuto = $empleado['sueldo'] / $minutosPorMes;
        $descuento = round($minutosMediaFalta * $valorPorMinuto, 2);
        $descuento2=round($empleado['minutos_descum'] * $valorPorMinuto, 2);
        $totalminutos= $minutosMediaFalta+$empleado['minutos_descum'];
        $totaldescu= round($descuento+ $descuento2,2);
        
        $sqlUpdate = "UPDATE asistencia 
                     SET estadot = 'Falta', 
                         minutos_descut = ?,
                         descuento_dia = ?,
                         tiempo_tardanza_dia = ?
                         comentariot='Generado por el boton de cierre de dia'
                     WHERE dni = ? AND fecha = ?";
        
        $stmtUpdate = $cnn->prepare($sqlUpdate);
        if ($stmtUpdate) {
            $stmtUpdate->bind_param('idiss', 
                $minutosMediaFalta,
                $totaldescu,
                $totalminutos,
                $empleado['dni'],
                $fechaHoy
            );
            
            if ($stmtUpdate->execute()) {
                $filasActualizadas++;
            }
            $stmtUpdate->close();
        }
    }
}

// Resultado final
$mensajes = [];
if ($filasInsertadas > 0) {
    $mensajes[] = "Faltas registradas: {$filasInsertadas} empleados marcados como faltantes";
}
if ($filasActualizadas > 0) {
    $mensajes[] = "Asistencias incompletas actualizadas: {$filasActualizadas} empleados con descuento de 180 minutos";
}

if (count($mensajes) > 0) {
    echo json_encode([
        'success' => true, 
        'message' => implode('. ', $mensajes)
    ]);
} else {
    echo json_encode([
        'success' => true, 
        'message' => 'No se encontraron registros para actualizar o insertar'
    ]);
}

$cnn->close();
    break;
  default:
    echo json_encode(["status" => "error", "message" => "Acción no válida"]);
        break;
}
?>

