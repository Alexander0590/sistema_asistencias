
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
               
            },
            error: function () {
                $("#adatos").val(""); 
               
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
                    asistencia.horasm ? `${asistencia.horasm} AM` : "No hay registro",
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

