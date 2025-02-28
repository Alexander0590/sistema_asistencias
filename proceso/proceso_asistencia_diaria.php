<?php
include('../conecxion/conecxion.php'); // Conexión a la base de datos
//$opcion=$_GET['opcion'];
$accion=$_GET['accion'];

if($accion=="listar_faltas"){
  $sql="Select *
From personal
where personal.dni not in (select dni from asistencia where fecha = CURDATE()) ";

$registros=mysqli_query($cnn,$sql);
$cantidad=mysqli_num_rows($registros);
if($cantidad>0){
while($fila=mysqli_fetch_array($registros)){ $json[]=$fila;}
}else{ $json="sin_data";}

echo json_encode($json,JSON_UNESCAPED_UNICODE);
}



if($accion=="listar_registrados"){
    $sql2="Select *
  From personal p,asistencia a
  where p.dni=a.dni and  a.fecha = CURDATE() ";
  
  $registros2=mysqli_query($cnn,$sql2);
  $cantidad2=mysqli_num_rows($registros2);
  if($cantidad2>0){
  while($fila2=mysqli_fetch_array($registros2)){ $json2[]=$fila2;}
  }else{ $json2="sin_data";}
  
  echo json_encode($json2,JSON_UNESCAPED_UNICODE);
  }
?>