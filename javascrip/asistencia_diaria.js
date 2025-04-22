
function sumarminutosdesc2() {
    let num1 = parseInt($('#mdesm2').val()) || 0;
    let num2 = parseInt($('#mdest2').val()) || 0;
    $('#totalminutos2').val(num1 + num2).trigger('input');
}
function calcularMinutosm2() {
    let horaTolerancia = 8 * 60 + 16;
    let inputHora = $("#hentradam2").val();

    if (!inputHora) {
        $("#mdesm2").val("");
        return;
    }

    let [horas, minutos] = inputHora.split(":").map(Number);
    let minutosIngresados = horas * 60 + minutos;
    let diferencia = minutosIngresados - horaTolerancia;

    $("#mdesm2").val(diferencia > 0 ? diferencia : 0).trigger('input');
}
function calcularMinutost2() {
    let horaTolerancia = 14 * 60 + 11;
    let inputHora = $("#hentradat2").val();

    if (!inputHora) {
        $("#mdest2").val("");
        return;
    }

    let [horas, minutos] = inputHora.split(":").map(Number);
    let minutosIngresados = horas * 60 + minutos;
    let diferencia = minutosIngresados - horaTolerancia;

    $("#mdest2").val(diferencia > 0 ? diferencia : 0).trigger('input');
}
function calculardecuento2() {
    let sueldoMensual = parseFloat($('#sueldopriv2').val()) || 0;
    let gananciaPorMinuto = sueldoMensual / 14400;
    let totalMinutos = parseInt($('#totalminutos2').val()) || 0;
    let gananciaTotal = gananciaPorMinuto * totalMinutos;
    $('#totaldescuento2').val(gananciaTotal.toFixed(2));
}
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
        $(this).load("view/editar_asistencia.php", function () {
            $(this).fadeIn(200); 
            $.ajax({
                url: 'proceso/proceso_asistencia_diaria.php?accion=readOne', 
                type: 'GET',
                data: { id: id },
                dataType: 'json',
                success: function (data) {
                    if ($('#editasistenciaform').length) {


                        $('input[name="justificadom2"]').off('change').on('change', function() {
                            if ($(this).val() === "si") {
                                $('#mdesm2').val(0).trigger('input');
                                $('#totaldescuento2').val(0).trigger('input');
                            } else if ($(this).val() === "no") {
                                $("#hentradam2").off('input').on("input", calcularMinutosm2);
                                calcularMinutosm2();
                                calculardecuento2();
                            }
                        });
              // Mañana
$("#estadom2").on("change", function () {
    let valor6 = $(this).val();

    if (valor6 === "1") {
        $("#divjust2, #divcomt2").hide();
        $("input[name='justificadom2']").prop("checked", false);
        $("input[name='justificadot2']").prop("checked", false);
        $("#estadota2").prop("disabled", false);
        $("#estadota2").prop("selectedIndex", 1).trigger('change');
        $("#hentradam2, #hsalidat2, #hentradat2, #estadom2").prop("disabled", false);
        $('#mdesm2').val("0");
        $('#mdest2').val("0");
        $('#mdesm2').trigger('input');
        $('#mdest2').trigger('input');
        sumarminutosdesc2();
        calculardecuento2();
        $("input[name='justificadom2']").prop("checked", false);
        $("#divjusm2, #divcomm2").hide();
    } else if (valor6 === "2") {
        $("input[name='justificadom2']").prop("checked", false);
        $("input[name='justificadot2']").prop("checked", false);
        $("#mdest2, #hentradam2, #hsalidat2, #hentradat2, #estadom2").prop("disabled", false);
        $("#divjusm2, #divcomm2").show();

        $('input[name="justificadom2"]').off('change').on('change', function () {
            if ($(this).val() === "si") {
                $('#mdesm2').val("0").trigger('input');
                $('#totaldescuento2').val("0").trigger('input');
                sumarminutosdesc2();
                calculardecuento2();
            } else if ($(this).val() === "no") {
                $("#hentradam2").off('input').on("input", calcularMinutosm2);
                calcularMinutosm2();
                calculardecuento2();
            }
        });
    }else if(valor6 === "3"){
        $("#divjusm2, #divcomm2").show();
    $("#divjust2, #divcomt2").show();
    $("input[name='justificadom2']").prop("checked", false);

    // Sincronizar ambos inputs (justificadom2 y justificadot2)
    $('input[name="justificadom2"]').off('change').on('change', function () {
        let esJustificado = $(this).val();

        // Sincronizar 'justificadot2' con el valor de 'justificadom2'
        $(`input[name="justificadot2"][value="${esJustificado}"]`).prop("checked", true);

        // Realizar las acciones dependiendo del valor de 'justificadom2'
        if (esJustificado === "si") {
            $('#mdesm2').val("0");
            $('#mdest2').val("0");
            $('#hentradam2').val("00:00:00");
            $('#hentradat2').val("00:00:00");
            $('#hsalidat2').val("00:00:00");
            $("#estadota2").prop("selectedIndex", 3).trigger('change');
            $("#mdest2, #hentradam2, #hsalidat2, #hentradat2").prop("disabled", true);
            $("#estadota2").prop("disabled", true);
            $('#mdesm2').trigger('input');
            $('#mdest2').trigger('input');
            $('#hentradam2').trigger('input');
            $('#totaldescuento2').val("0").trigger('input');
            sumarminutosdesc2();
            calculardecuento2();
        } else if (esJustificado === "no") {
            $('#mdesm2').val("240");
            $('#mdest2').val("240");
            $('#hentradam2').val("00:00:00");
            $('#hentradat2').val("00:00:00");
            $('#hsalidat2').val("00:00:00");
            $("#estadota2").prop("selectedIndex", 3).trigger('change');
            $("#mdest2, #hentradam2, #hsalidat2, #hentradat2").prop("disabled", true);
            $("#estadota2").prop("disabled", true);
            $('#mdesm2').trigger('input');
            $('#mdest2').trigger('input');
            $('#hentradam2').trigger('input');
            sumarminutosdesc2();
            calculardecuento2();
        }
        });
    }else if(valor6=="4"){
        $("#divjusm2, #divcomm2").hide();
        $("#divjust2, #divcomt2").hide();
        $("input[name='justificadom2']").prop("checked", false);
        $("input[name='justificadot2']").prop("checked", false);
        $('#mdesm2').val("0");
        $('#mdest2').val("0");
        $('#hentradam2').val("00:00:00");
        $('#hentradat2').val("00:00:00");
        $('#hsalidat2').val("00:00:00");
        $("#mdest2, #hentradam2, #hsalidat2, #hentradat2").prop("disabled", true);
        $("#estadota2").prop("disabled", true);
        $("#estadota2").prop("selectedIndex", 4).trigger('change');
        $('#mdesm2').trigger('input');
        $('#mdest2').trigger('input');
        sumarminutosdesc2();
        calculardecuento2();
    }
});

// Tarde
$("#estadota2").on("change", function () {
    let valor7 = $(this).val();

    if (valor7 === "1") {
        $('#mdest2').val("0").trigger('input');
        sumarminutosdesc2();
        calculardecuento2();
        $("input[name='justificadot2']").prop("checked", false);
        $("#divjust2, #divcomt2").hide();
    } else if (valor7 === "2") {
        $("#divjust2, #divcomt2").show();

        $('input[name="justificadot2"]').off('change').on('change', function () {
            if ($(this).val() === "si") {
                $('#mdest2').val("0").trigger('input');
                $('#totaldescuento2').val("0").trigger('input');
                calcularMinutost2();
                calculardecuento2();
            } else if ($(this).val() === "no") {
                $("#hentradat2").off('input').on("input", calcularMinutosm2);
                calcularMinutost2();
                calculardecuento2();
            }
        });
    }
    
});


                        let estadom;
                        let estadot;

                        if ( data.estadom === "Puntual") {
                            estadom = 1;
                            $("#divjusm2, #divcomm2").hide();
                        } else if ( data.estadom === "Tardanza") {
                            estadom = 2;
                        } else if ( data.estadom === "Falta") {
                            estadom = 3;
                        } else if ( data.estadom === "Trabajo en Campo") {
                            estadom = 4;
                            $("#divjusm2, #divcomm2").hide();
                        } else {
                            estadom = 0; 
                        }

                        
                        if ( data.estadot === "Puntual") {
                            estadot = 1;
                            $("#divjust2, #divcomt2").hide();
                        } else if ( data.estadot === "Tardanza") {
                            estadot = 2;
                        } else if ( data.estadot === "Falta") {
                            estadot = 3;
                        } else if ( data.estadot === "Trabajo en Campo") {
                            estadot = 4;
                            $("#divjust2, #divcomt2").hide();
                        } else {
                            estadot = 0; 
                        }

                        if(data.minutos_descum > "0" && data.estadom=="Tardanza" ){
                            $("#justnom2").prop("checked", true);
                        }else if(data.minutos_descum ==="0" && data.estadom=="Tardanza"){
                            $("#justsim2").prop("checked", true);
                        }else{
                            $("#justnom2").prop("checked", false);
                            $("#justsim2").prop("checked", false);
                        }

                        if(data.minutos_descut > "0" && data.estadot=="Tardanza" ){
                            $("#justnot2").prop("checked", true);
                        }else if(data.minutos_descut ==="0" && data.estadot=="Tardanza"){
                            $("#justsit2").prop("checked", true);
                        }else{
                            $("#justnot2").prop("checked", false);
                            $("#justsit2").prop("checked", false);
                        }

                            $('#acodigo2').prop('disabled',true);
                            $('#adatos2').prop('disabled',true);
                            $('#adatos2').val(data.nombres+" "+data.apellidos);
                            $('#sueldopriv2').val(data.sueldo);
                            $('#acodigo2').val(data.dni);
                            $('#estadom2').val(estadom);
                            $('#estadota2').val(estadot);
                            $('#fechare2').val(data.fecha);
                            $('#hentradam2').val(data.horaim);
                            $('#hentradat2').val(data.horait);
                            $('#hsalidat2').val(data.horast);
                            $('#mdesm2').val(data.minutos_descum);
                            $('#mdest2').val(data.minutos_descut);
                            $('#totaldescuento2').val(data.descuento_dia);
                            $('#mdesm2, #mdest2').off('input').on('input', sumarminutosdesc2);
                            sumarminutosdesc2();
                       
                       
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


//traer falta
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
                                $('#mdesf').val(480).prop('disabled', true); 
                                let sueldoMensual = parseFloat(data.sueldo) || 0;
                                let pagoPorMinuto = sueldoMensual / 14400; 
                                let descuento = 480 * pagoPorMinuto;
                                $('#totaldescuento').val(descuento.toFixed(2)).prop('disabled', true);
                                $('#totalminutos').val(480).prop('disabled', true);
                                $('#neto').val((sueldoMensual - descuento).toFixed(2)).prop('disabled', true);
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

//registrar trabajo de campo
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


    
