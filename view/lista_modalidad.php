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
            <h4 class="mb-0"><i class="bi bi-person-check"></i> Lista De Modalidad</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tmodalidad" style="width:100%">
                <thead id="tabla1">
                    <tr>
                        <th>Nº</th>
                        <th>Nomre</th>
                        <th>Descripción</th>
                        <th>Fecha de Creacion</th>
                        <th>Estado</th>
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
<script src="javascrip/tablas2.js"></script>
<script src="javascrip/cargosymodalidaman.js"></script>
</body>
</html>