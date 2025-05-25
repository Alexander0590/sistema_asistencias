<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="lib/datatables2/jquery.dataTables.min.css">
</head>
<body>
<?php  date_default_timezone_set("America/Lima"); ?>
<div class="container mt-5">
    <div class="card-header text-white tablas-x" style="padding:10px;">
        <h4 class="mb-0">Registro de Asistencias: 
            <?php 
                if(isset($_GET['fd'])){
                    $fd=$_GET['fd'];
                }else{
                    $fd=date('Y-m-d');
                }
                
            
            ?>
            <input type="date" name="txtfa" id="txtfa" value="<?php echo $fd; ?>" 
                style="border: none; background-color: #f8f9fa; color: #000; padding: 5px 10px; border-radius: 5px; font-size: 18px;">
        </h4>
    </div>
</div>

<div class="container mt-5 ">
    <div class="card shadow-lg">
        <div class="card-header  text-white tablas-x ">
            <h4 class="mb-0">Faltas</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tper" style="width:100%">
                <thead id="tabla1">
                    <tr>
                        <th>Nº</th>
                        <th>DNI</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="cuerpo_tabla_fd">
                    
                </tbody>
            </table>
        </div>
    </div>

</div>
<?php  date_default_timezone_set("America/Lima"); ?>
<input type="hidden" id="tfecha" value="<?php echo date("Y-m-d");?>">
<div class="container mt-5 ">
    <div class="card shadow-lg">
        <div class="card-header  text-white tablas-x ">
            <h4 class="mb-0">Asistencias</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tper" style="width:100%">
                <thead id="tabla1">
                    <tr>
                        <th>Nº</th>
                        <th>DNI</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="cuerpo_tabla_ad">
                    
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="lib/jquery-3.6.0.min.js"></script>
<script type="text/javascript" charset="utf8" src="lib/datatables2/jquery.dataTables.min.js"></script>
<script src="javascrip/asistencia_diaria.js"></script>
</body>
</html>