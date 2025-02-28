//busqueda de personal
$(document).on('input', '#acodigo', function () {
    let codigo = $(this).val();
    
    if (codigo.length > 0) {
        $.ajax({
            url: "proceso/asistenciaman.php?action=busper",
            method: "POST",
            data: { codigo: codigo },
            dataType:'json',
            success: function(data) {
                $("#adatos").val(data.nombres + " " + data.apellidos);
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
        $("#adatos").val(""); 
    }
});
