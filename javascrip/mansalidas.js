//GUARDAR LA SALIDA DEL FORMULARIO
$(document).off('click', '#guardar_salida').on('click', '#guardar_salida', function (e) {
    e.preventDefault();

    var dni = $('#dni').val().trim();
    var fecha = $('#fecha_salida').val().trim();
    var horaSalida = $('#hora_salida').val().trim();
    var horaReingreso = $('#hora_reingreso').val().trim();
    var motivo = $('#motivo').val().trim();
    var turno = $('#sa_turno').val().trim();
    var comentario = $('#comentario').val().trim();

    if (dni === '' || fecha === '' || horaSalida === '' || horaReingreso === '' || motivo === '' || turno === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    $.ajax({
        url: 'proceso/mantesalidas.php?action=resali',
        type: 'POST',
        data: {
            dni: dni,
            fecha_salida: fecha,
            hora_salida: horaSalida,
            hora_reingreso: horaReingreso,
            motivo: motivo,
            turno: turno,
            comentario: comentario
        },
        success: function (response) {
            if (response.trim() === "ok") {
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado correctamente',
                    text: 'La salida ha sido registrada con éxito.',
                    confirmButtonText: 'Cerrar'
                }).then(() => {
                    $('#formSalida')[0].reset();
                    $('#modalSalida').modal('hide');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    text: response,
                    confirmButtonText: 'Cerrar'
                });
            }
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'No se pudo conectar con el servidor.',
                confirmButtonText: 'Cerrar'
            });
        }
    });
});
//TRAER LOS DATOS PARA LA EDICION
$(document).on('click', '.saleditar', function () {
    const id = $(this).data('id');
    $.ajax({
      url: 'proceso/mantesalidas.php?action=readone',
      method: 'GET',
      data: { id_salida: id },
      dataType: 'json',
      success: function (data) {
        $('#id_salida').val(data.id_sali);
        $('#dni').val(data.dni);
        $('#fecha_salida').val(data.fecha_salida);
        $('#hora_salida').val(data.hora_salida);
        $('#hora_reingreso').val(data.hora_reingreso);
        $('#motivo').val(data.motivo);
        $('#turno').val(data.turno);
        $('#observaciones').val(data.comentario);
        $('#modaleditar').modal('show');
     }
    });
  });
//ACTUALIZAR LOS DATOS
$(document).ready(function () {
    // Asegurarse de no volver a registrar el handler varias veces
    if (!window.actualizarSalidaHandler) {
        window.actualizarSalidaHandler = true;

        $(document).on('click', '#actualizar_salida', function (e) {
            e.preventDefault();

            var id = $('#id_salida').val().trim();
            var dni = $('#dni').val().trim();
            var fecha = $('#fecha_salida').val().trim();
            var horaSalida = $('#hora_salida').val().trim();
            var horaReingreso = $('#hora_reingreso').val().trim();
            var motivo = $('#motivo').val().trim();
            var turno = $('#turno').val().trim();
            var comentario = $('#observaciones').val().trim();

            if (
                dni === '' ||
                fecha === '' ||
                horaSalida === '' ||
                horaReingreso === '' ||
                motivo === '' ||
                turno === ''
            ) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Por favor, completa todos los campos obligatorios.',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            $.ajax({
                url: 'proceso/mantesalidas.php?action=updatesali',
                type: 'POST',
                data: {
                    id: id,
                    dni: dni,
                    fecha_salida: fecha,
                    hora_salida: horaSalida,
                    hora_reingreso: horaReingreso,
                    motivo: motivo,
                    turno: turno,
                    comentario: comentario
                },
                success: function (response) {
                    if (response.trim() === "ok") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Actualizado correctamente',
                            text: 'La salida ha sido actualizada con éxito.',
                            confirmButtonText: 'Cerrar'
                        }).then(() => {
                            $('#formeditar')[0].reset();
                            $('#modaleditar').modal('hide');

                            // Recargar la vista con efecto, sin duplicar eventos
                            $("#vistas").fadeOut(200, function () {
                                $(this).load("view/lista_salidas.php", function () {
                                    $(this).fadeIn(200);

                                    // Reinicializar DataTable correctamente
                                    if ($.fn.DataTable.isDataTable('#tsalidas')) {
                                        $('#tsalidas').DataTable().clear().destroy();
                                    }

                                    $('#tsalidas').DataTable({
                                        destroy: true,

                                    });
                                });
                            });
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al actualizar',
                            text: response,
                            confirmButtonText: 'Cerrar'
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error del servidor',
                        text: 'No se pudo conectar con el servidor.',
                        confirmButtonText: 'Cerrar'
                    });
                }
            });
        });
    }
});
//filtros del reporte de salidas
$(document).on('click', '#filtrarsalida', function (e) {
    e.preventDefault();

    var fechai = $('#fechain_salida').val();  
    var fechaf = $('#fechafi_salida').val();  
    var dnire = $('#dnisalida').val();    

    // Validar si las fechas están completas
    if (!dnire) {
        if (!fechai || !fechaf) {
            Swal.fire({
                icon: 'warning',
                title: 'Fechas incompletas',
                text: 'Debes ingresar ambas fechas',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    }
    

    // Convertir las fechas a objetos Date
    var fechaInicio = new Date(fechai);
    var fechaFin = new Date(fechaf);

    // Validar que la fecha de inicio no sea mayor que la fecha final
    if (fechaInicio > fechaFin) {
        Swal.fire({
            icon: 'error',
            title: 'Fechas incorrectas',
            text: 'La fecha de inicio no puede ser mayor que la fecha final',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    

    // Realizar la petición Ajax para obtener los datos filtrados
    $.ajax({
        url: 'proceso/mantesalidas.php?action=filtroresali',
        type: 'get',
        dataType: 'json',
        data: { fechai: fechai, fechaf: fechaf, dnire: dnire },  
        success: function (data) {
            const tabla = $('#treportesalida').DataTable();

            // Limpiar la tabla antes de agregar los nuevos datos
            tabla.clear();

            // Agregar los datos a la tabla
            data.forEach(function (fsalida, index) {
                // Formatear hora_salida con AM/PM
                let horaSalida = fsalida.hora_salida || 'No registrado';
                if (horaSalida !== 'No registrado') {
                    const hora = parseInt(horaSalida.split(':')[0]);
                    const ampm = hora < 12 ? 'AM' : 'PM';
                    horaSalida = `${horaSalida} ${ampm}`;
                }

                // Formatear hora_reingreso con AM/PM
                let horaReingreso = fsalida.hora_reingreso || 'No registrado';
                if (horaReingreso !== 'No registrado') {
                    const hora = parseInt(horaReingreso.split(':')[0]);
                    const ampm = hora < 12 ? 'AM' : 'PM';
                    horaReingreso = `${horaReingreso} ${ampm}`;
                }

                tabla.row.add([
                    index + 1,
                    fsalida.dni || 'No registrado',
                    fsalida.fecha_salida || 'No registrado',
                    fsalida.dia || 'No registrado',
                    fsalida.turno || 'No registrado',
                    horaSalida,
                    horaReingreso,
                    fsalida.motivo || 'Sin motivo',
                    fsalida.comentario || 'Sin comentarios'
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
