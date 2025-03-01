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
        <div class="card-header  text-white tablas-x">
            <h4 class="mb-0"><i class="bi bi-people-fill"></i> Lista De Asistencia</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tasis" style="width:100%">
                <thead id="tabla1">
                    <tr>
                        <th>Nº</th>
                        <th>Dni</th>
                        <th>Fecha</th>
                        <th>Dia</th>
                        <th>Hora de entrada Turno-Mañana </th>
                        <th>Hora de salida Turno-Mañana</th>
                        <th>Estado de Mañana</th>
                        <th>Hora de entrada Turno-Tarde</th>
                        <th>Hora de salida Turno-Tarde</th>
                        <th>Estado de Tarde</th>
                        <th>Minutos de descuento</th>
                        <th>Comentario</th>
                        <th>Acciones</th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="lib/jquery-3.6.0.min.js"></script>
<script type="text/javascript" charset="utf8" src="lib/datatables2/jquery.dataTables.min.js"></script>
<script src="javascrip/Tablas.js"></script>
</body>
</html>