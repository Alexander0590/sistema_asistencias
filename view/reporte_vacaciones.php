<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="lib/datatables2/jquery.dataTables.min.css">
    <link rel="stylesheet" href="lib/boostrap-css/bootstrap.min.css">
</head>
<body>
<div class="container mt-5">
    <!-- Formulario de filtro -->
    <div class="card shadow-lg mb-4">
        <div class="card-header text-white d-flex justify-content-center align-items-center" style="background-color: #0c0c24;">
            <h4 class="mb-0"><i class="bi bi-filter"></i> Filtro de Vacaciones</h4>
        </div>
        <div class="card-body">
            <form id="filtroserenazgo" class="row g-3">
                <div class="col-md-4">
                    <label for="dnireva" class="form-label">
                        <i class="bi bi-person-badge"></i> DNI
                    </label>
                    <input type="number" class="form-control" id="dnireva" placeholder="Ingrese DNI" min="10000000" max="99999999">
                </div>

                <div class="col-md-4">
                    <label for="fechaireva" class="form-label">
                        <i class="bi bi-calendar"></i> Fecha de Inicio
                    </label>
                    <input type="date" class="form-control" id="fechaireva" required>
                </div>

                <div class="col-md-4">
                    <label for="fechafireva" class="form-label">
                        <i class="bi bi-calendar-check"></i> Fecha de Fin
                    </label>
                    <input type="date" class="form-control" id="fechafireva" required>
                </div>

                <div class="col-12 text-center">
                    <button type="button" class="btn btn-primary" id="filtrarreva">
                        <i class="bi bi-search"></i> Filtrar
                    </button>
                    <button type="reset" class="btn btn-secondary" id="limpiavacacio">
                        <i class="bi bi-arrow-repeat"></i> Limpiar
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Tabla de resultados -->
    <div class="card shadow-lg">
        <div class="card-header text-white d-flex justify-content-center align-items-center" style="background-color: #0c0c24;">
            <h4 class="mb-0"><i class="bi bi-brightness-high"></i> Reporte de Vacaciones</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="revacaciones" style="width:100%">
                <thead id="tabla1">
                    <tr>
                        <th>Nº</th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cargo</th>
                        <th>Días</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Días restantes</th>
                        <th>Año</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Aquí se llenarán los datos dinámicamente -->
                </tbody>
            </table>
        </div>
    </div>
</div>


<script src="lib/jquery-3.6.0.min.js"></script>
<!-- jQuery -->
<script src="lib/jquery-3.6.0.min.js"></script>
<script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
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
<script src="javascrip/tablas2.js"></script>
<script src="javascrip/manvacaciones.js"></script>
</body>
</html>