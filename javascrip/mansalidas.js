$("#alternativa").on("change", function() {
let al=$(this).val();

if(al==="si"){


$('#reingre').show();

}else{
   $('#reingre').hide(); 
}

});

  $('#mostrarCampos').on('change', function () {
    if ($(this).is(':checked')) {
      $('#camposAdicionales').css('display', 'flex');
    } else {
      $('#camposAdicionales').hide();
    }
  });
  
 
$("#hora_ingresoreal, #hora_reingreso").on("change", function () {
    var horaIngreso = $("#hora_ingresoreal").val();
    var horaReingreso = $("#hora_reingreso").val();

    if (horaIngreso && horaReingreso && horaIngreso.includes(":") && horaReingreso.includes(":")) {
        var [h1, m1] = horaIngreso.split(":").map(Number);
        var [h2, m2] = horaReingreso.split(":").map(Number);

        var minutosIngreso = h1 * 60 + m1;
        var minutosReingreso = h2 * 60 + m2;

        

        var diferencia = minutosIngreso - minutosReingreso;
        $("#minutosdescu").val(diferencia);
    } else {
        $("#minutosdescu").val("");
    }
});




//GUARDAR LA SALIDA DEL FORMULARIO
$(document).off('click', '#guardar_salida').on('click', '#guardar_salida', function (e) {
    e.preventDefault();

    var dni = $('#dni').val().trim();
    var fecha = $('#fecha_salida').val().trim();
    var horaSalida = $('#hora_salida').val().trim();
    var horaReingreso = $('#hora_reingreso').val().trim();
    var motivo = $('#motivo').val().trim();
    var turno = $('#sa_turno').val().trim();
    var alterna = $('#alternativa').val().trim();
    var comentario = $('#comentario').val().trim();

  

    if (dni === '' || fecha === '' || horaSalida === ''  || motivo === '' || turno === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

      // Validar formato HH:MM
    var formatoHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
   if ((!formatoHora.test(horaSalida)) || (!formatoHora.test(horaReingreso) && alterna === "si"))
 {
        Swal.fire({
            icon: 'error',
            title: 'Formato incorrecto',
            text: 'Las horas deben estar en formato HH:MM (24 horas)',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Comparación directa de strings (funciona para formato HH:MM)
    if (horaReingreso <= horaSalida && alterna==="si") {
        Swal.fire({
            icon: 'error',
            title: 'Horas inválidas',
            text: 'La hora de reingreso debe ser posterior a la hora de salida',
            confirmButtonText: 'Entendido'
        });
        return;
    }
    // 3. Validar coherencia entre turno y horas
    var horaSalidaNum = parseInt(horaSalida.split(':')[0]);
    var errorTurno = false;
    var mensajeError = '';

    switch(turno) {
        case 'Mañana':
            if (horaSalidaNum < 6 || horaSalidaNum >= 12 && alterna==="si") {
                errorTurno = true;
                mensajeError = 'Para turno Mañana, la hora de salida debe ser entre 06:00 y 11:59';
            }
            break;
        case 'Tarde':
            if (horaSalidaNum < 12 || horaSalidaNum >= 18 && alterna==="si") {
                errorTurno = true;
                mensajeError = 'Para turno Tarde, la hora de salida debe ser entre 12:00 y 18:59';
            }
            break;
        default:
            errorTurno = true;
            mensajeError = 'Turno no válido. Seleccione Mañana, Tarde o Noche';
    }

    if (errorTurno) {
        Swal.fire({
            icon: 'error',
            title: 'Inconsistencia en turno',
            text: mensajeError,
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Deshabilitar el botón temporalmente
    $('#guardar_salida').prop('disabled', true);

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
            alterna:alterna,
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
                    title: 'Error al guardar',
                    text: response,
                    confirmButtonText: 'Cerrar'
                });
                $('#guardar_salida').prop('disabled', false); // Habilitar el botón en caso de error
            }
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'No se pudo conectar con el servidor.',
                confirmButtonText: 'Cerrar'
            });
            $('#guardar_salida').prop('disabled', false); // Habilitar el botón en caso de error
        },
        complete: function () {
            // Habilitar el botón después de la respuesta (solo si fue exitoso)
            $('#guardar_salida').prop('disabled', false);
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
        if(data.estado==="Ingreso correctamente"){
         $('#ingre_correcta').prop('disabled',true);
         $('#no_ingre').prop('disabled',true);

        }else if(data.estado==="Finalizado"){
         $('#ingre_correcta').prop('disabled',true);
         $('#no_ingre').prop('disabled',true);
        }else{
         $('#ingre_correcta').prop('disabled',false);
         $('#no_ingre').prop('disabled',false);
        }
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
                    if (response === "ok") {
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
                let horareal = fsalida.hora_ingreso_real || 'No registrado';
                if (horareal !== 'No registrado') {
                    const hora = parseInt(horareal.split(':')[0]);
                    const ampm = hora < 12 ? 'AM' : 'PM';
                    horareal = `${horareal} ${ampm}`;
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
                    fsalida.tiene_reingreso,
                    horareal,
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

//registra no ingreso
$(document).off('click', '#no_ingre').on('click', '#no_ingre', function (e) {
e.preventDefault();
    var id=$('#id_salida').val();
    var dni=$('#dni').val();
    var fecha=$('#fecha_salida').val();
    var turno=$('#turno').val();
    var reingreso=$('#hora_reingreso').val();

  $.ajax({
    url: 'proceso/mantesalidas.php?action=updatenoingre',
    type: 'POST',
    data: { id: id ,dni:dni,fecha:fecha,turno:turno,reingreso:reingreso},
   success: function(response) {
    Swal.fire({
        icon: 'success',
        title: response, 
        confirmButtonText: 'Aceptar'
    }).then(() => {
        $('#modaleditar').modal('hide');

        $("#vistas").fadeOut(200, function () {
            $(this).load("view/lista_salidas.php", function () {
                $(this).fadeIn(200);

                if ($.fn.DataTable.isDataTable('#tsalidas')) {
                    $('#tsalidas').DataTable().destroy();
                }

                $('#tsalidas').DataTable({
                    destroy: true,
                    
                });
            });
        });
    });
},
    error: function(response) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un problema al registrar el ingreso.',
            confirmButtonText: 'Aceptar'
        });
    }
});

});

$(document).off('click', '#ingre_correcta').on('click', '#ingre_correcta', function (e) {
e.preventDefault();
var id=$('#id_salida').val();
 var reingreso=$('#hora_reingreso').val();
  $.ajax({
    url: 'proceso/mantesalidas.php?action=updateestado',
    type: 'POST',
    data: { id: id,reingreso:reingreso},
   success: function(response) {
    Swal.fire({
        icon: 'success',
        title: response, 
        confirmButtonText: 'Aceptar'
    }).then(() => {
        $('#modaleditar').modal('hide');

        $("#vistas").fadeOut(200, function () {
            $(this).load("view/lista_salidas.php", function () {
                $(this).fadeIn(200);

                if ($.fn.DataTable.isDataTable('#tsalidas')) {
                    $('#tsalidas').DataTable().destroy();
                }

                $('#tsalidas').DataTable({
                    destroy: true,
                    
                });
            });
        });
    });
},


    error: function(response) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un problema al registrar el ingreso.',
            confirmButtonText: 'Aceptar'
        });
    }
});

});
//ingreso tarde
$(document).off('click', '#ingre_tarde').on('click', '#ingre_tarde', function(e) {
  e.preventDefault();

  if (!$('#mostrarCampos').is(':checked')) {
    Swal.fire({
      icon: 'warning',
      title: 'Campo no marcado',
      text: 'Por favor, marca el campo de Agregar hora de ingreso y minutos de descuento antes de continuar.',
      confirmButtonText: 'Entendido'
    });
    return;
  }
    var horaReingreso=$('#hora_reingreso').val();
    var horaIngreso=$('#hora_ingresoreal').val();
    var minutosdescu=$('#minutosdescu').val();
    var turno=$('#turno').val();
    var fecha=$('#fecha_salida').val();
    var dni=$('#dni').val();
    var id=$('#id_salida').val();



    function horaAMinutos(horaStr) {
    var partes = horaStr.split(':');
    return parseInt(partes[0], 10) * 60 + parseInt(partes[1], 10);
    }

    if (horaAMinutos(horaIngreso) <= horaAMinutos(horaReingreso)) {
    Swal.fire({
        icon: 'error',
        title: 'Error en las horas',
        text: 'La hora de ingreso no puede ser menor o igual que la hora de reingreso.',
        confirmButtonText: 'Aceptar'
    });
    return;
    }


    $.ajax({
        url: 'proceso/mantesalidas.php?action=ingretarde',
        type: 'POST',
        data: { horaIngreso:horaIngreso,minutosdescu:minutosdescu,turno:turno,fecha:fecha,dni:dni,id:id},
       success: function(response) {
        Swal.fire({
            icon: 'success',
            title: response, 
            confirmButtonText: 'Aceptar'
        }).then(() => {
            $('#modaleditar').modal('hide');
    
            $("#vistas").fadeOut(200, function () {
                $(this).load("view/lista_salidas.php", function () {
                    $(this).fadeIn(200);
    
                    if ($.fn.DataTable.isDataTable('#tsalidas')) {
                        $('#tsalidas').DataTable().destroy();
                    }
    
                    $('#tsalidas').DataTable({
                        destroy: true,
                        
                    });
                });
            });
        });
    },
    
    
      error: function(response) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un problema al registrar el ingreso.',
                confirmButtonText: 'Aceptar'
            });
        }
    });
    

});

