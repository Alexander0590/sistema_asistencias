<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="lib/datatables2/jquery.dataTables.min.css">
</head>
<body>
<div class="container mt-5 ">
    <div class="card shadow-lg">
        <div class="card-header  text-white tablas-x ">
            <h4 class="mb-0">Faltas de: <?php echo date("d-m-Y"); ?></h4>
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
            <h4 class="mb-0">Asistencia de: <?php echo date("d-m-Y"); ?></h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tper" style="width:100%">
                <thead id="tabla1">
                    <tr>
                        <th>Nº</th>
                        <th>DNI</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th></th>
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