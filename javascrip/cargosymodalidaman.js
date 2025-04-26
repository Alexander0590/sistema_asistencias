
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