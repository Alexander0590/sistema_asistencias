<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Minutos Recuperadas</title>

    <!-- DataTables CSS -->
    <link rel="stylesheet" type="text/css" href="lib/datatables2/jquery.dataTables.min.css">
</head>
<body>

<div class="container mt-5">
    <!-- Tabla de salidas -->
    <div class="card shadow-lg mx-auto" style="max-width: 90%;">
        <div class="card-header text-white  d-flex justify-content-center align-items-center">
            <h4 class="mb-0"><i class="bi bi-box-arrow-up-right"></i> Reporte de Minutos Recuperados</h4>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover mx-auto" id="tminrecu" style="width: 100%;">
                    <thead id="tabla1">
                        <tr class="text-center">
                            <th>#</th>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Fecha</th>
                            <th>Minutos Recuperados</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <!-- Filas de datos irán aquí -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- jQuery -->
<script src="lib/jquery-3.6.0.min.js"></script>
<!-- DataTables JS -->
<script src="lib/datatables2/jquery.dataTables.min.js"></script>
<!-- DataTables Buttons JS -->
<script src="lib/botones-excel-pdf/dataTables.buttons.min.js"></script>
<script src="lib/botones-excel-pdf/jszip/jszip.min.js"></script>
<script src="lib/botones-excel-pdf/pdfmake/pdfmake.min.js"></script>
<script src="lib/botones-excel-pdf/pdfmake/vfs_fonts.js"></script>
<script src="lib/botones-excel-pdf/buttons.html5.min.js"></script>
<script src="javascrip/tablas2.js"></script>
<!-- Tu script JS personalizado para manejar los filtros y DataTables -->
<script src="javascrip/mansalidas.js"></script>
</body>
</html>
