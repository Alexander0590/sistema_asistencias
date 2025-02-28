<?php

include('../conecxion/conecxion.php');
date_default_timezone_set("America/Lima");
// Obtener el total de personal
$sqlTotal = "SELECT COUNT(*) as total FROM personal";
$resultTotal = $cnn->query($sqlTotal);
$rowTotal = $resultTotal->fetch_assoc();
$totalPersonal = $rowTotal['total'];

// Obtener el número de personas que asistieron hoy
$fechaHoy = date("Y-m-d"); 
$sqlAsistieron = "SELECT COUNT(DISTINCT dni) as asistieron 
                  FROM asistencia 
                  WHERE fecha = '$fechaHoy'";
$resultAsistieron = $cnn->query($sqlAsistieron);
$rowAsistieron = $resultAsistieron->fetch_assoc();
$asistieron = $rowAsistieron['asistieron'];

// Calcular los que faltaron
$faltaron = $totalPersonal - $asistieron;

echo json_encode([
    'totalPersonal' => $totalPersonal,
    'asistieron' => $asistieron,
    'faltaron' => $faltaron
]);

$cnn->close();
?>