
//registro manualmente
$(document).ready(function() {
    // Asegurar que calculardecuento() se actualice SIEMPRE
    $('#sueldo, #totalminutos, #mdesm, #mdest').on('input', calculardecuento);

    // Función para calcular minutos de la mañana
    function calcularMinutosm() {
        let horaTolerancia = 8 * 60 + 16;
        let inputHora = $("#hentradam").val();

        if (!inputHora) {
            $("#mdesm").val("");
            return;
        }

        let [horas, minutos] = inputHora.split(":").map(Number);
        let minutosIngresados = horas * 60 + minutos;
        let diferencia = minutosIngresados - horaTolerancia;

        $("#mdesm").val(diferencia > 0 ? diferencia : 0).trigger('input');
    }

// Función para validar el formulario
function validarFormulario() {
    let dni = $('#acodigo').val().trim();
    let fechare = $('#fechare').val().trim();
    let horaim = $('#hentradam').val().trim();
    let horait = $('#hentradat').val().trim();

    if (dni === "" || fechare === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Debe completar el DNI y la Fecha.',
            confirmButtonText: 'Aceptar'
        });
        return false;
    }


    if (horaim === "" && horait === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Falta hora de entrada',
            text: 'Debe ingresar al menos una hora de entrada (mañana o tarde).',
            confirmButtonText: 'Aceptar'
        });
        return false;
    }

    return true;
}


// Función para calcular minutos de la tarde
    function calcularMinutost() {
        let horaTolerancia = 14 * 60 + 11;
        let inputHora = $("#hentradat").val();

        if (!inputHora) {
            $("#mdest").val("");
            return;
        }

        let [horas, minutos] = inputHora.split(":").map(Number);
        let minutosIngresados = horas * 60 + minutos;
        let diferencia = minutosIngresados - horaTolerancia;

        $("#mdest").val(diferencia > 0 ? diferencia : 0).trigger('input');
    }

    // Función para sumar minutos descontados
    function sumarminutosdesc() {
        let num1 = parseInt($('#mdesm').val()) || 0;
        let num2 = parseInt($('#mdest').val()) || 0;
        $('#totalminutos').val(num1 + num2).trigger('input');
    }

    // Función para calcular el descuento
    function calculardecuento() {
        let sueldoSemanal = parseFloat($('#sueldopriv').val()) || 0;
        let gananciaPorMinuto = sueldoSemanal / 2400;
        let totalMinutos = parseInt($('#totalminutos').val()) || 0;
        let gananciaTotal = gananciaPorMinuto * totalMinutos;
        $('#totaldescuento').val(gananciaTotal.toFixed(2));
    }

    // Ocultar opciones innecesarias en estadom y estadota
    $("#estadom option[value='3'], #estadom option[value='4']").prop("hidden", true);
    $("#estadota option[value='3'], #estadota option[value='4']").prop("hidden", true);

    // Resetear valores generales
    $("#divjusm, #divcomm, #divjust, #divcomt").hide();
    $("#estadom, #estadota").val("");
    $('#mdesm, #mdest, #totaldescuento, #totalminutos').val("");

    // Mostrar divisiones iniciales
    $("#divt, #divm").show();

    // Manejo de estado en la mañana
    $("#estadom").on("change", function() {
        let valor4 = $(this).val();

        if (valor4 === "1") {
            $('#divmdm').show();
            $('#mdesm').val(0).trigger('input');
            $('input[name="justificadom"]').prop('checked', false);
            $("#divjusm, #divcomm").hide();
        } else if (valor4 === "2") {
            $('#divmdm').show();
            $("#divjusm, #divcomm").show();
            $('#mdesm').val("").trigger('input');

            $('input[name="justificadom"]').off('change').on('change', function() {
                if ($(this).val() === "si") {
                    $('#mdesm').val(0).trigger('input');
                } else if ($(this).val() === "no") {
                    $("#hentradam").off('input').on("input", calcularMinutosm);
                    calcularMinutosm();
                    $('#mdesm, #mdest').off('input').on('input', sumarminutosdesc);
                    sumarminutosdesc();
                }
            });
        } else {
            $('#divmdm, #divjusm, #divcomm').hide();
            $('#mdesm, #totaldescuento, #totalminutos').val("").trigger('input');
            $('input[name="justificadom"]').prop('checked', false);
        }
        calculardecuento();
    });

    // Manejo de estado en la tarde
    $("#estadota").on("change", function() {
        let valor5 = $(this).val();

        if (valor5 === "1") {
            $('#divmdt').show();
            $('#mdest').val(0).trigger('input');
            $("#divjust, #divcomt").hide();
            $('input[name="justificadot"]').prop('checked', false);
        } else if (valor5 === "2") {
            $('#divmdt').show();
            $("#divjust, #divcomt").show();
            $('#mdest').val("").trigger('input');

            $('input[name="justificadot"]').off('change').on('change', function() {
                if ($(this).val() === "si") {
                    $('#mdest').val(0).trigger('input');
                } else if ($(this).val() === "no") {
                    $("#hentradat").off('input').on("input", calcularMinutost);
                    calcularMinutost();
                    $('#mdesm, #mdest').off('input').on('input', sumarminutosdesc);
                    sumarminutosdesc();
                }
            });
        } else {
            $('#divmdt, #divjust, #divcomt').hide();
            $('#mdest').val("").trigger('input');
            $('input[name="justificadot"]').prop('checked', false);
        }
        calculardecuento();
    });
});


       
//busqueda de asistencia en la tarjeta
$(document).on('input', '#acodigo', function () {
    let codigo = $(this).val();
    
    if (codigo.length > 0) {
        $.ajax({
            url: "proceso/asistenciaman.php?action=busast",
            method: "POST",
            data: { codigo: codigo },
            dataType:'json',
            success: function(data) {
                document.getElementById("fecha2").innerText = " " + String(data.fecha);

                document.getElementById("entradamd").innerText = 
                    data.horaim === "00:00:00" ? "No registrado" : String(data.horaim + " AM");
                
                document.getElementById("entradatd").innerText = 
                    data.horait === "00:00:00" ? "No registrado" : String(data.horait + " PM");
                
                document.getElementById("salidad").innerText = 
                    data.horast === "00:00:00" ? "No registrado" : String(data.horast + " PM");
            },
            error: function () {
                $("#adatos").val(""); 
                document.getElementById("fecha2").innerText = String(" No registrado");   
                document.getElementById("entradamd").innerText = String("No registrado");
                document.getElementById("entradatd").innerText =String("No registrado");
                document.getElementById("salidad").innerText = String("No registrado");
            }
        });
    } else {    
    }
});

// //busqueda de la persona
$(document).on('input', '#acodigo', function () {
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
                    asistencia.horasm ? `${asistencia.horasm} PM` : "No hay registro",
                    asistencia.estadom || "No hay registro",
                    asistencia.horait ? `${asistencia.horait} PM` : "No hay registro",
                    asistencia.horast ? `${asistencia.horast} PM` : "No hay registro",
                    estado,
                    minutosdes,
                    asistencia.comentario || "Sin comentarios"
                ]);
            });

            table.draw(false);
        },
        error: function () {
         
        }
    });
});

$(document).on('click', '#btnregistraras', function (e) {
    e.preventDefault(); 

    let dni = $('#acodigo').val().trim();
    let fechare = $('#fechare').val().trim();
    let horaim = $('#hentradam').val().trim();
    let horait = $('#hentradat').val().trim();
    
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

   
    let horasm = $('#hsalidam').val();
    let estadom = $('#estadom').val();
    let minutos_descum = $('#mdesm').val();
    let comentariom = $('#comenm').val();
    let horast = $('#hsalidat').val();
    let estadot = $('#estadota').val();
    let minutos_descut = $('#mdest').val();
    let comentariot = $('#coment').val();
    // let totalminudes = $('#totalminutos').val();
    let totaldes = $('#totaldescuento').val();

    $.ajax({
        url: 'proceso/asistenciaman.php?action=create',
        type: 'POST',
        data: {
            dni: dni,
            fechare: fechare,
            horaim: horaim,
            horasm: horasm,
            estadom: estadom,
            minutos_descum: minutos_descum,
            comentariom: comentariom,
            horait: horait,
            horast: horast,
            estadot: estadot,
            minutos_descut: minutos_descut,
            comentariot: comentariot,
            // totalminudes: totalminudes,
            totaldes: totaldes
        },
        dataType: 'json',
        success: function (response) {
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
