<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="lib/datatables2/jquery.dataTables.min.css">
    <link rel="stylesheet" href="lib/boostrap-css/bootstrap.min.css">
    <style>
        .btn-group .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    margin-right: 4px; 
}
    </style>
</head>
<body>
<?php date_default_timezone_set("America/Lima"); ?>
<div class="container mt-5 ">
    <div class="card shadow-lg">
        <div class="card-header  tablas-x " style="background-color: #0c0c24; color: white;">
            <h4 class="mb-0"><i class="bi bi-people-fill"></i> Lista De Salidas - <?php echo date('d-m-Y'); ?></h4>
        </div>
        <div class="card-body">
        <table class="table table-striped table-bordered table-hover" id="tsalidas" style="width:100%">
        <thead id="tabla1">
        <tr>
            <th>#</th>
            <th>Estado</th>                       
            <th>DNI</th>                    
            <th>Apellidos y Nombres</th>    
            <th>Turno</th>                  
            <th>Hora Salida</th>           
            <th>Hora Reingreso</th>        
            <th>Motivo</th>                
            <th>Comentario</th>          
            <th>Acciones</th>             
        </tr>
    </thead>
    <tbody></tbody>
        </table>
        </div>
    </div>
</div>


<div class="modal fade" id="modaleditar" tabindex="-1" aria-labelledby="modaleditarlabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header justify-content-center" style="background-color: #0c0c24; color: white;">
        <h5 class="modal-title text-center" id="modaleditarlabel">
          <i class="bi bi-pencil-square"></i> Editar Salida
        </h5>
        <button type="button" class="btn-close btn-close-white position-absolute end-0 me-3" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>

      <div class="modal-body">
        <form id="formeditar">
          <!-- ID oculto -->
          <input type="hidden" id="id_salida" name="id_salida">

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="dni" class="form-label"><i class="bi bi-file-earmark-person"></i> DNI</label>
              <input type="text" class="form-control" id="dni" name="dni" maxlength="8" required readonly>
            </div>
            <div class="col-md-6">
              <label for="fecha_salida" class="form-label"><i class="bi bi-calendar-check"></i> Fecha</label>
              <input type="date" class="form-control" id="fecha_salida" name="fecha_salida" disabled>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="hora_salida" class="form-label"><i class="bi bi-clock"></i> Hora de salida</label>
              <input type="time" class="form-control" id="hora_salida" name="hora_salida" required>
            </div>
            <div class="col-md-6">
              <label for="hora_reingreso" class="form-label"><i class="bi bi-clock-history"></i> Reingreso</label>
              <input type="time" class="form-control" id="hora_reingreso" name="hora_reingreso">
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="motivo" class="form-label"><i class="bi bi-pencil-square"></i> Motivo</label>
              <select class="form-select" id="motivo" name="motivo" required>
                <option value="" disabled>Seleccione un motivo</option>
                <option value="Trámite personal">Trámite personal</option>
                <option value="Consulta medica">Consulta médica</option>
                <option value="Emergencia familiar">Emergencia familiar</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="turno" class="form-label"><i class="bi bi-arrow-repeat"></i> Turno</label>
              <select class="form-select" id="turno" name="turno" required>
                <option value="" disabled>Seleccione un turno</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="observaciones" class="form-label"><i class="bi bi-clipboard"></i> Observaciones</label>
            <textarea class="form-control" id="observaciones" name="observaciones" rows="2"></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-success" id="ingre_correcta">
              <i class="bi bi-arrow-right-circle"></i> Ingreso Correctamente
            </button>
             <button type="button" class="btn btn-success" id="actualizar_salida">
              <i class="bi bi-save2"></i> Actualizar
            </button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-circle"></i> Cancelar
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</div>

<script src="lib/jquery-3.6.0.min.js"></script>
<script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" charset="utf8" src="lib/datatables2/jquery.dataTables.min.js"></script>
<script src="javascrip/Tablas.js"></script>

<script src="javascrip/mansalidas.js"></script>
</body>
</html>