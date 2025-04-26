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
            <h4 class="mb-0"><i class="bi bi-person-lines-fill"></i> Lista De Personal</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tvacaciones" style="width:100%">
                <thead id="tabla1">
                    <tr>
                        <th>Nº</th>
                        <th>Estado</th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cargo</th>
                        <th>Dias</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Dias restantes</th>
                        <th>Año</th>
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
<!-- jQuery -->
<script src="lib/jquery-3.6.0.min.js"></script>
<!-- DataTables JS -->
<script type="text/javascript" charset="utf8" src="lib/datatables2/jquery.dataTables.min.js"></script>
<!-- DataTables Buttons JS -->
<script type="text/javascript" charset="utf8" src="lib/botones-excel-pdf/dataTables.buttons.min.js"></script>
<!-- JSZip (requerido para Excel) -->
<script type="text/javascript" charset="utf8" src="lib/botones-excel-pdf/jszip/jszip.min.js"></script>
<!-- pdfmake (requerido para PDF) -->
<script type="text/javascript" charset="utf8" src="lib/botones-excel-pdf/pdfmake/pdfmake.min.js"></script>
<script type="text/javascript" charset="utf8" src="lib/botones-excel-pdf/pdfmake/vfs_fonts.js"></script>
<!-- DataTables Buttons HTML5 JS -->
<script type="text/javascript" charset="utf8" src="lib/botones-excel-pdf/buttons.html5.min.js"></script>
<script src="javascrip/Tablas.js"></script>
</body>
</html>