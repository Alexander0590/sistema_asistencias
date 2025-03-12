

$(document).ready(function () {
    listar_faltas();
   

    function listar_faltas() {
        $.ajax({
            async: true,
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_faltas' },
            success: function (response) {
                var registro = JSON.parse(response);
                if (registro == 'sin_data') {
                    $('#cuerpo_tabla_fd').html('');
                } else {
                    var template = '';
                    var i = 0;
                    for (z in registro) {
                        i++;
                        template +=
                           '<tr class="fila-falta">' + 
                            '<td class="text-center align-middle">' + i + '</td>' +
                            '<td>' + registro[z].dni + '</td>' +
                            '<td>' + registro[z].apellidos + '</td>' +
                            '<td>' + registro[z].nombres + '</td>' +
                            '<td class="text-center align-middle" style="white-space: nowrap; width: 100px;">' + 
                                '<div class="d-flex justify-content-center gap-1">' + 
                                    '<button class="btn btn-danger btn-sm registrarf d-block" style="padding: 3px 6px; font-size: 15px;" data-id="' + registro[z].dni + '">' +
                                        '<i class="bi bi-x-circle"></i> Registrar falta' +
                                    '</button>' +
                                    '<button class="btn btn-success btn-sm registrartc d-block" style="padding: 3px 6px; font-size: 15px;" data-id="' + registro[z].dni + '">' +
                                        '<i class="bi bi-check-circle"></i> Registrar Trabajo en Campo' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>';



                    }
                    $('#cuerpo_tabla_fd').html(template);
                }
            }
        });
        listar_asistencias();
    }

  

    function listar_asistencias() {
        $.ajax({
            async: true,
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_registrados' },
            success: function (response2) {
                let template2 = '';
                var registro2 = JSON.parse(response2);
                if (registro2 === 'sin_data') {
                    template2 += `
                        <tr>
                            <td colspan="5" class="text-center text-muted">
                                No hay asistencias hoy
                            </td>
                        </tr>`;
                } else {
                    var registro2 = JSON.parse(response2);
                    var i = 0;
    
                    for (z in registro2) {
                        i++;
                        template2 += `
                            <tr class="fila-asistencia">
                                <td class="text-center align-middle">${i}</td>
                                <td>${registro2[z].dni}</td>
                                <td>${registro2[z].apellidos}</td>
                                <td>${registro2[z].nombres}</td>
                                <td>
                                    <button class="btn btn-primary btn-sm bg-primary registrara" data-id="${registro2[z].dni}">
                                        <i class="bi bi-pencil"></i> Editar
                                    </button>
                                </td>
                            </tr>`;
                    }
                }
    
                $('#cuerpo_tabla_ad').html(template2);
            },
            
        });
    }
    
});


//editar asistencia de hoy
$(document).on('click', '.registrara', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let id = $(this).data('id');

    $("#vistas").fadeOut(200, function () {
        $(this).load("view/asistencia.html", function () {
            $(this).fadeIn(200); 
            $.ajax({
                url: 'proceso/proceso_asistencia_diaria.php?accion=readOne', 
                type: 'GET',
                data: { id: id },
                dataType: 'json',
                success: function (data) {
                    if ($('#asistenciaform').length) {
                        $('#btacasis').show();
                        $('#btnregistraras').hide();
                        $('#acodigo').val(data.dni);
                        $('#fechare').val(data.fecha);
                        $('#hentradam').val(data.horaim);
                        $('#hsalidam').val(data.horasm);
                        $('#hentradat').val(data.horait);
                        $('#hsalidat').val(data.horast);
                        let estado1;
                        let estado2;
                        const estadoMap = { "Puntual": "1", "Tardanza": "2","Falta": "3" };
                        estado1 = estadoMap[data.estadom] || "";
                        estado2 = estadoMap[data.estadot] || "";
                        $('#estadom').val(estado1);
                        $('#estadota').val(estado2);

                        let minutosTarde = parseInt(data.minutos_descut) || 0;
                        let minutosManana = parseInt(data.minutos_descum) || 0;
                        let totalMinutos = minutosTarde + minutosManana;
                        
                        $('#mdesm').val(minutosManana);
                        $('#mdest').val(minutosTarde);
                        $('#totalminutos').val(totalMinutos);
                       
                    } else {
                        console.error("No se encontró el formulario en usuario.php");
                    }
                },
                error: function ( error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            });
        });
    });


});

//traer datos de las  faltas
$(document).on('click', '.registrarf', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let id = $(this).data('id');

    $("#vistas").fadeOut(200, function () {
        $(this).load("view/asistencia.html", function () {
            $(this).fadeIn(200); 
            $.ajax({
                url: 'proceso/proceso_asistencia_diaria.php?accion=readonef', 
                type: 'GET',
                data: { id: id },
                dataType: 'json',
                success: function (data) {
                    if ($('#asistenciaform').length) {
                        $('#btnfal, #divcomf, #divminf, #divestadof, #divfjus').show();
                        $('#btnregistraras, #divm, #divt, #divturno').hide();
                        $('#acodigo').prop('disabled',true);
                        $('#estadof').val("3");
                        $('#acodigo').val(data.dni);
                        $('#adatos').val(data.nombres + " " + data.apellidos);
                        const fechaLocal = new Date();
                        fechaLocal.setMinutes(fechaLocal.getMinutes() - fechaLocal.getTimezoneOffset()); 
                        $('#fechare').val(fechaLocal.toISOString().split('T')[0]).prop('disabled', true);

                        $(document).off('change', 'input[name=justificadof]').on('change', 'input[name=justificadof]', function () {
                            if ($(this).val() === "si") {
                                let sueldoMensual = parseFloat(data.sueldo) || 0;
                                $('#mdesf ,#totaldescuento').val(0).prop('disabled', true);
                                $('#neto').val(sueldoMensual).prop('disabled', true);
                                $('#totalminutos').val(0).prop('disabled', true);

                            } else if ($(this).val() === "no") {
                                $('#mdesf').val(480).prop('disabled', true);;
                                let sueldoMensual = parseFloat(data.sueldo) || 0;
                                let pagoPorMinuto = (sueldoMensual / 4) / (8 * 5 * 60); 
                                let descuento = 480 * pagoPorMinuto;
                                $('#totaldescuento').val(descuento.toFixed(2)).prop('disabled', true);
                                $('#totalminutos').val(480).prop('disabled', true);
                                $('#neto').val(sueldoMensual-descuento).prop('disabled', true);
                            }
                        });
                    } else {
                        console.error("No se encontró el formulario ");
                    }
                },
                error: function ( textStatus, errorThrown) {
                    console.error('Error al obtener los datos del usuario:', textStatus, errorThrown);
                }
            });
        });
    });
});
//REGISTRAR LAS FALTAS
$(document).on('click', '#btnfal', function (e) {
    let btn = $(this);
    btn.prop('disabled', true);

    let totalDescuento = $('#totaldescuento').val();
    if (!totalDescuento) {
        Swal.fire({
            title: "¡Error!",
            text: "Por favor, seleccione una justificación",
            icon: "error",
            confirmButtonText: "OK"
        });
        btn.prop('disabled', false);
        return;
    }

    let codigo = $('#acodigo').val();
    let estador = $('#estadof').val();
    let fecha = $('#fechare').val();
    let justificado = $('input[name=justificadof]:checked').val();
    let minutos = $('#totalminutos').val();
    let comentario = $('#comenf').val();

    $.ajax({
        url: 'proceso/proceso_asistencia_diaria.php?accion=createf',
        type: 'POST',
        data: {
            codigo: codigo,
            estador: estador,
            fecha: fecha,
            justificado: justificado,
            descuento: totalDescuento,
            minutos: minutos,
            comentario: comentario
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    title: "¡Éxito!",
                    text: "La Falta ha sido registrada correctamente.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    $('#asistenciaform')[0].reset();
                    $("#vistas").fadeOut(200, function () {
                        $(this).load("view/asistencia_diaria.php", function () {
                            $(this).fadeIn(200);
                        });
                    });
                });
            } else {
                Swal.fire({
                    title: "¡Error!",
                    text: "Error al registrar asistencia: " + response.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
            btn.prop('disabled', false);
        },
        error: function () {
            alert('Ocurrió un error en la solicitud.');
            btn.prop('disabled', false);
        }
    });
});


$(document).off('click', '.registrartc').on('click', '.registrartc', function (e) {
    e.preventDefault();

    let $btn = $(this); 
    if ($btn.data('enviando')) {
        return; 
    }
    $btn.data('enviando', true); 

    let id = $btn.data('id');
    let estador = "Trabajo en Campo";
    let horaim = '8:00:00';
    let horait = '14:00:00';
    let horasm = '13:00:00';
    let horast = '18:00:00';
    let descuento = 0;
    let minutos = 0;

    $.ajax({
        url: 'proceso/proceso_asistencia_diaria.php?accion=createtc',
        type: 'POST',
        data: {
            id: id,
            estador: estador,
            horaim: horaim,
            horait: horait,
            horasm: horasm,
            horast: horast,
            descuento: descuento,
            minutos: minutos
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    title: "¡Éxito!",
                    text: "Trabajo en campo ha sido registrado correctamente.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    $("#vistas").fadeOut(200, function () {
                        $(this).load("view/asistencia_diaria.php", function () {
                            $(this).fadeIn(200);
                        });
                    });
                });
            } else {
                Swal.fire({
                    title: "¡Error!",
                    text: "Error al registrar asistencia: " + response.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        },
        error: function () {
            alert('Ocurrió un error en la solicitud.');
        },
        complete: function () {
            $btn.data('enviando', false); 
        }
    });
});
