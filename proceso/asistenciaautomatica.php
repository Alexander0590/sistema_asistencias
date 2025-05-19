<?php
 include('../conecxion/conecxion.php');

$id=0;
$dni = $_POST['adni'];
$fecha = $_POST['fecha_actual'];
$dia = $_POST['dia'];
$hora = $_POST['ashora'];
$turno = $_POST['turno'];
$estado = $_POST['estado'];

$tiempotrabajo=0;
$tiempotardanzadia=0;
$comentario="";
$comentariot="";

if(empty($dni)) {
    echo "Código no detectado.";
    return;
}

$queryVacaciones = "SELECT vacaciones FROM personal WHERE dni = '$dni'";
$resultadoVacaciones = $cnn->query($queryVacaciones);

if ($resultadoVacaciones->num_rows > 0) {
    $filaVacaciones = $resultadoVacaciones->fetch_assoc();
    if ($filaVacaciones['vacaciones'] == 'En proceso') {
        echo "La persona está de vacaciones.";
        exit;  
    }
}else{
    echo "Personal no existe en base de datos...!";
    return;
}

//sql para buscar antes de agregar o actualizar
$buscar_sql="select * from asistencia where dni='$dni' and fecha='$fecha' ";
$registro_sql=mysqli_query($cnn,$buscar_sql)or die("Error en buscar asistencia");
$encontrado_sql=mysqli_num_rows($registro_sql);
if($encontrado_sql==0){
    $respuesta_buscar="no_registrado";
}else{
    $respuesta_buscar="registrado";
    $asociado=mysqli_fetch_assoc($registro_sql);
    $codigo_asistencia=$asociado['idasis'];
    $totalmm=$asociado['minutos_descum'];
    $totalmt=$asociado['minutos_descut'];
    $estado_tarde=$asociado['estadot'];
    $totalmd=$totalmm+$totalmt;
}

//verificar si ya esta registrado en turno mañana o tarde
if($respuesta_buscar=="registrado" and $turno=="Mañana"){
    echo "Usted ya está registrado en el turno de la mañana...!";
    return;
}

if($respuesta_buscar=="registrado" and $turno=="Tarde" and $estado_tarde <>"" and $estado <> "Salida"){
    echo "Usted ya está registrado en el turno de la tarde...!";
    return;
}

if($respuesta_buscar=="no_registrado" and $estado=="Salida"){
    echo "Usted no ha registrado su ingreso en ningún turno!";
    return;
}

if($respuesta_buscar=="no_registrado" and $turno=="Tarde"){
    echo "Usted no ha registrado su ingreso en la mañana...!";
    return;
}
if ( $turno == ""){
    echo "Sistema fuera de servicio";
    return;
}

if($turno=="Mañana" and $respuesta_buscar=="no_registrado"){
    $toleranciam=new DateTime('08:15:59');
    $horasalm="";
    $estadom=$estado;
    $minutos_descum=0;
    $horaingresom=$hora;
    //valores para ingresar vacios los datos de la tarde
    $horasalt="";
    $estadot="";
    $minutos_descut=0;
    $horaingresot="";
    if($estadom=="Tardanza"){
        $horaingm = new DateTime($hora);
        $interval = $toleranciam->diff($horaingm);
        //$seconds = $interval->h * 3600 + $interval->i * 60 + $interval->s . " seconds <br>";
        $minutos_descum = $interval->h * 60 + $interval->i;
        //$hours = $interval->h . " hours <br>";
        //echo $seconds;
        echo $minutos_descum." minutos"; 
       // echo $hours;    
    }

        $sql="insert into asistencia 
        values($id,'$dni','$fecha','$dia','$horaingresom','$horasalm','$estadom',$minutos_descum,'$horaingresot',
        '$horasalt','$estadot',$minutos_descut,'$comentario','$comentariot',$tiempotrabajo,$tiempotardanzadia)";
        mysqli_query($cnn,$sql)or die("Error en registrar asistencia de la mañana");
        echo "Asistencia de: ". $dni." registrada correctamente, en turno de mañana!";
}



if($turno=="Tarde" and $respuesta_buscar=="registrado" and $estado_tarde==""){

    $toleranciat=new DateTime('14:10:59');
    $horasalt="";
    $estadot=$estado;
    $minutos_descut=0;
    $horaingresot=$hora;
    if($estadot=="Tardanza"){
        $horaingt = new DateTime($hora);
        $interval = $toleranciat->diff($horaingt);
        //$seconds = $interval->h * 3600 + $interval->i * 60 + $interval->s . " seconds <br>";
        $minutos_descut = $interval->h * 60 + $interval->i;
        //$hours = $interval->h . " hours <br>";
        //echo $seconds;
        echo $minutos_descut. " minutos <br>"; 
       // echo $hours;  
    }
    
        $sql="update asistencia 
        set horait='$horaingresot',estadot='$estadot',minutos_descut=$minutos_descut
        where idasis=$codigo_asistencia"; 
        mysqli_query($cnn,$sql)or die("Error en registrar asistencia de la tarde");
        echo "Asistencia de: ". $dni." registrada correctamente, en turno de tarde...!";

}

if ($estado == "Salida" and $respuesta_buscar == "registrado" and $turno == "Tarde") {
    // Consultar primero si ya tiene salida registrada
    $sql_check = "SELECT horast, dni FROM asistencia WHERE dni = $dni and fecha='$fecha' ";
    $result_check = mysqli_query($cnn, $sql_check) or die("Error al verificar la salida");

    $row = mysqli_fetch_assoc($result_check);

    if ($row['horast'] != '00:00:00' && $row['horast'] != '') {
        echo "Usted ya registró su salida anteriormente.";
        return;
    }

    // Si no tiene salida registrada, obtenemos el sueldo mensual del empleado
    $query_sueldo = "SELECT sueldo FROM personal WHERE dni = '$dni'";
    $result_sueldo = mysqli_query($cnn, $query_sueldo);

    if ($result_sueldo && mysqli_num_rows($result_sueldo) > 0) {
        $row_sueldo = mysqli_fetch_assoc($result_sueldo);
        $sueldo_mensual = $row_sueldo['sueldo'];

        // Calcular sueldo por día (asumiendo 30 días al mes)
        $sueldo_por_dia = $sueldo_mensual / 30;

        // Calcular sueldo por hora (asumiendo 8 horas de trabajo al día)
        $sueldo_por_hora = $sueldo_por_dia / 8;

        // Calcular sueldo por minuto (asumiendo 60 minutos por hora)
        $sueldo_por_minuto = number_format($sueldo_por_hora / 60, 2);

        
    } else {
        echo "Empleado no encontrado para el cálculo de sueldo.";
        return;
    }
    $totaldescu= $totalmd * $sueldo_por_minuto;
    $totaldescu = number_format($totaldescu, 2);
    // Si no tiene salida registrada, actualizamos
    $horasalt = $hora;
    $sql = "UPDATE asistencia 
            SET horast = '$horasalt', tiempo_tardanza_dia = $totalmd , descuento_dia = $totaldescu
            WHERE idasis = $codigo_asistencia"; 
    mysqli_query($cnn, $sql) or die("Error en control de asistencia, salida");
//para registrar horas extras


if($horasalt>='17:31:00'){ 
$idrec=0;
    $queryrec = "INSERT INTO  dias_recuperados values($idrec,$codigo_asistencia,60)";
mysqli_query($cnn,$queryrec)or die ("error en registrar extra");
}
//----
    echo "Salida de: " . $dni . " registrada correctamente...!";
}


?>