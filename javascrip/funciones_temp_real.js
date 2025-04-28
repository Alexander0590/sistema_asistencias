$(document).ready(function() {
    function actualizarVacaciones() {
        $.ajax({
            url: 'proceso/mantenimievacacione.php?action=updateatodos',
            type: 'POST',
            success: function(response) {
                response = response.trim(); 
            
                if (response === 'No hay registros de vacaciones vencidas.') {

                } else {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Actualización completada!',
                        text: response,
                        timer: 3000,
                        showConfirmButton: false
                    });
                }
            },
            error: function(error) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'No se pudo actualizar las vacaciones. Intenta más tarde.',
                    footer: error,
                    timer: 4000,
                    showConfirmButton: false
                });
            }
        });
    }

    // Ejecutarlo inmediatamente
    actualizarVacaciones();

    // Repetir cada 24 horas
    setInterval(actualizarVacaciones, 86400000);
});
