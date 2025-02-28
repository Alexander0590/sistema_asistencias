
//USUARIOS
    //registrar un usuario 
    $(document).on('click', '#btreusu', function (e) {
        e.preventDefault();
        let dni = $('#dniusu').val();
        let datos = $('#datosu').val();
        let usuario = $('#nomusuario').val();
        let password = $('#pass').val();
        let email = $('#correo').val();
        let telefono = $('#telef').val();
        let rol = $('#rol').val();
        
    if (!dni ||!datos || !usuario || !password || !email || !telefono || !rol) {
        alert('Por favor, completa todos los campos del formulario.');
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
            url: 'proceso/mantenusuario.php?action=create',
            type: 'POST',
            data: {
                dni:dni,
                datos: datos,
                usuario: usuario,
                password: password,
                email: email,
                telefono: telefono,
                rol: rol
            },
            dataType: 'json', 
            success: function (response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: "¡Registro exitoso!",
                        text: "Tu cuenta ha sido creada correctamente.",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => {
                        $('#usuarioform')[0].reset(); 
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
    });

//elinminar usuario
$(document).off('click', '.usuEliminar').on('click', '.usuEliminar', function (event) {
    event.preventDefault();
    let id = $(this).data('id');
    $.ajax({
        url: 'proceso/mantenusuario.php?action=delete&id=' + id,
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
                            $(this).load("view/listadeusuarios.php", function () {
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
//traer datos al formulario
$(document).on('click', '.usuEditar', function () {
    let id = $(this).data('id'); 
    $("#vistas").fadeOut(200, function () {
        $(this).load("view/usuario.php", function () {
            $(this).fadeIn(200); 
            $.ajax({
                url: 'proceso/mantenusuario.php?action=readOne', 
                type: 'GET',
                data: { id: id },
                dataType: 'json',
                success: function (data) {
                    if ($('#usuarioform').length) {
                        $('#viejo_dni').val(data.idusudni);
                        $('#dniusu').val(data.idusudni);
                        $('#datosu').val(data.datos);
                        $('#nomusuario').val(data.usuario);
                        $('#pass').val(data.password);
                        $('#correo').val(data.email);
                        $('#rol').val(data.rol);
                        $('#telef').val(data.Telefono);

                        $('#btnLimpiar').hide();
                        $('#btreusu').hide();
                        $('#btacusu').show();
                    } else {
                        console.error("No se encontró el formulario en usuario.php");
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            });
        });
    });
});



// ACTUALIZAR USUARIO
$(document).on('click', '#btacusu', function () {
    let dniviejo = $('#viejo_dni').val();
    let dniusu = $('#dniusu').val();
    let datos = $('#datosu').val();
    let usuario = $('#nomusuario').val();
    let pass = $('#pass').val();
    let email = $('#correo').val();
    let rol = $('#rol').val();
    let telefono = $('#telef').val();

    $.ajax({
        url: 'proceso/mantenusuario.php?action=update',
        type: 'POST',
        data: {
            dnivie: dniviejo,
            dniusu: dniusu,
            datos: datos,
            usuario: usuario,
            pass: pass,
            email: email,
            telefono: telefono,
            rol: rol
        },
        success: function (response) {
            let result = JSON.parse(response);

            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Usuario actualizado correctamente',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    $('#usuarioform')[0].reset();
                    $('#btreusu').show();
                    $('#btacusu').hide();

                    $("#vistas").fadeOut(200, function () {
                        $(this).load("view/listadeusuarios.php", function () {
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
        error: function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al intentar actualizar el usuario. Por favor, inténtalo de nuevo.',
                confirmButtonText: 'Aceptar'
            });
            console.error('Error al actualizar usuario:', error);
        }
    });
});



    