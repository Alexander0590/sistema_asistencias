
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
    const estadoAnterior = {
        asistenciasData: [],
        faltasData: []
    };

    let cargandoAsistencias = false;
    let cargandoFaltas = false;

    function datosSonIguales(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    function actualizarListas() {
        const fecha = fechaInput.val();
        estadoAnterior.asistenciasData = [];
        estadoAnterior.faltasData = [];
        listar_asistencias(fecha);
        listar_faltas(fecha);
    }

    actualizarListas();

    fechaInput.on('change', () => {
        actualizarListas();
    });

    function listar_faltas(fechax) {
        if (cargandoFaltas) return;
        cargandoFaltas = true;

        $.ajax({
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_faltas', fecha: fechax },
            success: function (response) {
                let registro;
                try {
                    registro = JSON.parse(response);
                } catch (e) {
                    console.error("Error al parsear JSON faltas:", e, response);
                    registro = [];
                }

                if (registro === 'sin_data') registro = [];

                if (!datosSonIguales(registro, estadoAnterior.faltasData)) {
                    estadoAnterior.faltasData = registro;

                    let template = '';
                    if (registro.length === 0) {
                        template = `<tr><td colspan="5" class="text-center text-muted">No hay faltas hoy</td></tr>`;
                    } else {
                        registro.forEach((item, index) => {
                            template += `
                                <tr class="fila-falta">
                                    <td class="text-center align-middle">${index + 1}</td>
                                    <td>${item.dni}</td>
                                    <td>${item.apellidos}</td>
                                    <td>${item.nombres}</td>
                                    <td class="text-center align-middle" style="white-space: nowrap; width: 100px;">
                                        <div class="d-flex justify-content-center gap-1">
                                            <button class="btn btn-danger btn-sm registrarf" data-id="${item.dni}">
                                                <i class="bi bi-x-circle"></i> Registrar falta
                                            </button>
                                            <button class="btn btn-success btn-sm registrartc" data-id="${item.dni}">
                                                <i class="bi bi-check-circle"></i> Trabajo en Campo
                                            </button>
                                        </div>
                                    </td>
                                </tr>`;
                        });
                    }
                    $('#cuerpo_tabla_fd').html(template);
                }
            },
            complete: function () {
                cargandoFaltas = false;
            },
            error: function () {
                console.error('Error en listar_faltas AJAX');
            }
        });
    }

    function listar_asistencias(fechax) {
        if (cargandoAsistencias) return;
        cargandoAsistencias = true;

        $.ajax({
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_registrados', fecha: fechax },
            success: function (response) {
                let registro;
                try {
                    registro = JSON.parse(response);
                } catch (e) {
                    console.error("Error al parsear JSON asistencias:", e, response);
                    registro = [];
                }

                if (registro === 'sin_data') registro = [];

                if (!datosSonIguales(registro, estadoAnterior.asistenciasData)) {
                    estadoAnterior.asistenciasData = registro;

                    let template = '';
                    if (registro.length === 0) {
                        template = `<tr><td colspan="5" class="text-center text-muted">No hay asistencias hoy</td></tr>`;
                    } else {
                        registro.forEach((item, index) => {
                            const clase = (item.estadom === 'Falta' || item.estadot === 'Falta') ? 'fila-falta' : 'fila-asistencia';
                            template += `
                                <tr class="${clase}">
                                    <td class="text-center align-middle">${index + 1}</td>
                                    <td>${item.dni}</td>
                                    <td>${item.apellidos}</td>
                                    <td>${item.nombres}</td>
                                    <td>`;
                            if (item.estadom === 'Vacaciones' || item.estadot === 'Vacaciones') {
                                template += `<span class="text-dark">Personal de Vacaciones</span>`;
                            } else {
                                template += `
                                    <button class="btn btn-primary btn-sm registrara" data-id="${item.dni}">
                                        <i class="bi bi-pencil"></i> Editar
                                    </button>`;
                            }
                            template += `</td></tr>`;
                        });
                    }
                    $('#cuerpo_tabla_ad').html(template);
                }
            },
            complete: function () {
                cargandoAsistencias = false;
            },
            error: function () {
                console.error('Error en listar_asistencias AJAX');
            }
        });
    }

    // Actualización en tiempo real cada 5 segundos (si no está cargando)
    setInterval(() => {
        const fecha = $('#txtfa').val();
        if (fecha) {
            listar_asistencias(fecha);
            listar_faltas(fecha);
        }
    }, 5000);

    // ------------------------ EVENTOS ----------------------------

    $(document).on('click', '.registrarf', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        let fecha = $('#txtfa').val();

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
                            $('#acodigo').prop('disabled', true).val(data.dni);
                            $('#adatos').val(data.nombres + " " + data.apellidos);
                            $('#fechare').val(fecha);
                            $('#estadof').val("3");

                            $(document).off('change', 'input[name=justificadof]').on('change', 'input[name=justificadof]', function () {
                                const sueldo = parseFloat(data.sueldo) || 0;

                                if ($(this).val() === "si") {
                                    $('#mdesf, #totaldescuento, #totalminutos, #neto').val(0).prop('disabled', true);
                                } else {
                                    const minutos = 450;
                                    const descuento = sueldo / 14400 * minutos;
                                    $('#mdesf').val(minutos).prop('disabled', true);
                                    $('#totaldescuento').val(descuento.toFixed(2)).prop('disabled', true);
                                    $('#totalminutos').val(minutos).prop('disabled', true);
                                    $('#neto').val((sueldo - descuento).toFixed(2)).prop('disabled', true);
                                }
                            });
                        } else {
                            console.error("No se encontró el formulario");
                        }
                    },
                    error: function () {
                        console.error('Error al obtener los datos del usuario');
                    }
                });
            });
        });
    });

    $(document).on('click', '.registrartc', function (e) {
        e.preventDefault();

        const $btn = $(this);
        if ($btn.data('enviando')) return;
        $btn.data('enviando', true);

        const id = $btn.data('id');
        const fecha = $('#txtfa').val();
        const data = {
            id,
            fecha,
            estador: "Trabajo en Campo",
            horaim: '8:00:00',
            horait: '14:00:00',
            horasm: '13:00:00',
            horast: '16:30:00',
            descuento: 0,
            minutos: 0
        };

        $.ajax({
            url: 'proceso/proceso_asistencia_diaria.php?accion=createtc',
            type: 'POST',
            data,
            dataType: 'json',
            success: function (response) {
                Swal.fire({
                    title: response.success ? "¡Éxito!" : "¡Error!",
                    text: response.success
                        ? "Trabajo en campo ha sido registrado correctamente."
                        : "Error al registrar asistencia: " + response.message,
                    icon: response.success ? "success" : "error",
                    confirmButtonText: "OK"
                }).then(() => {
                    if (response.success) {
                        $("#vistas").fadeOut(200, function () {
                            $(this).load("view/asistencia_diaria.php?fd=" + fecha, function () {
                                $(this).fadeIn(200);
                                actualizarListas();
                            });
                        });
                    }
                });
            },
            complete: function () {
                $btn.data('enviando', false);
            },
            error: function () {
                alert('Ocurrió un error en la solicitud.');
            }
        });
    });

    $(document).on('click', '.registrara', function (e) {
        e.preventDefault();

        const id = $(this).data('id');
        const fecha = $('#txtfa').val();

        $("#vistas").fadeOut(200, function () {
            $(this).load("view/editar_asistencia.php", function () {
                $(this).fadeIn(200);

                $.ajax({
                    url: 'proceso/proceso_asistencia_diaria.php?accion=readOne',
                    type: 'GET',
                    data: { id, fecha },
                    dataType: 'json',
                    success: function (data) {
                        if ($('#editasistenciaform').length) {
                            inicializarFormulario(data);
                            manejarEventosFormulario();
                        }
                    },
                    error: function () {
                        console.error('Error al obtener datos');
                    }
                });
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
