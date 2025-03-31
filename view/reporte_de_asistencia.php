<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- DataTables CSS -->
    <link rel="stylesheet" type="text/css" href="lib/datatables2/jquery.dataTables.min.css">
</head>
<body>
<div class="container mt-5">
   <!-- Formulario de filtro -->
<div class="card shadow-lg mb-4">
    <div class="card-header text-white d-flex justify-content-center align-items-center">
        <h4 class="mb-0"><i class="bi bi-filter"></i> Filtro de Asistencia</h4>
    </div>
    <div class="card-body">
        <form id="filtroForm" class="row g-3">

            <div class="col-md-4">
                <label for="dni" class="form-label">
                    <i class="bi bi-person-badge"></i> DNI
                </label>
                <input type="number" class="form-control" id="dnire" placeholder="Ingrese DNI" min="10000000" max="99999999">
            </div>

            <div class="col-md-4">
                <label for="fechain" class="form-label">
                    <i class="bi bi-calendar"></i> Fecha de Inicio
                </label>
                <input type="date" class="form-control" id="fechain" required>
            </div>

            <div class="col-md-4">
                <label for="fechafi" class="form-label">
                    <i class="bi bi-calendar-check"></i> Fecha de Fin
                </label>
                <input type="date" class="form-control" id="fechafi" required>
            </div>

            <div class="col-12 text-center">
                <button type="submit" class="btn btn-primary" id="filtraras">
                    <i class="bi bi-search"></i> Filtrar
                </button>
                <button type="reset" class="btn btn-secondary" id="limpiarfil">
                    <i class="bi bi-arrow-repeat"></i> Limpiar
                </button>
            </div>
        </form>
    </div>
</div>



    <!-- Tabla de asistencia -->
    <div class="card shadow-lg">
        <div class="card-header text-white d-flex justify-content-center align-items-center ">
            <h4 class="mb-0"><i class="bi bi-file-earmark-person"></i> Reporte de asistencia</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tasis" style="width:100%">
                <thead id="tabla1">
                    <tr>
                        <th>Nº</th>
                        <th>Dni</th>
                        <th>Fecha</th>
                        <th>Dia</th>
                        <th>Hora de entrada Turno-Mañana</th>
                        <th>Hora de salida Turno-Mañana</th>
                        <th>Estado de Mañana</th>
                        <th>Hora de entrada Turno-Tarde</th>
                        <th>Hora de salida Turno-Tarde</th>
                        <th>Estado de Tarde</th>
                        <th>Minutos de descuento</th>
                        <th>Comentario</th>
                    </tr>
                </thead>
                <tbody>
                  
                </tbody>
            </table>
        </div>
    </div>
</div>

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
<script src="javascrip/asistenciamante.js"></script>
</body>
</html>