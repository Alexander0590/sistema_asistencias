
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
    const fechaInput = $('#txtfa');
    
    // Función para actualizar ambas listas
    function actualizarListas() {
        const fecha = fechaInput.val();
        listar_asistencias(fecha);
        listar_faltas(fecha);
    }
    
    // Ejecutar al cargar y configurar el intervalo
    actualizarListas();
    const intervalo = setInterval(actualizarListas, 1000); 
    
    // También actualizar cuando cambia la fecha
    fechaInput.on('change', actualizarListas);
    
    $(window).on('beforeunload', function() {
        clearInterval(intervalo);
    });

    // Función para listar faltas (sin cambios)
    function listar_faltas(fechax) {
        $.ajax({
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_faltas', fecha: fechax },
            success: function (response) {
                const registro = JSON.parse(response);
                let template = '';

                if (registro === 'sin_data') {
                    $('#cuerpo_tabla_fd').empty();
                    return;
                }

                registro.forEach((item, index) => {
                    template += `
                        <tr class="fila-falta">
                            <td class="text-center align-middle">${index + 1}</td>
                            <td>${item.dni}</td>
                            <td>${item.apellidos}</td>
                            <td>${item.nombres}</td>
                            <td class="text-center align-middle" style="white-space: nowrap; width: 100px;">
                                <div class="d-flex justify-content-center gap-1">
                                    <button class="btn btn-danger btn-sm registrarf" style="padding: 3px 6px;" data-id="${item.dni}">
                                        <i class="bi bi-x-circle"></i> Registrar falta
                                    </button>
                                    <button class="btn btn-success btn-sm registrartc" style="padding: 3px 6px;" data-id="${item.dni}">
                                        <i class="bi bi-check-circle"></i> Registrar Trabajo en Campo
                                    </button>
                                </div>
                            </td>
                        </tr>`;
                });

                $('#cuerpo_tabla_fd').html(template);
            }
        });
    }

    // Función para listar asistencias (sin cambios)
    function listar_asistencias(fechax) {
        $.ajax({
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_registrados', fecha: fechax },
            success: function (response) {
                const registro2 = JSON.parse(response);
                let template2 = '';

                if (registro2 === 'sin_data') {
                    template2 = `
                        <tr>
                            <td colspan="5" class="text-center text-muted">No hay asistencias hoy</td>
                        </tr>`;
                } else {
                    registro2.forEach((item, index) => {
                        let clase = '';

                        if (item.estadom === 'Falta' || item.estadot === 'Falta') {
                            clase = 'fila-falta';
                        } else {
                            clase = 'fila-asistencia';
                        }

                        template2 += `<tr class="${clase}">
                            <td class="text-center align-middle">${index + 1}</td>
                            <td>${item.dni}</td>
                            <td>${item.apellidos}</td>
                            <td>${item.nombres}</td>
                            <td>`;

                        if (item.estadom === 'Vacaciones' || item.estadot === 'Vacaciones') {
                            template2 += `<span class="text-dark">Personal de Vacaciones</span>`;
                        } else {
                            template2 += `
                                <button class="btn btn-primary btn-sm bg-primary registrara" data-id="${item.dni}">
                                    <i class="bi bi-pencil"></i> Editar
                                </button>`;
                        }

                        template2 += `</td></tr>`;
                    });
                }

                $('#cuerpo_tabla_ad').html(template2);
            }
        });
    }
});


$(document).on('click', '.registrara', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    let id = $(this).data('id');
    let fecha = $('#txtfa').val();

    $("#vistas").fadeOut(200, function () {
        $(this).load("view/editar_asistencia.php", function () {
            $(this).fadeIn(200);

            $.ajax({
                url: 'proceso/proceso_asistencia_diaria.php?accion=readOne',
                type: 'GET',
                data: { id: id, fecha: fecha },
                dataType: 'json',
                success: function (data) {
                    if ($('#editasistenciaform').length) {
                        inicializarFormulario(data);
                        manejarEventosFormulario();
                    } else {
                        console.error("No se encontró el formulario");
                    }
                },
                error: function (error) {
                    console.error('Error al obtener datos:', error);
                }
            });
        });
    });
});

function obtenerEstado(estado) {
    const estados = {
        "Puntual": 1,
        "Tardanza": 2,
        "Falta": 3,
        "Trabajo en Campo": 4
    };
    return estados[estado] || 0;
}

function inicializarFormulario(data) {
    $('#acodigo2').val(data.dni).prop('disabled', true);
    $('#adatos2').val(`${data.nombres} ${data.apellidos}`).prop('disabled', true);
    $('#sueldopriv2').val(data.sueldo);
    $('#fechare2').val(data.fecha);
    
    $('#hentradam2').val(data.horaim);
    $('#hentradat2').val(data.horait);
    $('#hsalidat2').val(data.horast);
    
    $('#estadom2').val(obtenerEstado(data.estadom));
    $('#estadota2').val(obtenerEstado(data.estadot));
    
    if(data.estadom === "Falta") {
        manejarEstadoFaltaM(true, data);
    } 
    else if(data.estadot === "Falta") {
        manejarEstadoFaltaT(true, data);
    }
    else if(data.estadom === "Trabajo en Campo") {
        manejarTrabajoCampoM(true);
    }
    else if(data.estadot === "Trabajo en Campo") {
        manejarTrabajoCampoT(true);
    }
    else {
        $('#mdesm2').val(data.minutos_descum);
        $('#mdest2').val(data.minutos_descut);
    }
    
    $('#totaldescuento2').val(data.descuento_dia);
    manejarJustificacion(data);
    sumarminutosdesc2();
    calculardecuento2();
}

function manejarEstadoFaltaM(esInicializacion, data) {
    $('#hentradam2').val("00:00:00").prop('disabled', true);
    
    $("#divjusm2, #divcomm2").show();
    
    if(esInicializacion) {
        $('#mdesm2').val(data.minutos_descum);
    } else {
        actualizarValoresFaltaM();
    }
}

function manejarEstadoFaltaT(esInicializacion, data) {
    $('#hentradat2').val("00:00:00").prop('disabled', true);
    $('#hsalidat2').val("00:00:00").prop('disabled', true);
    
    $("#divjust2, #divcomt2").show();
    
    if(esInicializacion) {
        $('#mdest2').val(data.minutos_descut);
    } else {
        actualizarValoresFaltaT();
    }
}

function manejarTrabajoCampoM(esInicializacion) {
    $('#hentradam2').val("08:00:00").prop('disabled', true);
    $('#mdesm2').val("0");
    $("#divjusm2, #divcomm2").hide();
}

function manejarTrabajoCampoT(esInicializacion) {
    $('#hentradat2').val("14:00:00").prop('disabled', true);
    $('#hsalidat2').val("16:30:00").prop('disabled', true);
    $('#mdest2').val("0");
    $("#divjust2, #divcomt2").hide();
}

function actualizarValoresFaltaM() {
    const justificacionM = $('input[name="justificadom2"]:checked').val();
    
    if($('#estadom2').val() === "3") {
        if(justificacionM === "si") {
            $('#mdesm2').val("0");
        } else {
            $('#mdesm2').val("300");
        }
    }
    
    sumarminutosdesc2();
    calculardecuento2();
}

function actualizarValoresFaltaT() {
    const justificacionT = $('input[name="justificadot2"]:checked').val();
    
    if($('#estadota2').val() === "3") {
        if(justificacionT === "si") {
            $('#mdest2').val("0");
        } else {
            $('#mdest2').val("150");
        }
    }
    
    sumarminutosdesc2();
    calculardecuento2();
}

function manejarJustificacion(data) {
    $('input[name="justificadom2"]').prop('checked', false);
    $('input[name="justificadot2"]').prop('checked', false);
    
    if (data.estadom === "Falta") {
        if (parseInt(data.minutos_descum) === 0) {
            $('input[name="justificadom2"][value="si"]').prop("checked", true);
        } else {
            $('input[name="justificadom2"][value="no"]').prop("checked", true);
        }
    } 
    else if (data.estadot === "Falta") {
        if (parseInt(data.minutos_descut) === 0) {
            $('input[name="justificadot2"][value="si"]').prop("checked", true);
        } else {
            $('input[name="justificadot2"][value="no"]').prop("checked", true);
        }
    }
    else if (data.estadom === "Tardanza") {
        if (parseInt(data.minutos_descum) === 0) {
            $('input[name="justificadom2"][value="si"]').prop("checked", true);
        } else {
            $('input[name="justificadom2"][value="no"]').prop("checked", true);
        }
    }
    
    if (data.estadot === "Tardanza") {
        if (parseInt(data.minutos_descut) === 0) {
            $('input[name="justificadot2"][value="si"]').prop("checked", true);
        } else {
            $('input[name="justificadot2"][value="no"]').prop("checked", true);
        }
    }
    
    if (data.estadom === "Tardanza" || data.estadom === "Falta") {
        $("#divjusm2, #divcomm2").show();
    } else {
        $("#divjusm2, #divcomm2").hide();
    }
    
    if (data.estadot === "Tardanza" || data.estadot === "Falta") {
        $("#divjust2, #divcomt2").show();
    } else {
        $("#divjust2, #divcomt2").hide();
    }
}

function manejarEventosFormulario() {
    $("#estadom2").off('change').on("change", function() {
        const valor = $(this).val();
        
        if(valor === "3") {
            manejarEstadoFaltaM(false, {});
        } 
        else if(valor === "4") {
            manejarTrabajoCampoM(false);
        }
        else if(valor === "1") {
            $('#mdesm2').val("0");
            $('#hentradam2').prop("disabled", false);
            $("#divjusm2, #divcomm2").hide();
        } 
        else if(valor === "2") {
            $('#mdesm2').val("0");
            $("#divjusm2, #divcomm2").show();
            $("#justnom2").prop("checked", true);
        }
        
        sumarminutosdesc2();
        calculardecuento2();
    });

    $("#estadota2").off('change').on("change", function() {
        const valor = $(this).val();
        
        if(valor === "3") {
            manejarEstadoFaltaT(false, {});
        } 
        else if(valor === "4") {
            manejarTrabajoCampoT(false);
        }
        else if(valor === "1") {
            $('#mdest2').val("0");
            $('#hentradat2, #hsalidat2').prop("disabled", false);
            $("#divjust2, #divcomt2").hide();
        } 
        else if(valor === "2") {
            $('#mdest2').val("0");
            $("#divjust2, #divcomt2").show();
            $("#justnot2").prop("checked", true);
        }
        
        sumarminutosdesc2();
        calculardecuento2();
    });

    $('input[name="justificadom2"]').off('change').on('change', function() {
        if($('#estadom2').val() === "3") {
            actualizarValoresFaltaM();
        } else {
            const valor = $(this).val();
            
            if(valor === "si") {
                $('#mdesm2').val("0");
            } else {
                calcularMinutosm2();
            }
            
            sumarminutosdesc2();
            calculardecuento2();
        }
    });

    $('input[name="justificadot2"]').off('change').on('change', function() {
        if($('#estadota2').val() === "3") {
            actualizarValoresFaltaT();
        } else {
            const valor = $(this).val();
            
            if(valor === "si") {
                $('#mdest2').val("0");
            } else {
                calcularMinutost2();
            }
            
            sumarminutosdesc2();
            calculardecuento2();
        }
    });

    $('#hentradam2').off('change input').on('change input', function() {
        if ($('#estadom2').val() === "2" && $('input[name="justificadom2"]:checked').val() === "no") {
            calcularMinutosm2();
            sumarminutosdesc2();
            calculardecuento2();
        }
    });

    $('#hentradat2').off('change input').on('change input', function() {
        if ($('#estadota2').val() === "2" && $('input[name="justificadot2"]:checked').val() === "no") {
            calcularMinutost2();
            sumarminutosdesc2();
            calculardecuento2();
        }
    });
}
//traer falta
$(document).on('click', '.registrarf', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let id = $(this).data('id');
    let fecha=$('#txtfa').val();

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
                       
                        $('#fechare').val(fecha);

                        $(document).off('change', 'input[name=justificadof]').on('change', 'input[name=justificadof]', function () {
                            if ($(this).val() === "si") {
                                let sueldoMensual = parseFloat(data.sueldo) || 0;
                                $('#mdesf ,#totaldescuento').val(0).prop('disabled', true);
                                $('#neto').val(sueldoMensual).prop('disabled', true);
                                $('#totalminutos').val(0).prop('disabled', true);

                            } else if ($(this).val() === "no") {
                                $('#mdesf').val(450).prop('disabled', true); 
                                let sueldoMensual = parseFloat(data.sueldo) || 0;
                                let pagoPorMinuto = sueldoMensual / 14400; 
                                let descuento = 450 * pagoPorMinuto;
                                $('#totaldescuento').val(descuento.toFixed(2)).prop('disabled', true);
                                $('#totalminutos').val(450).prop('disabled', true);
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
$(document).off('click', '#btnfal').on('click', '#btnfal', function (e) {
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
                        $(this).load("view/asistencia_diaria.php?fd="+fecha, function () {
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
    let fecha=$('#txtfa').val();
    let estador = "Trabajo en Campo";
    let horaim = '8:00:00';
    let horait = '14:00:00';
    let horasm = '13:00:00';
    let horast = '16:30:00';
    let descuento = 0;
    let minutos = 0;

    $.ajax({
        url: 'proceso/proceso_asistencia_diaria.php?accion=createtc',
        type: 'POST',
        data: {
            id: id,
            fecha:fecha,
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
                        $(this).load("view/asistencia_diaria.php?fd="+fecha, function () {
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


$(document).off('click', '#cerrardia').on('click', '#cerrardia', function (e) {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0];
    const lastExecution = localStorage.getItem('lastExecution');

    if (lastExecution === today) {
        Swal.fire({
            icon: 'info',
            title: '¡Atención!',
            text: 'El cierre del sistema ya se realizó hoy.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esto actualizará los registros del día.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'proceso/asistenciaman.php', 
                method: 'GET',
                data: { action: 'cerrardia' },
                dataType: 'json',
                success: function(response) {
                    if(response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Actualizado!',
                            text: response.message,
                            confirmButtonText: 'Aceptar'
                        });
                        localStorage.setItem('lastExecution', today);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message,
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                error: function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error en la comunicación con el servidor.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        }
    });
});
