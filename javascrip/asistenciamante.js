
//formulario dinamico
$(document).on('change', '#estado', function () {
    if ($(this).val() === "2") {
        $("#divturno").show();
        $("#divsalida").hide();
        $("#btnregistraras").hide();
        $("#btnregistrartds").show();
        $("#diventradam").hide();
        $("#diventrat").hide();
        $("#divjustificado").show();
        $("#divturno2").hide();
    }else if($(this).val() === "3") {
        $("#divturno").hide();
        $("#divturno2").show();
        $("#divjustificado").hide();
        $("#btnregistraras").show();
        $("#btnregistrartds").hide();
        $("#diventradam").show();
        $("#divmdes").hide();
        $("#divcomen").hide();
    }else if($(this).val() === "1"){
    
    }else{
        $("#turno").val('');
        $("#turno2").val('');
        $("#divturno").hide();
        $("#divsalida").show();
        $("#btnregistraras").show();
        $("#btnregistrartds").hide();
        $("#divjustificado").hide();
        $("#diventradam").show();
        $("#diventrat").show();
        $("#justsi, #justno").prop('checked', false);
        $("#divmdes").hide();
        $("#divcomen").hide();
        $("#divturno2").hide();
    }
   
});
$(document).on('change', '#turno', function () {
    if ($(this).val() === "1") {
        $("#diventradam").show();
        $("#diventrat").hide();

    }else if($(this).val() === "2"){
        $("#diventrat").show();
        $("#diventradam").hide();
    }else{
        $("#diventrat").hide();
        $("#diventradam").hide();
        $("#justsi, #justno").prop('checked', false);
        $("#divmdes").hide();
        $("#divcomen").hide();
    }
});
$(document).on('change', '#turno2', function () {
    if ($(this).val() === "1") {
        $("#diventradam").show();
        $("#diventrat").hide();
        $("#divsalida").hide();
    }else if($(this).val() === "2"){
        $("#diventrat").show();
        $("#diventradam").hide();
        $("#divsalida").show();
    }else if($(this).val() === "3"){
        $("#diventradam").show();
        $("#diventrat").show();
        $("#divsalida").show();
    }else{
        $("#diventrat").hide();
        $("#diventradam").hide();
        $("#justsi, #justno").prop('checked', false);
        $("#divmdes").hide();
        $("#divcomen").hide();
    }
});

$(document).on('change', 'input[name=justificado]', function () {
    if ($(this).val() === "si") {
        $("#divmdes").hide();
        $("#divcomen").show();
    }else if($(this).val() === "no"){
        $("#divmdes").show();
        $("#divcomen").hide();
    }else{
        $("#divmdes").hide();
        $("#divcomen").hide();
    }
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
        Swal.fire({
            title: "¡Error!",
            text: "Por favor, seleccione una opción.",
            icon: "error",
            confirmButtonText: "OK"
        });
    } else if (estado === "1") {

   /*      let dni = $('#acodigo').val();
        let fecha = $('#fecha').val();
        let horaim = $('#hentradam').val();
        let horait = $('#henntradat').val();
        let horast = $('#hsalida').val();

        if (!dni || !fecha ||!horaim || !horait || !horast) {
            Swal.fire({
                title: "¡Error!",
                text: "Por favor, completa todos los campos del formulario ",
                icon: "error",
                confirmButtonText: "OK"
            });
            return; 
        }
        if (!/^\d{8}$/.test(dni)) {
            Swal.fire({
                title: "¡Error!",
                text: "El DNI debe contener exactamente 8 dígitos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
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
                }); */
        
    } else if (estado === "3") {
        
     let turno=$('#turno2').val();
      
     if(turno=="1"){
        let dni = $('#acodigo').val();
        let fecha = $('#fecha').val();
        let horaim = $('#hentradam').val();
        if (!dni || !fecha ||!horaim ) {
            Swal.fire({
                title: "¡Error!",
                text: "Por favor, completa todos los campos del formulario ",
                icon: "error",
                confirmButtonText: "OK"
            });
            return; 
        }
        if (!/^\d{8}$/.test(dni)) {
            Swal.fire({
                title: "¡Error!",
                text: "El DNI debe contener exactamente 8 dígitos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
        $.ajax({
                url: 'proceso/asistenciaman.php?action=createpu',
                    type: 'POST',
                    data: {
                        dni:dni,
                        fecha: fecha,
                        estado:estado,
                        turno:turno,
                        horaim: horaim
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
     }else if(turno=="2"){
        let dni = $('#acodigo').val();
        let fecha = $('#fecha').val();
        let horait = $('#henntradat').val();
        let horast = $('#hsalida').val();
        if (!dni || !fecha ||!horait ) {
            Swal.fire({
                title: "¡Error!",
                text: "Por favor, completa todos los campos del formulario ",
                icon: "error",
                confirmButtonText: "OK"
            });
            return; 
        }
        if (!/^\d{8}$/.test(dni)) {
            Swal.fire({
                title: "¡Error!",
                text: "El DNI debe contener exactamente 8 dígitos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
        $.ajax({
                url: 'proceso/asistenciaman.php?action=createpu',
                    type: 'POST',
                    data: {
                        dni:dni,
                        fecha: fecha,
                        turno:turno,
                        estado:estado,
                        horast: horast,
                        horait: horait
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
     }else if(turno=="3"){
        let dni = $('#acodigo').val();
        let fecha = $('#fecha').val();
        let horaim = $('#hentradam').val();
        let horait = $('#henntradat').val();
        let horast = $('#hsalida').val();

        if (!dni || !fecha ||!horaim || !horait || !horast) {
            Swal.fire({
                title: "¡Error!",
                text: "Por favor, completa todos los campos del formulario ",
                icon: "error",
                confirmButtonText: "OK"
            });
            return; 
        }
        if (!/^\d{8}$/.test(dni)) {
            Swal.fire({
                title: "¡Error!",
                text: "El DNI debe contener exactamente 8 dígitos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
        $.ajax({
                url: 'proceso/asistenciaman.php?action=createpu',
                    type: 'POST',
                    data: {
                        dni:dni,
                        fecha: fecha,
                        turno:turno,
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
     }else{

     }



      
        
    }

});
$(document).on('click', '#btnregistrartds', function (e) {

    let turno=$('#turno').val();
    if(turno==="1"){
        let dni = $('#acodigo').val();
        let estado = $('#estado').val();
        let fecha = $('#fecha').val();
        let horaim = $('#hentradam').val();
        let comentario=$('#comen').val();

        if (!dni || !fecha ||!horaim || !comentario) {
            Swal.fire({
                title: "¡Error!",
                text: "Por favor, completa todos los campos del formulario ",
                icon: "error",
                confirmButtonText: "OK"
            });
            return; 
        }
        if (!/^\d{8}$/.test(dni)) {
            Swal.fire({
                title: "¡Error!",
                text: "El DNI debe contener exactamente 8 dígitos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
        $.ajax({
                url: 'proceso/asistenciaman.php?action=createtar',
                    type: 'POST',
                    data: {
                        dni:dni,
                        fecha: fecha,
                        turno:turno,
                        horaim: horaim,
                        estado: estado,
                        comentario:comentario
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
        

       

    }else if(turno==="2"){
        let dni = $('#acodigo').val();
        let estado = $('#estado').val();
        let fecha = $('#fecha').val();
        let horait = $('#henntradat').val();
        let comentario=$('#comen').val();

        if (!dni || !fecha ||!horait || !comentario) {
            Swal.fire({
                title: "¡Error!",
                text: "Por favor, completa todos los campos del formulario ",
                icon: "error",
                confirmButtonText: "OK"
            });
            return; 
        }
        if (!/^\d{8}$/.test(dni)) {
            Swal.fire({
                title: "¡Error!",
                text: "El DNI debe contener exactamente 8 dígitos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
        $.ajax({
                url: 'proceso/asistenciaman.php?action=createtar',
                    type: 'POST',
                    data: {
                        dni:dni,
                        fecha: fecha,
                        turno:turno,
                        horait: horait,
                        estado: estado,
                        comentario:comentario
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