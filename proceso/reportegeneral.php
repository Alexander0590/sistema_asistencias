<?php
include('../conecxion/conecxion.php');
date_default_timezone_set('America/Lima');
$action = $_GET['action'] ?? '';

switch ($action) {
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
  
    case 'read':

    $fechai=$_GET['fi'];
    $fechaf=$_GET['ff'];
        $query = "SELECT a.dni, p.apellidos,p.nombres,c.nombre,
COUNT(idasis)as dias_trabajo, sum(tiempo_tardanza_dia) as total_tardanza_mes, round(sum(descuento_dia),2) as STotaldesdia, sum(minutos_descum) as suma_tardanza_diurno,sum(minutos_descut) as suma_tardanza_tarde,
p.sueldo,
round((p.sueldo-sum(descuento_dia)),2)as sueldocondscto
from asistencia a, personal p, cargos c
where a.dni=p.dni
and p.idcargo=c.idcargo
and (a.fecha >='$fechai' and a.fecha<='$fechaf')
GROUP BY dni";
            $result = mysqli_query($cnn, $query);
            
            $asistencia = [];
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_array($result)) {
                    $dnibdr=$row['dni'];
                    //mkz
                    $buscar_dr="SELECT a.dni,sum(minutos_recuperados)as totalminrec
                    FROM dias_recuperados dr, asistencia a
                    WHERE dr.idasis=a.idasis
                    AND a.dni='$dnibdr' ";
                    $resdr=mysqli_query($cnn,$buscar_dr);
                    $resdr_a=mysqli_fetch_assoc($resdr);
                    $num_dr=$resdr_a['totalminrec'];
                    //mkz
                    $asistencia[]=array(
                        "dni"=>$row['dni'],
                        "apellidos"=>$row['apellidos'],
                        "nombres"=>$row['nombres'],
                        "nombre"=>$row['nombre'],
                        "dias_trabajo"=>$row['dias_trabajo'],
                        "total_tardanza_mes"=>$row['total_tardanza_mes'],
                        "STotaldesdia"=>$row['STotaldesdia'],
                        "suma_tardanza_diurno"=>$row['suma_tardanza_diurno'],
                        "suma_tardanza_tarde"=>$row['suma_tardanza_tarde'],
                        "sueldo"=>$row['sueldo'],
                        "sueldocondscto"=>$row['sueldocondscto'],
                        "totalminrec"=>$num_dr
                        );
                  // $asistencia[] = $row;
                }
            }
            echo json_encode($asistencia);

    break;
    
    
}
?>

