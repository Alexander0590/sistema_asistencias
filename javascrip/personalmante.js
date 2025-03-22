//Personal

    //registrar un personal 
    $(document).on('click', '#btreper', function (e) {
        e.preventDefault();

        let dni = $('#pdni').val();
        let nombres = $('#pnombre').val();
        let apellidos= $('#pape').val();
        let modalidad = $('#pmodalidad').val();
        let cargo = $('#pcargo').val();
        let fechanaci = $('#pfechanaci').val();
        let sueldo = $('#psuel').val();
        let fotoInput = $('#pfoto')[0]; 
    
        if (!dni || !nombres ||!apellidos || !modalidad || !cargo || !fechanaci ||!sueldo || !fotoInput.files[0]) {
            Swal.fire({
                title: "¡Error!",
                text: "Por favor, completa todos los campos del formulario y selecciona una foto.",
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

        
        let fotoFile = fotoInput.files[0]; 
        let reader = new FileReader(); 
    
        reader.onload = function (event) {
            let fotoBase64 = event.target.result; 
            let datos = {
                dni: dni,
                nombres: nombres,
                apellidos: apellidos,
                modalidad: modalidad,
                cargo: cargo,
                fechanaci: fechanaci,
                sueldo: sueldo,
                foto: fotoBase64,
            };
            $.ajax({
                url: 'proceso/mantenpersonal.php?action=create', 
                type: 'POST',
                data: datos, 
                dataType: 'json', 
                success: function (response) {
                    if (response.status === 'success') {
                        Swal.fire({
                            title: "¡Registro exitoso!",
                            text: "Tu registro ha sido creado correctamente.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            Swal.fire({
                                title: "¿Desea proceder con la impresión del carnet?",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Sí, imprimir",
                                cancelButtonText: "No, cancelar"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $.ajax({
                                        url: 'carnet/generarcarnet.php', 
                                        type: 'GET',
                                        data: { id: dni}, 
                                        xhrFields: {
                                            responseType: 'blob' 
                                        },
                                        success: function () {
                                            Swal.fire({
                                                title: "¡Guardado!",
                                                text: "Tu carnet ha sido generado y guardado correctamente.",
                                                icon: "success",
                                                confirmButtonText: "OK",
                                            }).then(() => {
                                               
                                                $('#personalform')[0].reset();
                                            });
                                        },
                                        error: function (error) {
                                            console.error("Error al generar el carnet:", error);
                                        }
                                    });
                                }else{
                                    $('#personalform')[0].reset();
                                }
                            });
                              
                        });
                        
                        
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message,
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                error: function (error) {
                    console.error('Error en la solicitud AJAX:', error);
                   
                }
            });
        };
        reader.readAsDataURL(fotoFile);
    });


//elinminar personal
$(document).off('click', '.perEliminar').on('click', '.perEliminar', function (event) {
    event.preventDefault();
    let id = $(this).data('id');
    
    $.ajax({
        url: 'proceso/mantenpersonal.php?action=delete&id=' + id,
        type: 'GET',
        success: function () {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "No podrás revertir esta acción.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "No, cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "Tu registro ha sido eliminado correctamente.",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => {
                        $("#vistas").fadeOut(200, function () {
                            $(this).load("view/listadepersonal.php", function () {
                                $(this).fadeIn(200);
                            });
                        });
                    });
                }
            });
            
        },
        error: function (error) {
            console.error('Error al eliminar usuario:', error);
            alert('Error al eliminar usuario. Por favor, inténtalo de nuevo.');
        }
    });
});

//traer datos al formulario personal
$(document).on('click', '.perEditar', function () {
    let id = $(this).data('id'); 
    $("#vistas").fadeOut(200, function () {
        $(this).load("view/personal.php", function () {
            $(this).fadeIn(200); 
            $.ajax({
                url: 'proceso/mantenpersonal.php?action=readOne', 
                type: 'GET',
                data: { id: id },
                dataType: 'json',
                success: function (data) {
                    if ($('#personalform').length) {
                        $('#viejo_dni').val(data.dni);
                        $('#pdni').val(data.dni); 
                        $('#pnombre').val(data.nombres);
                        $('#pape').val(data.apellidos);

                        let modalidadnu;
                        if (data.modalidad_contratacion === "D.L N°276 - Carrera Administrativa") {
                            modalidadnu = 1;
                        } else if (data.modalidad_contratacion === "D.L N°728 - Obrero") {
                            modalidadnu = 2;
                        }
                        $('#pmodalidad').val(modalidadnu);
                        let estado;
                        if (data.estado === "activo") {
                            estado = 1;
                        } else if (data.estado === "inactivo") {
                            estado = 2;
                        }

                        $('#pestado').val(estado);

                        if ($('#pestado').prop('disabled')) {
                            $('#pestado').prop('disabled', false);
                        }

                        $('#btreper').hide();  
                        $('#btnLimper').hide(); 
                        $('#ocfoto').hide();  
                        $('#btacuper').show();
                        $('#pcargo').val(data.idcargo); 
                        $('#pfechanaci').val(data.fecha_nacimiento); 
                        $('#psuel').val(data.sueldo); 
                        if (data.foto) {
                            $('#pfotoBase64').val(data.foto);
                            $('#fotoper').attr('src',  data.foto); 
                            $('#btnfotoper').prop('disabled', false);
                            
                        } 
                    } else {
                        console.error("No se encontró el formulario ");
                    }
                },
                error: function (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            });
        });
    });
});


// ACTUALIZAR PERSONAL
$(document).on('click', '#btacuper', function () { 
    let dniviejo= $('#viejo_dni').val();
    let dni = $('#pdni').val();
    let nombres = $('#pnombre').val();
    let apellidos = $('#pape').val();
    let modalidad = $('#pmodalidad').val();
    let cargo = $('#pcargo').val();
    let fecha_nacimiento = $('#pfechanaci').val();
    let sueldo = $('#psuel').val();
    let estado = $('#pestado').val();

    let fotoInput = $('#pfoto')[0]; 
    let foto;
    
    if (fotoInput.files.length > 0) {
        let archivo = fotoInput.files[0]; 
        let lector = new FileReader(); 
    
        lector.onload = function(event) {
            foto = event.target.result.split(',')[1];  
            
        };
    
        lector.readAsDataURL(archivo); 
    } else {
        foto = $('#pfotoBase64').val();
        
    }
    

    $.ajax({
        url: 'proceso/mantenpersonal.php?action=update',
        type: 'POST',
        data: {
            dnivie:dniviejo,
            dni: dni,
            nombres: nombres,
            apellidos: apellidos,
            modalidad: modalidad,
            cargo: cargo,
            fecha_nacimiento: fecha_nacimiento,
            sueldo: sueldo,
            foto : foto,
            estado : estado
        },
       success: function (response) {
            let result = JSON.parse(response);

            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Personal actualizado correctamente',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    $('#personalform')[0].reset();
                    $('#btreper').show();  
                    $('#btacuper').hide();
        

                    $("#vistas").fadeOut(200, function () {
                        $(this).load("view/listadepersonal.php", function () {
                            $(this).fadeIn(200);
                        });
                    });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message || 'Hubo un error al actualizar el usuario',
                    confirmButtonText: 'Aceptar'
                });
            }
        },
    });
});


//imprimir el carnet
$(document).on('click', '.perImpri', function () {
    let id = $(this).data('id'); 
    Swal.fire({
        title: "¿Desea proceder con la impresión del carnet?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'carnet/generarcarnet.php', 
                type: 'GET',
                data: { id: id}, 
                xhrFields: {
                    responseType: 'blob' 
                },
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Guardado!',
                        text:"Tu carnet ha sido generado y guardado correctamente",
                        showCancelButton: true,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Abrir carpeta'
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.cancel) {
                                $.ajax({
                                    url: 'proceso/abrir_carpeta.php?action=carnet',
                                    type: 'POST'
                                });
                           
                        }
                        
                    });

                },
                error: function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo generar el PDF'
                    });
                }
                
            });  
             
                }
            });

});
