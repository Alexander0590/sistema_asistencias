<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="lib/boostrap-css/bootstrap.min.css">
</head>
<body>
    <!-- Modal registrar serenazgo manual -->
<div class="modal fade" id="regisserengo" tabindex="-1" aria-labelledby="registroModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header text-white" style="background-color: #0c0c24;">
        <h5 class="modal-title" id="registroModalLabel"><i class="bi bi-calendar-check"></i> Registrar Asistencia</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="registroFormseguri">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="dni_input3" class="form-label"><i class="bi bi-credit-card-2-front"></i> DNI</label>
              <input type="text" class="form-control" id="dni_input3" maxlength="8" placeholder="Ingrese DNI">
            </div>
            <div class="row">
            <div class="col-md-6 mb-3">
              <label for="dni_input3" class="form-label"><i class="bi bi-calendar-event"></i> Fecha</label>
              <input type="date" class="form-control" id="fecha_input3" >
            </div>
            <div class="col-md-6 mb-3">
              <label for="turnodomingo" class="form-label"><i class="bi bi-clock"></i> Turno</label>
              <select class="form-control" id="turnodomingo">
                <option value="">Seleccione</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="hora_ingreso" class="form-label"><i class="bi bi-alarm"></i> Hora de Ingreso</label>
              <input type="time" class="form-control" id="hora_ingreso">
            </div>
            <div class="col-md-6 mb-3">
              <label for="estadoingreso" class="form-label"><i class="bi bi-person-check"></i> Estado</label>
              <select class="form-control" id="estadoingreso">
                <option value="">Seleccione</option>
                <option value="Puntual">Puntual</option>
                <option value="Tardanza">Tardanza</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3" style="display: none;">
              <label for="justiingreso" class="form-label"><i class="bi bi-file-earmark-text"></i> Justificación</label>
              <select class="form-control" id="justiingreso">
                <option value="">Seleccione</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label for="horas" class="form-label"><i class="bi bi-door-open"></i> Hora de Salida</label>
              <input type="time" class="form-control" id="horas">
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="estado_salida" class="form-label"><i class="bi bi-arrow-right-circle"></i> Estado de Salida</label>
              <select class="form-control" id="estado_salida">
                <option value="">Seleccione</option>
                <option value="Salida Normal">Salida Normal</option>
                <option value="Salida Anticipada">Salida Anticipada</option>
              </select>
            </div>
            <div class="col-md-6 mb-3" style="display: none;">
              <label for="justisalida" class="form-label"><i class="bi bi-file-earmark-text"></i> Justificación de Salida</label>
              <select class="form-control" id="justisalida">
                <option value="">Seleccione</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="comentariore" class="form-label"><i class="bi bi-chat-left-text"></i> Comentario</label>
            <textarea class="form-control" id="comentariore" rows="2"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-x-circle"></i> Cerrar</button>
        <button type="button" class="btn btn-primary" id="guardarregiseguridad"><i class="bi bi-save"></i> Guardar</button>
      </div>
    </div>
  </div>
</div>
<script>
      $("#estadoingreso").change(function() {
            if ($(this).val() === "Tardanza") { 
                $("#justiingreso").closest(".mb-3").show();
            } else {
                $("#justiingreso").closest(".mb-3").hide();
            }
        });
    
        $("#estado_salida").change(function() {
            if ($(this).val() === "Salida Anticipada") {
                $("#justisalida").closest(".mb-3").show();
            } else {
                $("#justisalida").closest(".mb-3").hide();
            }
        });

        $('#guardarregiseguridad').off('click').on('click', function() {
    var dni = $('#dni_input3').val().trim();
    var fecha3 = $('#fecha_input3').length ? $('#fecha_input3').val().trim() : '';
    var turno = $('#turnodomingo').val().trim();
    var horai = $('#hora_ingreso').val();
    var horas = $('#horas').val();
    var estadoing = $('#estadoingreso').val();
    var justifiingreso = $('#justiingreso').val();
    var estadosalida = $('#estado_salida').val();
    var justisalida = $('#justisalida').val();
    var comentario = $('#comentariore').val().trim();

   // Validaciones previas
if (!dni) {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe ingresar el DNI.'
    });
    return;
}

if (!fecha3) {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe seleccionar una fecha.'
    });
    return;
}

if (!turno) {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe seleccionar un turno.'
    });
    return;
}

if (!horai || horai === "00:00:00") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe ingresar una hora de ingreso válida.'
    });
    return;
}

if (!horas) {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe ingresar una hora de salida.'
    });
    return;
}

if (!estadoing) {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe seleccionar un estado de ingreso.'
    });
    return;
}

if (!estadosalida) {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe seleccionar un estado de salida.'
    });
    return;
}

// Validar justificación si es "Tardanza"
if (estadoing === "Tardanza" && justifiingreso.trim() === "") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe ingresar una justificación para la tardanza.'
    });
    return;
}

// Validaciones para hora de salida y estado
if (estadosalida === "Falto" && horas !== "00:00:00") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'La hora de salida debe ser 00:00:00 si el estado es "Falto".'
    });
    return;
}

if ((estadosalida === "Salida Normal" || estadosalida === "Salida Anticipada") && horas === "00:00:00") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'La hora de salida no puede ser 00:00:00 si el estado es "' + estadosalida + '".'
    });
    return;
}

// Validar justificación si es "Salida Anticipada"
if (estadosalida === "Salida Anticipada" && justisalida.trim() === "") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe ingresar una justificación para la salida anticipada.'
    });
    return;
}
  // Validar que la hora de salida no sea menor que la de ingreso (salvo si el estado es "Falto")
             const hi = new Date(`1970-01-01T${horai}`);
                const hs = new Date(`1970-01-01T${horas}`);
                if (hs <= hi && estadosalida !== "Falto") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Horas incorrectas',
                        text: 'La hora de salida debe ser mayor a la de ingreso.',
                        confirmButtonText: 'Aceptar'
                    });
                    return;
        }


    $.ajax({
        url: 'proceso/mantesernazgo.php?action=regisregidomingo',
        type: 'POST', 
        data: {
            dni: dni,
            fecha3:fecha3,
            horai:horai,
            horas:horas,
            estadoing:estadoing,
            justifiingreso:justifiingreso,
            estadosalida:estadosalida,
            justisalida:justisalida,
            turno: turno,
            comentario: comentario
        },
        success: function(response) {
          $('#registroFormseguri')[0].reset();
            Swal.fire({
                icon: 'success',
                title: '¡Registro guardado!',
                text: 'El registro se ha guardado correctamente.',
                confirmButtonText: 'Aceptar'
            });
           
        },
        error: function(xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: xhr.responseText || 'Ocurrió un error inesperado.',
                    confirmButtonText: 'Aceptar'
                  }).then(() => {
                $('fecha_input3').val('');
                });
    }
    });
});


</script>
<script src="lib/jquery-3.6.0.min.js"></script>
<script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
</body>
</html>