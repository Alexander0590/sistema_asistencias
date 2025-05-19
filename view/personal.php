<?php
include '../conecxion/conecxion.php'; 

$sql = "SELECT nombre,idcargo FROM cargos WHERE estado = 'activo'"; 
$resultado = $cnn->query($sql);
$sql2 = "SELECT nombrem, idmodalidad FROM modalidad WHERE estado = 'activo'";

$resultado2 = $cnn->query($sql2);

if (!$resultado) {
    die("Error en la consulta: " . $cnn->error);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="lib/boostrap-css/bootstrap.min.css">
</head>
<body >
<!-- Modal de foto  -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="background-color: #060614; color: #ffffff;">
                <div class="modal-header" style="border-bottom: 1px solid #8773e7;">
                    <h5 class="modal-title" id="exampleModalLabel">Foto </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-bodyper">
                    <img  id="fotoper" src="img/2.png" alt="Imagen" class="img-fluid">
                </div>
                <div class="modal-footer" style="border-top: 1px solid #8773e7;">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="background-color: #8773e7; color: #ffffff;">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Formulario de personal -->
  <div class="container-fluid  mb-4" id="mainContainer">
    <div id="centeredFormWrapper" class="d-flex justify-content-center align-items-center mt-3">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 col-lg-8" id="formColumn">
          <div class="card shadow" id="formCard">
            <div class="card-header text-center" id="cardHeader">
              <b><i class="bi bi-person-plus"></i> REGISTRO DE PERSONAL </b>
            </div>
            <div class="card-body" id="formCardBody">
              <form class="row g-3" id="personalform">
              <input type="hidden" id="viejo_dni" name="viejo_dni">
              <input type="hidden" id="pfotoBase64" name="pfotoBase64">
                 <div class="col-md-2" >
                    <label for="nombreUsuario" class="form-label">
                    <i class="bi bi-file-earmark-binary"></i> DNI
                    </label>
                    <input type="number" class="form-control" id="pdni" placeholder="DNI"min="0" max="99999999" oninput="validarLongitud(this)"required>
                  </div>

                <div class="col-md-5" >
                  <label for="nombreyapellidos" class="form-label">
                    <i class="bi bi-person"></i> Nombres 
                  </label>
                  <input type="text" class="form-control" id="pnombre" placeholder="Nombres " required>
                </div>
                <div class="col-md-5" >
                  <label for="nombreyapellidos" class="form-label">
                    <i class="bi bi-person"></i> Apellidos
                  </label>
                  <input type="text" class="form-control" id="pape" placeholder="Apellidos" required>
                </div>
       
                  <div class="col-md-4" >
                    <label for="modalidad" class="form-label" >
                    <i class="bi bi-file-text"></i> Modalidad de Contratacion
                    </label>
                    <div class="input-group">
                      <select class="form-select" id="pmodalida" required>
                          <option value="">Seleccione Modalidad</option>
                          <?php
                          if ($resultado2->num_rows > 0) {
                              while ($fila = $resultado2->fetch_assoc()) {
                                  echo "<option value='" . $fila['nombrem'] . "'>" . $fila['nombrem'] . "</option>";
                              }
                          } else {
                              echo "<option value=''>No hay Modalidades disponibles</option>";
                          }
                          ?>
                      </select>
                      <button class="btn btn-outline-primary bg-" type="button" id="btnnuemodali" data-bs-toggle="modal" data-bs-target="#modalnuemodali" title="Agregar nueva Modalidad">
                      <i class="bi bi-plus-square-fill"></i>
                      </button>
                  </div>
                  </div>

                  <div class="col-md-5">
                  <label for="cargo" class="form-label">
                      <i class="bi bi-briefcase"></i> Cargo
                  </label>
                  <div class="input-group">
                      <select class="form-select" id="pcargo" required>
                          <option value="">Seleccione un cargo</option>
                          <?php
                          if ($resultado->num_rows > 0) {
                              while ($fila = $resultado->fetch_assoc()) {
                                  echo "<option value='" . $fila['idcargo'] . "'>" . $fila['nombre'] . "</option>";
                              }
                          } else {
                              echo "<option value=''>No hay cargos disponibles</option>";
                          }
                          ?>
                      </select>
                      <button class="btn btn-outline-primary bg-" type="button" id="btnNuevoCargo" data-bs-toggle="modal" data-bs-target="#modalNuevoCargo" title="Agregar nuevo cargo">
                      <i class="bi bi-plus-square-fill"></i>
                      </button>
                  </div>
              </div>

                <div class="col-md-3" >
                  <label for="sueldo" class="form-label" >
                  <i class="bi bi-cash"></i> Sueldo
                  </label>
                  <input type="number" class="form-control" id="psuel" placeholder="S/." required>
                </div>

                <div class="col-md-4" >
                <label for="fecha de nacimiento" class="form-label" >
                  <i class="bi bi-calendar"></i> Fecha de Nacimiento
                  </label>
                  <input type="date" class="form-control" id="pfechanaci" max="2006-02-16" required>
                </div>

                <div class="col-md-5" id="ocfoto">
                <label for="foto" class="form-label">
                  <i class="bi bi-camera"></i> Foto
                </label>
                <input type="file" class="form-control" id="pfoto" accept=".jpg, .jpeg" required>
              </div>
                <div class="col-md-3" >
                    <label for="estado" class="form-label" >
                    <i class="bi bi-record-circle"></i> Estado
                    </label>
                    <select class="form-select"  id="pestado" disabled required>
                      <option value="1">Activo</option>
                      <option value="2">Inactivo</option>
                    </select>
                  </div>

                  <div class="col-md-3"  style="display:none;" id="vaca">
                    <label for="estado" class="form-label" >
                    <i class="bi bi-record-circle"></i> Vacaciones
                    </label>
                    <select class="form-select"  id="pvaca"  required>
                      <option value="Sin solicitar">Sin solicitar</option>
                      <option value="En proceso">En proceso</option>
                      <option value="Asignado">Asignado</option>
                      <option value="Dias restantes">Dias restantes</option>
                      <option value="Finalizadas">Finalizadas</option>
                    </select>
                  </div>

                <div class="col-12 text-center" id="buttonContainer">
                  <button type="submit" class="btn btn-success" id="btreper">
                    <i class="bi bi-check-circle"></i> Registrar Personal
                  </button>
                  <button type="button" class="btn btn-warning" id="btacuper" style="display: none;">
                  <i class="bi bi-arrow-clockwise"></i>Actualizar
                  </button>

                  <button type="reset" class="btn btn-secondary" id="btnLimper">
                    <i class="bi bi-arrow-repeat"></i> Limpiar
                  </button>
                  <button type="button" id="btnfotoper" class=" btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled>
                 <i class="bi bi-eye"></i> ver foto
                  </button>
                </div>
              </form>
            </div>  
          </div>
          
        </div>
      </div>
    </div>
  </div>

  <!-- Modal para agregar nuevo cargo -->
<div class="modal fade" id="modalNuevoCargo" tabindex="-1" aria-labelledby="modalNuevoCargoLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header text-white"style="background-color: #060614; color: #ffffff;">
                <h5 class="modal-title" id="modalNuevoCargoLabel">
                    <i class="bi bi-briefcase"></i> Nuevo Cargo
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formNuevoCargo">
                    <div class="mb-3">
                        <label for="nombreCargo" class="form-label">Nombre del Cargo*</label>
                        <input type="text" class="form-control" id="nombreCargo" required>
                    </div>
                    <div class="mb-3">
                        <label for="descripcionCargo" class="form-label">Descripción</label>
                        <textarea class="form-control" id="descripcionCargo" rows="3"></textarea>
                    </div>
                    <small class="text-muted">Los campos marcados con * son obligatorios</small>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="bi bi-x-circle"></i> Cancelar
                </button>
                <button type="button" class="btn btn-primary" id="btnGuardarCargo">
                    <i class="bi bi-save"></i> Guardar
                </button>
            </div>
        </div>
    </div>
</div>


<!-- Modal para modalidad -->
<div class="modal fade" id="modalnuemodali" tabindex="-1" aria-labelledby="modalNuevaModalidadLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #060614;">
                <h5 class="modal-title" id="modalNuevaModalidadLabel">
                    <i class="bi bi-file-earmark-plus"></i> Agregar Modalidad de Contratacion
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formNuevaModalidad">
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

                    <small class="text-muted">Los campos marcados con * son obligatorios</small>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="bi bi-x-lg"></i> Cancelar
                </button>
                <button type="button" class="btn btn-primary" id="btnmodalidad">
                    <i class="bi bi-check-lg"></i> Guardar
                </button>
            </div>
        </div>
    </div>
</div>
<script src="lib/jquery-3.6.0.min.js"></script>
<script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
<script src="javascrip/cargosymodalidaman.js"></script>
  <script>
    //para habilitar el boton ver foto cuando se cargue un archivo
    document.getElementById("pfoto").addEventListener("change", function(event) {
  const file = event.target.files[0];
  const btnfoto = document.getElementById("btnfotoper");
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById("fotoper");
      preview.src = e.target.result;
      preview.style.display = "block";
      btnfoto.disabled = false;
      let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      modal.show();
    };
    reader.readAsDataURL(file);
  }else{
    btnfoto.disabled = true;
  }
});

  </script>
</body>
</html>
<?php
$cnn->close();
?>