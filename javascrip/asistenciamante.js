
//registro manualmente
$(document).ready(function() {
    // Constantes configurables
    const CONFIG = {
        TOLERANCIA_MANANA: 8 * 60 + 15,   // 8:16 am en minutos
        TOLERANCIA_TARDE: 14 * 60 + 15,   // 2:11 pm en minutos
        MINUTOS_LABORALES_MES: 14400       // 240 horas * 60 minutos
    };

    // Cache de selectores frecuentes
    const $els = {
        sueldo: $('#sueldopriv'),
        mdesm: $('#mdesm'),
        mdest: $('#mdest'),
        totalminutos: $('#totalminutos'),
        totaldescuento: $('#totaldescuento'),
        hentradam: $('#hentradam'),
        hentradat: $('#hentradat'),
        estadom: $('#estadom'),
        estadota: $('#estadota'),
        divmdm: $('#divmdm'),
        divjusm: $('#divjusm'),
        divcomm: $('#divcomm'),
        divmdt: $('#divmdt'),
        divjust: $('#divjust'),
        divcomt: $('#divcomt'),
        justificadom: $('input[name="justificadom"]'),
        justificadot: $('input[name="justificadot"]'),
        form: $('#tuFormulario') // Cambiar al ID de tu formulario
    };

    // Inicialización
    function init() {
        hideAllSections();
        setupEventListeners();
        hideUnwantedOptions();
    }

    function hideUnwantedOptions() {
        $els.estadom.find('option[value="3"], option[value="4"]').hide();
        $els.estadota.find('option[value="3"], option[value="4"]').hide();
        
        $els.estadom.val($els.estadom.find('option:not([style*="display: none"]):first').val());
        $els.estadota.val($els.estadota.find('option:not([style*="display: none"]):first').val());
    }

    function hideAllSections() {
        $els.divjusm.add($els.divcomm).add($els.divjust).add($els.divcomt).hide();
        $els.mdesm.add($els.mdest).add($els.totaldescuento).add($els.totalminutos).val("");
    }

    function setupEventListeners() {
        $els.sueldo.add($els.totalminutos).add($els.mdesm).add($els.mdest).on('input', calculardecuento);
        $els.hentradam.on('input', handleHoraManana);
        $els.hentradat.on('input', handleHoraTarde);
        $els.mdesm.add($els.mdest).on('input', sumarminutosdesc);
        $els.estadom.on("change", handleEstadoManana);
        $els.estadota.on("change", handleEstadoTarde);
        $els.justificadom.on('change', handleJustificacionM);
        $els.justificadot.on('change', handleJustificacionT);
        $els.form.on('submit', validarFormulario);
    }

    function handleHoraManana() {
        const estado = $els.estadom.val();
        const hora = $els.hentradam.val();
        
        if (estado === "1") {
            validarHoraPuntual(hora, CONFIG.TOLERANCIA_MANANA, 'mañana');
        } else if (estado === "2" && $els.justificadom.filter(':checked').val() === "no") {
            calcularMinutosm();
        }
    }

    function handleHoraTarde() {
        const estado = $els.estadota.val();
        const hora = $els.hentradat.val();
        
        if (estado === "1") {
            validarHoraPuntual(hora, CONFIG.TOLERANCIA_TARDE, 'tarde');
        } else if (estado === "2" && $els.justificadot.filter(':checked').val() === "no") {
            calcularMinutost();
        }
    }

    // Nueva función para validar hora en estado Puntual
    function validarHoraPuntual(horaInput, tolerancia, turno) {
        if (!horaInput) return;
        
        const [horas, minutos] = horaInput.split(":").map(Number);
        const minutosIngresados = horas * 60 + minutos;
        
        if (minutosIngresados > tolerancia) {
            showAlert('warning', 'Advertencia', 
                     `Has marcado como Puntual pero la hora de entrada (${horaInput}) supera el límite de tolerancia para el turno ${turno}. Considera cambiar a estado "Tardanza" si es necesario.`);
        }
    }

    function calcularMinutos(horaInput, tolerancia) {
        if (!horaInput) return 0;
        
        const [horas, minutos] = horaInput.split(":").map(Number);
        const minutosIngresados = horas * 60 + minutos;
        const diferencia = minutosIngresados - tolerancia;
        
        return diferencia > 0 ? diferencia : 0;
    }

    function calcularMinutosm() {
        const minutos = calcularMinutos($els.hentradam.val(), CONFIG.TOLERANCIA_MANANA);
        $els.mdesm.val(minutos).trigger('input');
    }

    function calcularMinutost() {
        const minutos = calcularMinutos($els.hentradat.val(), CONFIG.TOLERANCIA_TARDE);
        $els.mdest.val(minutos).trigger('input');
    }

    function sumarminutosdesc() {
        const num1 = parseInt($els.mdesm.val()) || 0;
        const num2 = parseInt($els.mdest.val()) || 0;
        $els.totalminutos.val(num1 + num2).trigger('input');
    }

    function calculardecuento() {
        const sueldoMensual = parseFloat($els.sueldo.val()) || 0;
        const totalMinutos = parseInt($els.totalminutos.val()) || 0;
        const gananciaPorMinuto = sueldoMensual / CONFIG.MINUTOS_LABORALES_MES;
        const gananciaTotal = gananciaPorMinuto * totalMinutos;
        
        $els.totaldescuento.val(gananciaTotal.toFixed(2));
    }

    function handleEstadoManana() {
        const valor = $(this).val();
        $els.divjusm.add($els.divcomm).hide();
        $els.mdesm.val(0).trigger('input');

        if (valor === "1") {
            $els.divmdm.show();
            $els.justificadom.prop('checked', false);
            // Validar hora si ya estaba ingresada
            if ($els.hentradam.val()) {
                validarHoraPuntual($els.hentradam.val(), CONFIG.TOLERANCIA_MANANA, 'mañana');
            }
        } else if (valor === "2") {
            $els.divmdm.show();
            $els.divjusm.add($els.divcomm).show();
            $els.justificadom.filter('[value="no"]').prop('checked', true);
            calcularMinutosm();
        } else {
            $els.divmdm.hide();
            $els.justificadom.prop('checked', false);
        }
    }

    function handleEstadoTarde() {
        const valor = $(this).val();
        $els.divjust.add($els.divcomt).hide();
        $els.mdest.val(0).trigger('input');

        if (valor === "1") {
            $els.divmdt.show();
            $els.justificadot.prop('checked', false);
            // Validar hora si ya estaba ingresada
            if ($els.hentradat.val()) {
                validarHoraPuntual($els.hentradat.val(), CONFIG.TOLERANCIA_TARDE, 'tarde');
            }
        } else if (valor === "2") {
            $els.divmdt.show();
            $els.divjust.add($els.divcomt).show();
            $els.justificadot.filter('[value="no"]').prop('checked', true);
            calcularMinutost();
        } else {
            $els.divmdt.hide();
            $els.justificadot.prop('checked', false);
        }
    }

    function handleJustificacionM() {
        if ($(this).val() === "si") {
            $els.mdesm.val(0).trigger('input');
        } else {
            calcularMinutosm();
        }
    }

    function handleJustificacionT() {
        if ($(this).val() === "si") {
            $els.mdest.val(0).trigger('input');
        } else {
            calcularMinutost();
        }
    }

    function validarFormulario(e) {
        let isValid = true;
        const errorMessages = [];

        if (!$('#acodigo').val().trim()) {
            errorMessages.push('Debe completar el DNI');
            isValid = false;
        }

        if (!$('#fechare').val().trim()) {
            errorMessages.push('Debe completar la Fecha');
            isValid = false;
        }

        if (!$els.hentradam.val().trim() && !$els.hentradat.val().trim()) {
            errorMessages.push('Debe ingresar al menos una hora de entrada');
            isValid = false;
        }

        // Validar consistencia entre estado y hora
        if ($els.estadom.val() === "1" && $els.hentradam.val()) {
            const [horas, minutos] = $els.hentradam.val().split(":").map(Number);
            const minutosIngresados = horas * 60 + minutos;
            if (minutosIngresados > CONFIG.TOLERANCIA_MANANA) {
                errorMessages.push('La hora de la mañana supera el límite para estado "Puntual"');
                isValid = false;
            }
        }

        if ($els.estadota.val() === "1" && $els.hentradat.val()) {
            const [horas, minutos] = $els.hentradat.val().split(":").map(Number);
            const minutosIngresados = horas * 60 + minutos;
            if (minutosIngresados > CONFIG.TOLERANCIA_TARDE) {
                errorMessages.push('La hora de la tarde supera el límite para estado "Puntual"');
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();
            showAlert('error', 'Error en el formulario', errorMessages.join('<br>'));
        }

        return isValid;
    }

    function showAlert(icon, title, html) {
        Swal.fire({
            icon,
            title,
            html,
            confirmButtonText: 'Aceptar'
        });
    }

    init();
});
//busqueda de asistencia en la tarjeta
function verificarAsistencia() {
    const codigo = $('#acodigo').val();
    const fecha = $('#fechare').val();

    if (codigo.length > 0 && fecha.length > 0) {  // Verificar que ambos campos tengan datos
        $.ajax({
            url: "proceso/asistenciaman.php?action=busast",
            method: "POST",
            data: { codigo, fecha },
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    // Usuario no registrado en esa fecha
                    $('#btnregistraras').prop('disabled', false);
                    $('#fecha2').text(" No registrado");
                    $('#entradamd, #entradatd, #salidad').text("No registrado");
                } else {
                    // Usuario ya registrado
                    Swal.fire({
                        icon: 'warning',
                        title: 'Persona ya registrada en esta fecha',
                        text: 'Modificaciones en listado de asistencia',
                        confirmButtonText: 'Aceptar'
                    });
                    $('#btnregistraras').prop('disabled', true);
                    $('#fecha2').text(" " + data.fecha);
                    $('#entradamd').text(data.horaim === "00:00:00" ? "No registrado" : data.horaim + " AM");
                    $('#entradatd').text(data.horait === "00:00:00" ? "No registrado" : data.horait + " PM");
                    $('#salidad').text(data.horast === "00:00:00" ? "No registrado" : data.horast + " PM");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en AJAX:", error);
                $('#btnregistraras').prop('disabled', false);
                $('#fecha2, #entradamd, #entradatd, #salidad').text("No registrado");
            }
        });
    } else {
        // Limpiar campos si falta código o fecha
        $('#btnregistraras').prop('disabled', false);
        $('#fecha2, #entradamd, #entradatd, #salidad').text("No registrado");
    }
}

// Eventos para ejecutar la función
$(document)
    .on('input', '#acodigo', verificarAsistencia)
    .on('change input', '#fechare', verificarAsistencia);

// Ejecutar al cargar si hay datos
$(document).ready(function() {
    if ($('#acodigo').val().length > 0 && $('#fechare').val().length > 0) {
        verificarAsistencia();
    }
});

// //busqueda de la persona
$(document).on('keyup', '#acodigo', function () {
    let codigo = $(this).val();
    
    if (codigo.length > 0) {
        $.ajax({
            url: "proceso/asistenciaman.php?action=busp",
            method: "POST",
            data: { codigo: codigo },
            dataType:'json',
            success: function(data) {
                $("#adatos").val(data.nombres + " " + data.apellidos);
                $("#sueldopriv").val(data.sueldo);
               
            },
            error: function () {
                $("#adatos").val(""); 
                $("#sueldopriv").val("");
               
            }
        });
    } else {    
        $("#adatos").val(""); 
    }
});




//filtrar reportes de asistencia
$(document).on('click', '#filtraras', function (e) {
    e.preventDefault();

    var fechai = $('#fechain').val();
    var fechaf = $('#fechafi').val();
    var dnire = $('#dnire').val();

    var fechaInicio = new Date(fechai);
    var fechaFin = new Date(fechaf);

    
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
    

    if (fechaInicio > fechaFin) {
        Swal.fire({
            icon: 'error',
            title: 'Fechas incorrectas',
            text: 'La fecha de inicio no puede ser mayor que la fecha final',
            confirmButtonText: 'Aceptar'
        });
        return; 
    }
    


    $.ajax({
        url: 'proceso/asistenciaman.php?action=readfil',
        type: 'POST',
        dataType: 'json',  
        data: { fechai: fechai, fechaf: fechaf,dnire },
        success: function (data) {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.error,
                    confirmButtonText: 'Aceptar'
                });
                return;
            }

            let table = $('#tasis').DataTable();
            table.clear();
            data.forEach(function (asistencia, index) {
                let minutosTarde = parseInt(asistencia.minutos_descut) || 0;
                let minutosManana = parseInt(asistencia.minutos_descum) || 0;
                let totalMinutos = minutosTarde + minutosManana;

                let minutosdes = totalMinutos === 0 
                    ? "No hay descuento" 
                    : `${totalMinutos} minutos ( ${minutosTarde} Tarde + ${minutosManana} Mañana)`;

                let estado = asistencia.estadot || "No hay registro";

                table.row.add([
                    index + 1,
                    asistencia.dni,
                    asistencia.fecha,
                    asistencia.dia,
                    asistencia.horaim ? `${asistencia.horaim} AM` : "No hay registro",
                    asistencia.estadom || "No hay registro",
                    asistencia.horait ? `${asistencia.horait} PM` : "No hay registro",
                    estado,
                    asistencia.horast ? `${asistencia.horast} PM` : "No hay registro",
                  
                    minutosdes,
                    "S/."+asistencia.descuento_dia,
                    asistencia.comentario || "Sin comentarios"
                ]);
            });

            table.draw(false);
        },
        error: function () {
         
        }
    });
});
//registrar asistencia
$(document).on('click', '#btnregistraras', function (e) {
    e.preventDefault();

    let dni = $('#acodigo').val().trim();
    let fechare = $('#fechare').val().trim();
    let horaim = $('#hentradam').val().trim();
    let horait = $('#hentradat').val().trim();
    let horast = $('#hsalidat').val().trim(); 

    if (dni === "" || fechare === "") {
        Swal.fire({
            title: "Error",
            text: "El DNI y la fecha son obligatorios.",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }

    if (horaim === "" && horait === "") {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar al menos una hora de entrada (mañana o tarde).",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }

    if (horaim !== "") {
        let horaMinimaM = "07:30:00";
        let horaMaximaM = "13:00:00";

        if (horaim < horaMinimaM || horaim > horaMaximaM) {
            Swal.fire({
                title: "Error",
                text: "La hora de entrada en la mañana debe estar entre 07:30 y 13:00.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }
    }

    if (horait !== "") {
        let horaMinimaT = "13:35:00";
        let horaMaximaT = "16:00:00";

        if (horait < horaMinimaT || horait > horaMaximaT) {
            Swal.fire({
                title: "Error",
                text: "La hora de entrada en la tarde debe estar entre 13:35 y 16:00.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }
    }

function normalizarHora(hora) {
    const partes = hora.split(":");
    if (partes.length === 2) {
        return hora + ":00"; 
    }
    return hora;
}

if (horast !== "" && normalizarHora(horast) < "16:30:00") {
    Swal.fire({
        title: "Error",
        text: "La hora de salida debe ser mayor o igual a 16:30.",
        icon: "warning",
        confirmButtonText: "OK"
    });
    return;
}


    $('#btnregistraras').prop('disabled', true);

    let estadom = $('#estadom').val();
    let minutos_descum = $('#mdesm').val();
    let comentariom = $('#comenm').val();
    let estadot = $('#estadota').val();
    let minutos_descut = $('#mdest').val();
    let comentariot = $('#coment').val();
    let totaldes = $('#totaldescuento').val();
     let totalmin = $('#totalminutos').val();

    if (estadom.trim() === "") {  
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'El campo Estado Turno mañana no puede estar vacío',
            confirmButtonText: 'Entendido',
            allowOutsideClick: false
        });
        $('#btnregistraras').prop('disabled', false);
        return;
    }

    $.ajax({
        url: 'proceso/asistenciaman.php?action=create',
        type: 'POST',
        data: {
            dni: dni,
            fechare: fechare,
            horaim: horaim,
            estadom: estadom,
            minutos_descum: minutos_descum,
            comentariom: comentariom,
            horait: horait,
            horast: horast,
            estadot: estadot,
            minutos_descut: minutos_descut,
            comentariot: comentariot,
            totaldes: totaldes,
            totalmin:totalmin
        },
        dataType: 'json',
        success: function (response) {
            $('#btnregistraras').prop('disabled', false); 
            if (response.success) {
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    $('#asistenciaform')[0].reset();
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        },
        error: function (xhr, status, error) {
            $('#btnregistraras').prop('disabled', false); 
            console.error('Error en la solicitud AJAX:', xhr.responseText);
            Swal.fire({
                title: "Error",
                text: "No se pudo registrar la asistencia. Inténtalo de nuevo.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    });
});

$(document).on('click', '#btnLimpiar', function (e) {
    $('#btnregistraras').prop('disabled', false);
});

//verificar segun la asistencia general
$(document).on('click', '.perverificar', function() {
    let id = $(this).data('id'); 

    $("#vistas").fadeOut(200, function () {
        $(this).load("view/reporte_de_asistencia.php", function () {
            $(this).fadeIn(200, function () {
                $('#dnire').val(id);
                setTimeout(function () {
                     $('#filtraras').click();
                }, 200); 
            });
        });
    });
    

});
