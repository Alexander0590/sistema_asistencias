<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salidas</title>
</head>
<body>
<!-- Modal para registrar salida -->
<?php date_default_timezone_set("America/Lima"); ?>
<div class="modal fade" id="modalSalida" tabindex="-1" aria-labelledby="modalSalidaLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
    
      <div class="modal-header justify-content-center" style="background-color: #0c0c24; color: white;">
        <h5 class="modal-title text-center" id="modalSalidaLabel">
          <i class="bi bi-person-check"></i> Registrar Salida
        </h5>
        <button type="button" class="btn-close btn-close-white position-absolute end-0 me-3" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      
      <div class="modal-body">
        <form id="formSalida">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="dni" class="form-label"><i class="bi bi-file-earmark-person"></i> DNI</label>
              <input type="text" class="form-control" id="dni" name="dni" maxlength="8" required>
            </div>
            <div class="col-md-6">
              <label for="fecha_salida" class="form-label"><i class="bi bi-calendar-check"></i> Fecha</label>
              <input type="date" class="form-control" id="fecha_salida" name="fecha_salida" value="<?php echo date('Y-m-d'); ?>" >
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6 mb-2">
              <label for="hora_salida" class="form-label"><i class="bi bi-clock"></i> Hora de salida</label>
              <input type="time" class="form-control" id="hora_salida" name="hora_salida" required>
            </div>
            <div class="col-md-6" id="alterna">
              <label for="motivo" class="form-label"><i class="bi bi-check-square"></i> Tiene Reingreso</label>
              <select class="form-select" id="alternativa" name="alternativa" required>
                <option value="" selected disabled>Seleccione</option>
                <option value="si">Si</option>
                <option value="no">No</option>
              </select>
            </div>
            <div class="col-md-6" style="display: none;" id="reingre">
              <label for="hora_reingreso" class="form-label"><i class="bi bi-clock-history"></i> Reingreso</label>
              <input type="time" class="form-control" id="hora_reingreso" name="hora_reingreso">
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="motivo" class="form-label"><i class="bi bi-pencil-square"></i> Motivo</label>
              <select class="form-select" id="motivo" name="motivo" required>
                <option value="" selected disabled>Seleccione un motivo</option>
                <option value="Trámite personal">Trámite personal</option>
                <option value="Consulta medica">Consulta médica</option>
                <option value="Emergencia familiar">Emergencia familiar</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="sa_turno" class="form-label"><i class="bi bi-arrow-repeat"></i> Turno</label>
              <select class="form-select" id="sa_turno" name="turno" required>
                <option value="" selected disabled>Seleccione un turno</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
              </select>
            </div>
          </div>
          
          
          <div class="mb-3">
            <label for="comentario" class="form-label"><i class="bi bi-clipboard"></i> Observaciones</label>
            <textarea class="form-control" id="comentario" name="observaciones" rows="2"></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="guardar_salida">
              <i class="bi bi-save"></i> Guardar
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

<script src="javascrip/mansalidas.js"></script>
</body>
</html>
