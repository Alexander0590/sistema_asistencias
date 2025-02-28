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

if($respuesta_buscar=="registrado" and $turno=="Tarde" and $estado_tarde<>""){
    echo "Usted ya está registrado en el turno de la tarde...!";
    return;
}

if($respuesta_buscar=="no_registrado" and $turno=="Salida"){
    echo "Usted no ha registrado su ingreso...!";
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
        '$horasalt','$estadot',$minutos_descut,'$comentario',$tiempotrabajo,$tiempotardanzadia)";
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

if($turno=="Salida" and $respuesta_buscar=="registrado"){

    $horasalt=$hora;
    $sql="update asistencia 
    set horast='$horasalt',tiempo_tardanza_dia=$totalmd
    where idasis=$codigo_asistencia"; 
    mysqli_query($cnn,$sql)or die("Error en control de asistencia, salida");
    echo "Asistencia de: ". $dni." registrada correctamente, en salida...!";
}

// echo "Dni: ".$dni." // ";
// echo "Fecha: ".$fecha." // ";
// echo "Dia: ".$dia." // ";
// echo "Turno: ".$turno." // ";
// echo "Estado general: ".$estado." // ";

// echo "Hora ingreso mañana: ".$horaingresom." // ";
// echo "Hora salida mañana: ".$horasalm." // ";
// echo "Estado mañana: ".$estadom." // ";
// echo "Minutos descuento mañana: ".$minutos_descum." // ";
// echo "Hora ingreso tarde: ".$horaingresot." // ";
// echo "Hora salida tarde: ".$horasalt." // ";
// echo "Estado tarde: ".$estadot." // ";
// echo "Minutos descuento tarde: ".$minutos_descut." // ";
// echo "Comentario: ".$comentario." // ";
// echo "Tiempo de trabajo: ".$tiempotrabajo." // ";
// echo "Tiempo de tardanza dia: ".$tiempotardanzadia." // ";


//FALTA VERIFICAS QUE YA SE REGISTRO EN CUALQUIER TURNO
?>