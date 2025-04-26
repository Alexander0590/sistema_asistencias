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
<div class="container mt-5 ">
    <div class="card shadow-lg">
        <div class="card-header  text-white tablas-x " style="background-color: #0c0c24;">
            <h4 class="mb-0"><i class="bi bi-person-lines-fill"></i> Solicitud de Vacaciones</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tper2" style="width:100%">
                <thead id="tabla1">
                    <tr>
                        <th>Nº</th>
                        <th>Foto</th>
                        <th>DNI</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Cargo</th>
                        <th>Estado de Vacaciones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
</div>


<!-- Modal -->
<div class="modal fade" id="vacacionesModal" tabindex="-1" aria-labelledby="vacacionesModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form method="POST" action="procesar_vacaciones.php">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #0c0c24; color:white">
          <h5 class="modal-title" id="vacacionesModalLabel">
            <i class="bi bi-calendar-check-fill me-2"></i>Registrar Vacaciones
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">

          <div class="mb-3">
            <label for="dni" class="form-label"><i class="bi bi-person-badge-fill me-2"></i>DNI</label>
            <input type="text" class="form-control" name="dni" id="vdni" maxlength="8" required>
          </div>

          <div class="mb-3">
            <label for="dias" class="form-label"><i class="bi bi-hourglass-split me-2"></i>Días Tomados</label>
            <input type="number" class="form-control" name="dias" id="vdias" min="1" required>
          </div>

          <div class="mb-3">
            <label for="fecha_inicio" class="form-label"><i class="bi bi-calendar-event-fill me-2"></i>Fecha de Inicio</label>
            <input type="date" class="form-control" name="fecha_inicio" id="vfecha_inicio" required>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" id="vguardar">
            <i class="bi bi-save2-fill me-1"></i>Guardar
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            <i class="bi bi-x-circle-fill me-1"></i>Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

<script src="lib/jquery-3.6.0.min.js"></script>
<script type="text/javascript" charset="utf8" src="lib/datatables2/jquery.dataTables.min.js"></script>
<script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
<script src="javascrip/Tablas.js"></script>
<script src="javascrip/manvacaciones.js"></script>
</body>
</html>