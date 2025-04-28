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
            <h4 class="mb-0"><i class="bi bi-person-check"></i> Lista De Modalidad de Contratacion</h4>
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
<!-- Modal para  editar modalidad -->
<div class="modal fade" id="modalnuemodali2" tabindex="-1" aria-labelledby="modalNuevaModalidadLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #060614;">
                <h5 class="modal-title" id="modalNuevaModalidadLabel">
                <i class="bi bi-pencil-square"></i> Editar Modalidad de Contratacion
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formNuevaModalidad">
                    <input type="hidden" id="idmodali">
                    <div class="mb-3">
                        <label for="nombreModalidad" class="form-label">Nombre de la Modalidad*</label>
                        <input type="text" class="form-control" id="nombreModalidad" 
                               placeholder="Ej: Contrato CAS, Nombramiento, etc." required>
                    </div>
                    <div class="mb-3">
                        <label for="descripcionModalidad" class="form-label">Descripción</label>
                        <textarea class="form-control" id="descripcionModalidad" rows="3"
                                  placeholder="Detalles adicionales sobre esta modalidad"></textarea>
                    </div>

                    <div class="mb-3">
                    <label for="estadoModalidad" class="form-label">Estado</label>
                    <select class="form-select" id="estadomodali">
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

                    <small class="text-muted">Los campos marcados con * son obligatorios</small>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="bi bi-x-lg"></i> Cancelar
                </button>
                <button type="button" class="btn btn-success" id="btnactumodalidad">
                    <i class="bi bi-check-lg"></i> Actualizar Cambios
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