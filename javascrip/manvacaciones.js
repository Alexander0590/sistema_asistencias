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
                // Parsear el JSON si es necesario
                if (typeof response === 'string') {
                    response = JSON.parse(response);
                }
            
                if (response.status === 'success') {
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
                        $(this).off('hidden.bs.modal');
                    });
            
                    Swal.fire({
                        icon: 'success',
                        title: '¡Registro guardadoooo!',
                        text: response.message || 'Vacaciones registradas correctamente',
                        confirmButtonText: 'Aceptar'
                    });
                } else if (response.status === 'error') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message,
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
                alert("Hubo un problema al guardar el registro");
            }
        });
    });
});

// Definir el evento de guardar UNA sola vez
$('#vguardar').off('click').on('click', function() {
    var dni = $('#vdni').val().trim();
    var dias = $('#vdias').val().trim();
    var fechaini = $('#vfecha_inicio').val().trim();
    
    if (!dias || !fechaini) {
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
        data: { dni: dni, dias: dias, fechaini: fechaini },
        success: function(response) {
            // Parsear el JSON si es necesario
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
        
            if (response.status === 'success') {
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
                    $(this).off('hidden.bs.modal');
                });
        
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro guardadoooo!',
                    text: response.message || 'Vacaciones registradas correctamente',
                    confirmButtonText: 'Aceptar'
                });
            } else if (response.status === 'error') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message,
                    confirmButtonText: 'Aceptar'
                });
            }
        },
        error: function(xhr) {
            console.error("Error:", xhr.statusText);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar el registro'
            });
        }
    });
});

// Evento para abrir el modal (solo asigna el DNI)
$(document).on('click', '.darVacaciones', function() {
    let id = $(this).data('id'); 
    $('#vdni').val(id).prop('disabled', true);
    $('#vacacionesModal').modal('show');
});

$(document).on('click', '.verificarVacaciones', function() {
    let id = $(this).data('id'); 

    $("#vistas").fadeOut(200, function () {
        $(this).load("view/reporte_vacaciones.php", function () {
            $(this).fadeIn(200, function () {
                $('#dnireva').val(id);
                setTimeout(function () {
                    $('#filtrarreva').click();
                }, 200); 
            });
        });
    });
    

});


$('#filtrarreva').off('click').on('click', function() {
   
    var fechai = $('#fechaireva').val();  
    var fechaf = $('#fechafireva').val();  
    var dnire = $('#dnireva').val();    

    // Validar si las fechas están completas
    // if (!fechai || !fechaf) {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Fechas incompletas',
    //         text: 'Debes ingresar ambas fechas',
    //         confirmButtonText: 'Aceptar'
    //     });
    //     return;
    // }

    // Convertir las fechas a objetos Date
    var fechaInicio = new Date(fechai);
    var fechaFin = new Date(fechaf);

    // Validar que la fecha de inicio no sea mayor que la fecha final
    // if (fechaInicio > fechaFin) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Fechas incorrectas',
    //         text: 'La fecha de inicio no puede ser mayor que la fecha final',
    //         confirmButtonText: 'Aceptar'
    //     });
    //     return;
    // }

 // Realizar la petición Ajax para obtener los datos filtrados
 $.ajax({
    url: 'proceso/mantenimievacacione.php?action=filtrovaca',
    type: 'get',
    dataType: 'json',
    data: { fechai: fechai, fechaf: fechaf, dnire: dnire },  
    success: function (data) {
        const tabla = $('#revacaciones').DataTable();

        // Limpiar la tabla antes de agregar los nuevos datos
        tabla.clear();

        // Agregar los datos a la tabla
        data.forEach(function (fvaca, index) {
            tabla.row.add([
                index + 1,
                fvaca.dni || 'No registrado',
                fvaca.nombres|| 'No registrado',
                fvaca.apellidos || 'No registrado',
                fvaca.nombre || 'No registrado',
                fvaca.dias,
                fvaca.fecha_inicio,
                fvaca.fecha_fin,
                fvaca.dias_restantes|| 'Sin motivo',
                fvaca.year || 'Sin comentarios'
            ]);
        });

        // Redibujar la tabla con los nuevos datos
        tabla.draw();
    },
    error: function (error) {
        console.error('Error al obtener el reporte de salidas:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'Hubo un problema al obtener los datos del reporte de salidas.',
            confirmButtonText: 'Aceptar'
        });
    }
});
  
});





