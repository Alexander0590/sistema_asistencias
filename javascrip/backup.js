$(document).ready(function() {
$("#copia").click(function (e) {
e.preventDefault(); 
Swal.fire({
    title: "¿Desea proceder con la copia de seguridad de la Base de Datos?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No"
}).then((result) => {
    if (result.isConfirmed) {
                $.ajax({
                    url: 'proceso/backup.php?action=base', 
                    type: 'POST',
                    success: function(response) {
                        
                        Swal.fire({
                            icon: 'success',
                            title: 'Realizado',
                            text: response,
                            showCancelButton: true,
                            confirmButtonText: 'Aceptar',
                            cancelButtonText: 'Abrir carpeta'
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.cancel) {
                                    $.ajax({
                                        url: 'proceso/abrir_carpeta.php?action=base',
                                        type: 'POST'
                                    });
                            }
                        });
        
                    },
                    error: function(error) {
                        alert('Error al realizar la copia de seguridad: ' + error);
                    }
                });
         
            }
        });
    });
});

