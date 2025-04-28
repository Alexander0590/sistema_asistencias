<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="lib/datatables2/jquery.dataTables.min.css">
    <link rel="stylesheet" href="lib/boostrap-iconos/bootstrap-icons.min.css">
</head>
<body>
<div class="container mt-5 ">
    <div class="card shadow-lg">
        <div class="card-header  text-white tablas-x ">
            <h4 class="mb-0"><i class="bi bi-briefcase"></i> Lista De Cargos</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-bordered table-hover" id="tcargos" style="width:100%">
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

  <!-- Modal para editar cargo -->
  <div class="modal fade" id="modalNuevoCargo2" tabindex="-1" aria-labelledby="modalNuevoCargoLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header text-white"style="background-color: #060614; color: #ffffff;">
                <h5 class="modal-title" id="modalNuevoCargoLabel">
                <i class="bi bi-pencil"></i> Editar Cargo
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formNuevoCargo">
                <input type="hidden" id="idcargo">
                    <div class="mb-3">
                        <label for="nombreCargo" class="form-label">Nombre del Cargo*</label>
                        <input type="text" class="form-control" id="nombreCargo" required>
                    </div>
                    <div class="mb-3">
                        <label for="descripcionCargo" class="form-label">Descripción</label>
                        <textarea class="form-control" id="descripcionCargo" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                    <label for="estadocargo" class="form-label">Estado*</label>
                    <select class="form-select" id="estadocargo">
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>
                    <small class="text-muted">Los campos marcados con * son obligatorios</small>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="bi bi-x-circle"></i> Cancelar
                </button>
                <button type="button" class="btn btn-success" id="btnactualicam">
                    <i class="bi bi-save"></i> Actualizar Cambios
                </button>
            </div>
        </div>
    </div>
</div>


<script src="lib/jquery-3.6.0.min.js"></script>
<script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" charset="utf8" src="lib/datatables2/jquery.dataTables.min.js"></script>
<script src="javascrip/tablas2.js"></script>
<script src="javascrip/cargosymodalidaman.js"></script>
</body>
</html>