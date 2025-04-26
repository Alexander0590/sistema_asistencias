$(document).on('click', '.vasolicitar', function () {
    let id = $(this).data('id'); 
    $('#vdni').val(id);
    $('#vdni').prop('disabled', true);
    $('#vacacionesModal').modal('show');
    $('#vguardar').off('click').on('click', function() {
        var dni = $('#vdni').val().trim();
        var dias = $('#vdias').val().trim();
        var fechaini = $('#vfecha_inicio').val().trim();
        if (!dias||!fechaini) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Todos los campos son obligatorios.',
                confirmButtonText: 'OK'
            });
            return;
        }

        $.ajax({
            url: 'proceso/mantenimievacacione.php?action=createv',
            type: 'POST', 
            data: {
                dni: dni,
                dias:dias,
                fechaini:fechaini
            },
            success: function(response) {
                $('#vacacionesModal').modal('hide');

                // Esperar a que el modal termine de ocultarse antes de cargar el contenido
                $('#vacacionesModal').on('hidden.bs.modal', function () {
                    $("#vistas").hide().load("view/lis_vacaciones.php", function (response, status, xhr) {
                        if (status == "success") {
                            $(this).fadeIn(200);
                        } else {
                            console.error("Error al cargar el contenido:", xhr.status, xhr.statusText);
                            $(this).html('<p class="text-danger">Error al cargar las vacaciones. Inténtalo de nuevo.</p>').fadeIn(200);
                        }
                    });
                
                    // Eliminar el handler para que no se dispare múltiples veces si se vuelve a abrir el modal
                    $(this).off('hidden.bs.modal');
                });

            Swal.fire({
                    icon: 'success',
                    title: '¡Registro guardado!',
                    text: '"Vacaciones registradas correctamente"',
                    confirmButtonText: 'Aceptar'
            });
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
                alert("Hubo un problema al guardar el registro");
            }
        });
    });
});