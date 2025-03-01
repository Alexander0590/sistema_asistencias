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

//busqueda de la persona
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
//registrar asistencia
$(document).on('click', '#btnregistraras', function (e) {
    e.preventDefault();

    let estado = $('#estado').val();
    //verficar segun el estado
    if (estado === "") {
        alert("Por favor, seleccione una opción.");
    } else if (estado === "1") {

        let dni = $('#acodigo').val();
        let fecha = $('#fecha').val();
        let horaim = $('#hentradam').val();
        let horait = $('#henntradat').val();
        let horast = $('#hsalida').val();
        $.ajax({
                url: 'proceso/asistenciaman.php?action=createtc',
                    type: 'POST',
                    data: {
                        dni:dni,
                        fecha: fecha,
                        horaim: horaim,
                        horait: horait,
                        horast: horast,
                        estado: estado
                    },
                    dataType: 'json', 
                    success: function (response) {
                        if (response.status === 'success') {
                            Swal.fire({
                                title: "¡Registro exitoso!",
                                text: "Tu registro ha sido creada correctamente.",
                                icon: "success",
                                confirmButtonText: "OK"
                            }).then(() => {
                                $('#asistenciaform')[0].reset(); 
                            });
                        } else {
                            alert('Error: ' + response.message);
                        }
                    },
                    error: function (error) {
                        console.error('Error en la solicitud AJAX:', error);
                        alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
                    }
                });
        
    } else if (estado === "2") {
    
    } else if (estado === "3") {
        
        let dni = $('#acodigo').val();
        let fecha = $('#fecha').val();
        let horaim = $('#hentradam').val();
        let horait = $('#henntradat').val();
        let horast = $('#hsalida').val();
        $.ajax({
                url: 'proceso/asistenciaman.php?action=createpu',
                    type: 'POST',
                    data: {
                        dni:dni,
                        fecha: fecha,
                        horaim: horaim,
                        horait: horait,
                        horast: horast,
                        estado: estado
                    },
                    dataType: 'json', 
                    success: function (response) {
                        if (response.status === 'success') {
                            Swal.fire({
                                title: "¡Registro exitoso!",
                                text: "Tu registro ha sido creada correctamente.",
                                icon: "success",
                                confirmButtonText: "OK"
                            }).then(() => {
                                $('#asistenciaform')[0].reset(); 
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: response.message,
                                confirmButtonText: 'Aceptar'
                            });
                            $('#asistenciaform')[0].reset(); 
                        }
                    },
                    error: function (error) {
                        console.error('Error en la solicitud AJAX:', error);
                        alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
                    }
                });
        
    }

});