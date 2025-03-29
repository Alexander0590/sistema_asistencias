<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="lib/datatables2/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="lib/boostrap-css/bootstrap.min.css">
    <style>
        .card-seguridad {
            background: #007bff;
            color: white;
            text-align: center;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }
        .card-seguridad i {
            font-size: 40px;
        }
    </style>
</head>
<body>

<div class="container mt-4">
    <div class="card-seguridad text-center p-2 d-flex align-items-center justify-content-center" 
        style="width: 100%; max-width: 400px; height: 60px; background-color: #f8f9fa; 
               border: 2px solid #0c0c24; border-radius: 10px; 
               box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); margin: auto;">
        <i class="bi bi-shield-lock-fill me-2" style="font-size: 24px; color: #0c0c24;"></i>
        <h5 class="mb-0" style="color: black; font-weight: bold;">Seguridad Ciudadana</h5>
    </div>
</div>
<?php  date_default_timezone_set("America/Lima"); ?>
<!-- faltas de personal serenazgo -->
<div class="container mt-3">
    <div class="card shadow-lg">
        <div class="card-header  text-white tablas-x" style="background-color: #0c0c24;">
            <h4 class="mb-0">Faltas de: <?php echo date("d-m-Y"); ?> </h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tper_faltas" style="width:100%">
                <thead class="text-white" style="background-color: #0c0c24;">
                    <tr>
                        <th>Nº</th>
                        <th>DNI</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tablaensere"></tbody>
            </table>
        </div>
    </div>
</div>


<div class="container mt-3">
    <div class="card shadow-lg">
        <div class="card-header text-white tablas-x" style="background-color: #0c0c24;">
            <h4 class="mb-0">Asistencia registradas de: <?php echo date("d-m-Y"); ?> </h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tperasissegu" style="width:100%">
                <thead class="text-white" style="background-color: #0c0c24;">
                    <tr>
                        <th>Nº</th>
                        <th>DNI</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                     
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody ></tbody>
            </table>
        </div>
    </div>
</div>


<!-- seguridad sabado y domingo -->
<div class="container mt-3">
    <div class="card shadow-lg">
        <div class="card-header text-white tablas-x" style="background-color: #0c0c24;">
            <h4 class="mb-0">Sabado y Domingo</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tper_sn_t2" style="width:100%">
                <thead class="text-white" style="background-color: #0c0c24;">
                    <tr>
                        <th>Nº</th>
                        <th>DNI</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Día</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tablasasegu"></tbody>
            </table>
        </div>
    </div>
</div>

<!-- TODOS LOS MODALS -->


<!-- Modal1 -->
<div class="modal fade" id="registroModal" tabindex="-1" aria-labelledby="registroModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header text-white" style="background-color: #0c0c24;">
        <h5 class="modal-title" id="registroModalLabel">Registrar Falta</h5>
        <button type="button" class="btn-close btn-close-white " data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="registroForm">
          <input type="hidden" id="dni_input1">
          <div class="mb-3">
            <label for="turno" class="form-label">Turno</label>
            <select class="form-control" id="turno">
            <option value="">Seleccione</option>
              <option value="mañana">Mañana</option>
              <option value="tarde">Tarde</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="justificar" class="form-label">Justificar</label>
            <select class="form-control" id="justificar">
            <option value="">Seleccione</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="comentario" class="form-label">Comentario</label>
            <textarea class="form-control" id="comentario" rows="3"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="guardarRegistro">Guardar</button>
      </div>
    </div>
  </div>
</div>



<!-- Modal de Registro de Salida -->
<div class="modal fade" id="registroSalidaModal" tabindex="-1" aria-labelledby="registroSalidaModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header text-white" style="background-color: #0c0c24;">
        <h5 class="modal-title" id="registroSalidaModalLabel">Justificar Salida</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="registroSalidaForm">
          <input type="hidden" id="dni_input_salida">
          <input type="hidden" id="fecha_input_salida">
          
          <div class="mb-3">
            <label for="hora_salida" class="form-label">Hora de Salida</label>
            <input type="time" class="form-control" id="hora_salida">
          </div>

          <div class="mb-3">
            <label for="justificar" class="form-label">Justificar</label>
            <select class="form-control" id="justificar_salida">
            <option value="">Seleccione</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="comentario_salida" class="form-label">Comentario</label>
            <textarea class="form-control" id="comentario_salida" rows="3"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="guardarSalida">Guardar</button>
      </div>
    </div>
  </div>
</div>
<script src="lib/jquery-3.6.0.min.js"></script>
<script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" charset="utf8" src="lib/datatables2/jquery.dataTables.min.js"></script>
<script src="javascrip/asistencia_seguridad.js"></script>

</body>
</html>
