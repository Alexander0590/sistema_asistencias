
//eliminar cargo
$(document).off('click', '.cargoEliminar').on('click', '.cargoEliminar', function (event) {
    event.preventDefault();
    let id = $(this).data('id');
    $.ajax({
        url: 'proceso/mantecargosymodalidad.php?action=delete&id=' + id,
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
                            $(this).load("view/lista_cargos.php", function () {
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
//editar cargos
$(document).on('click', '.cargoEditar', function () {
    let id = $(this).data('id'); 

    $.ajax({
        url: 'proceso/mantecargosymodalidad.php?action=readOne', 
        type: 'GET',
        data: { id: id },
        dataType: 'json',
        success: function (data) {
            $('#idcargo').val(data.idcargo);
            $('#nombreCargo').val(data.nombre);
            $('#descripcionCargo').val(data.descripcion);
            $('#estadocargo').val(data.estado);

            
            $('#modalNuevoCargo2').modal('show');
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    });
});


//editar modalidad
$(document).on('click', '.modaliEditar', function () {
    let id = $(this).data('id'); 

    $.ajax({
        url: 'proceso/mantecargosymodalidad.php?action=readOne2', 
        type: 'GET',
        data: { id: id },
        dataType: 'json',
        success: function (data) {
            $('#idmodali').val(data.idmodalidad);
            $('#nombreModalidad').val(data.nombrem);
            $('#descripcionModalidad').val(data.descripcion);
            $('#estadomodali').val(data.estado);

           
            $('#modalnuemodali2').modal('show');
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    });
});

// ACTUALIZAR cargos
$(document).off('click', '#btnactualicam').on('click', '#btnactualicam', function () {
    let idc = $('#idcargo').val();
    let nombre = $('#nombreCargo').val();
    let descripcion = $('#descripcionCargo').val();
    let estado = $('#estadocargo').val();

    if (!nombre) {
        Swal.fire({
            title: "¡Error!",
            text: "Por favor, completa el nombre del cargo",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    $.ajax({
        url: 'proceso/mantecargosymodalidad.php?action=update',
        type: 'POST',
        data: { idc, nombre, descripcion, estado },
        success: function (response) {
            let result = JSON.parse(response);

            if (result.status === "success") {
                $('#modalNuevoCargo2').modal('hide');
                $("#vistas").fadeOut(200, function () {
                    $(this).load("view/lista_cargos.php", function () {
                        $(this).fadeIn(200);
                    });
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado',
                    text: 'Registro actualizado correctamente',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message || 'Hubo un error al actualizar el cargo',
                    confirmButtonText: 'Aceptar'
                });
            }
        },
        error: function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al intentar actualizar el cargo. Por favor, inténtalo de nuevo.',
                confirmButtonText: 'Aceptar'
            });
            console.error('Error al actualizar cargo:', error);
        }
    });
});

// ACTUALIZAR modalidad de contratacion
$(document).off('click', '#btnactumodalidad').on('click', '#btnactumodalidad', function () {
    let idm = $('#idmodali').val();
    let nombre = $('#nombreModalidad').val();
    let descripcion = $('#descripcionModalidad').val();
    let estado = $('#estadomodali').val();

    if (!nombre) {
        Swal.fire({
            title: "¡Error!",
            text: "Por favor, completa el nombre de la modalidad",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    $.ajax({
        url: 'proceso/mantecargosymodalidad.php?action=update2',
        type: 'POST',
        data: { idm, nombre, descripcion, estado },
        success: function (response) {
            let result = JSON.parse(response);

            if (result.status === "success") {
                $('#modalnuemodali2').modal('hide');
                $("#vistas").fadeOut(200, function () {
                    $(this).load("view/lista_modalidad.php", function () {
                        $(this).fadeIn(200);
                    });
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado',
                    text: 'Registro actualizado correctamente',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message || 'Hubo un error al actualizar la modalidad',
                    confirmButtonText: 'Aceptar'
                });
            }
        },
        error: function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al intentar actualizar la modalidad. Por favor, inténtalo de nuevo.',
                confirmButtonText: 'Aceptar'
            });
            console.error('Error al actualizar modalidad:', error);
        }
    });
});


//eliminar modalidad
$(document).off('click', '.modaliEliminar').on('click', '.modaliEliminar', function (event) {
    event.preventDefault();
    let id = $(this).data('id');
    $.ajax({
        url: 'proceso/mantecargosymodalidad.php?action=delete2&id=' + id,
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
                            $(this).load("view/lista_modalidad.php", function () {
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