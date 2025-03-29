
window.onload = function() {
    let caja = document.getElementById('adni');
    caja.focus();

    // Mantener el foco
    caja.addEventListener('blur', function() {
        setTimeout(() => caja.focus(), 0);
    });

   
};
function actualizarFechaHora() {
    const fechaElemento = document.getElementById('fecha');
    const horaElemento = document.getElementById('hora');
    const mensajeElemento = document.getElementById('mensaje');
    const mensajeElemento2 = document.getElementById('mensaje2');
    const turnoActualElemento = document.getElementById('turno-actual');
    
    const ahora = new Date();
    
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();
    
    // Formatear la fecha
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dia = { weekday: 'long' };
    const fechaFormateada2 = ahora.toLocaleDateString('es-ES', dia);
    
    const fechaFormateada = ahora.toLocaleDateString('es-ES', opcionesFecha);
    fechaElemento.innerHTML = `<strong>${fechaFormateada}</strong>`;
    
    // Formatear la hora
    const horaFormateada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    horaElemento.textContent = horaFormateada;
    
    // Definir los horarios de los turnos
    const inicioTurno1 = new Date(ahora);
    inicioTurno1.setHours(7, 0, 0, 0); // 7:00 AM
    
    const cierreTurno1 = new Date(ahora);
    cierreTurno1.setHours(8, 10, 59, 0); // 8:15 AM
    
    const limiteTardanzaManana = new Date(ahora);
    limiteTardanzaManana.setHours(9, 0, 0, 0); // 9:00 AM
    
    const salidaTurno1 = new Date(ahora);
    salidaTurno1.setHours(13, 0, 0, 0); // 1:00 PM
    
    
    const inicioTurno2 = new Date(ahora);
    inicioTurno2.setHours(13, 45, 0, 0); // 1:45 PM
    
    const cierreTurno2 = new Date(ahora);
    cierreTurno2.setHours(14, 10, 59, 0); // 2:10:59 PM
    
    const inicioTardanzaTarde = new Date(ahora);
    inicioTardanzaTarde.setHours(14, 11, 0, 0); // 2:11 PM
    
    const limiteTardanzaTarde = new Date(ahora);
    limiteTardanzaTarde.setHours(15, 0, 0, 0); // 3:00 PM
    const salidaseret1 = new Date(ahora);
    salidaseret1.setHours(16, 0, 0, 0); // 4:00 PM
    
    const limitesalidaseret1 = new Date(ahora);
    limitesalidaseret1.setHours(17, 0, 0, 0);//5:00 PM 
    const toleranciat22se = new Date(ahora);
    toleranciat22se.setHours(18, 10, 59, 0);//6:15 PM 
   
    

    
    const salidaTurno2 = new Date(ahora);
    salidaTurno2.setHours(18, 0, 0, 0); // 6:00 PM
    
    const finJornada = new Date(ahora);
    finJornada.setHours(19, 0, 0, 0); // 7:00 PM
    
    let tiempoRestante;
    let mensaje = '';
    let sistemaCerrado = false;
    let turnoActual = '';
    let estado='';
    let estado2='';
    
    // Verificar el turno actual y los mensajes correspondientes
    if (ahora >= inicioTurno1 && ahora < cierreTurno1) {
        // Turno 1: Mañana (7:00 AM - 8:15 AM)
        estado="Puntual";
        estado2="Puntual";
        turnoActual = "Mañana";
        tiempoRestante = Math.floor((cierreTurno1 - ahora) / 60000); 
        mensaje = ` Sistema de asistencia habilitado y disponible Faltan ${tiempoRestante} minutos para el cierre  `;
        mensaje2= ` `;
    } else if (ahora > cierreTurno1 && ahora < limiteTardanzaManana) {
        // Período de tardanza (8:15 AM - 9:00 AM)
        estado="Tardanza";
        estado2="Tardanza";
        turnoActual = "Mañana";
        mensaje = "Sistema en modo tardanza.";
        mensaje2=" Solo se registrarán tardanzas con Descuento hasta las 9:00 AM."
    } else if (ahora >= limiteTardanzaManana && ahora < salidaTurno1) {
        // Sistema cerrado (9:00 AM - 1:00 PM)
        sistemaCerrado = true;
        mensaje2="";
        document.getElementById("turno-actual").style.display = "none";
        mensaje = "Sistema cerrado. Fuera del horario de tolerancia del Turno-Diurno.";
    } else if (ahora > salidaTurno1 && ahora < inicioTurno2) {
        sistemaCerrado = true;
        document.getElementById("turno-actual").style.display = "none";
        mensaje = "Sistema cerrado. El Sitema se habilitara a las 1:45 PM -Turno - Tarde";
    } else if (ahora >= inicioTurno2 && ahora < cierreTurno2) {
        // Turno 2: Tarde (1:45 PM - 2:15 PM)
        estado="Puntual";
        estado2="x";
        turnoActual = "Tarde";
        tiempoRestante = Math.floor((cierreTurno2 - ahora) / 60000); 
        mensaje = ` Sistema de asistencia habilitado y disponible Faltan ${tiempoRestante} minutos para el cierre  `;
        mensaje2= ` `;
    } else if (ahora >= inicioTardanzaTarde && ahora < limiteTardanzaTarde) {
        // Período de tardanza (2:16 PM - 3:00 PM)
        estado="Tardanza";
        estado2="x";
        turnoActual="Tarde";
        mensaje = "Sistema en modo tardanza.";
        mensaje2=" Solo se registrarán tardanzas con Descuento hasta las 3:00 PM.";
    } else if (ahora > limiteTardanzaTarde && ahora < salidaseret1) {
        document.getElementById("turno-actual").style.display = "none";
        sistemaCerrado = true;
        tiempoRestante = Math.floor((salidaseret1 - ahora) / 60000); 
        mensaje = `Sistema cerrado. Faltan ${tiempoRestante} minutos para la Salida de Serenos`;
        mensaje2=" ";

    } else if (ahora >= salidaseret1 && ahora <  limitesalidaseret1) {
        estado="x";
        estado2="Salida";
        turnoActual = "Mañana";
        tiempoRestante = Math.floor((limitesalidaseret1- ahora) / 60000); 
        mensaje = `Sistema abierto para salida del Personal de Serenazgo. Faltan ${tiempoRestante} minutos para el cierre del Sistema`;
        mensaje2=" ";

    } else if (ahora >=  limitesalidaseret1 && ahora < salidaTurno2) {
        // Sistema cerrado (5:00 PM - 6:00 PM)
        document.getElementById("turno-actual").style.display = "none";
        sistemaCerrado = true;
        mensaje = "Sistema cerrado Fuera del horario de tolerancia ";
        mensaje2=" ";
    } else if (ahora >= salidaTurno2 && ahora < toleranciat22se) {
        // Después de la salida (6:00 PM - 7:00 PM)
        estado="Salida";
        estado2='Puntual';
        turnoActual = "Tarde";
        mensaje = "Sistema abierto para salida del Personal y Entrada de Serenazgo ";
        mensaje2=" ";

    }else if (ahora >= toleranciat22se && ahora < finJornada) {  
        document.getElementById("turno-actual").style.display = "none";
        estado="Salida";
        estado2='Tardanza';
        turnoActual = "Tarde";
        mensaje = "Sistema abierto para salida del Personal  ";
        mensaje2="Solo se registrarán Serenazgos con tardanzas con Descuento hasta las 7:00 PM. ";
        
    } else {
        // Fuera de los horarios de los turnos (después de las 7:00 PM)
        document.getElementById("turno-actual").style.display = "none";
        sistemaCerrado = true;
        const siguienteTurno1 = new Date(inicioTurno1);
        siguienteTurno1.setDate(siguienteTurno1.getDate() + 1); 
        tiempoRestante = Math.floor((siguienteTurno1 - ahora) / 60000); 
        mensaje = `Sistema cerrado. Faltan ${tiempoRestante} minutos para el Turno  (Diurno)`;
         mensaje2=" ";
    }
      // Mostrar el turno actual
      turnoActualElemento.textContent = 'Turno: '+ turnoActual;

      // Actualizar mensajes y estilos dinámicamente
        mensajeElemento.innerHTML = mensaje;
        mensajeElemento2.innerHTML = mensaje2;

    // Mostrar mensaje de sistema cerrado si corresponde
    if (sistemaCerrado) {
        mensajeElemento.textContent = mensaje;
        mensajeElemento.className = "cerrado";
    } else {
        mensajeElemento2.textContent = mensaje2;
        mensajeElemento.textContent = mensaje;
        mensajeElemento.className = "abierto";
    }
    

    
    // Actualizar los valores de los campos ocultos del formulario
    document.getElementById('afecha').value = fechaFormateada;
    document.getElementById('ashora').value = horaFormateada;
    document.getElementById('dia').value = fechaFormateada2;
    document.getElementById('turno2').value = turnoActual;
    document.getElementById('estado').value = estado;
    document.getElementById('estado2').value = estado2;
}
// Actua lizar la fecha y hora cada segundo
setInterval(actualizarFechaHora, 1000);

// Ejecutar la función al cargar la página
actualizarFechaHora();




 

//enviar formulario automatico
$('#formulario-asistencia').on('submit', function(e) {
    e.preventDefault(); 
    const formData = {
        adni: $('#adni').val(),
        fecha_actual: $('#fecha_actual').val(),
        dia: $('#dia').val(),
        estado: $('#estado').val(),
        estado2: $('#estado2').val(),
        ashora: $('#ashora').val(),
        turno: $('#turno2').val()
    };
    
    // Verifica si ambos estados están vacíos y muestra alerta
    if (!formData.estado && !formData.estado2) {
        Swal.fire({
            icon: 'warning',
            title: 'Sistema cerrado',
            text: 'No se permiten registros en este momento.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
        $('#adni').val('');
        return; 
    }
    
    $.ajax({
        url: 'proceso/serenazgoauto.php?action=readcargo', 
        type: 'POST',
        data: { adni: formData.adni },
        success: function(cargoResponse) {
            let url = 'proceso/asistenciaautomatica.php'; 
            let dataToSend = { ...formData }; 
    
            if (cargoResponse === 'Serenazgo') {
                if ($.trim(dataToSend.estado2).toUpperCase() === 'X') { 
                    Swal.fire({
                        icon: 'warning',
                        title: 'Registro no permitido',
                        text: 'Personal de serenazgo no se registran en este momento.',
                        showConfirmButton: false, 
                        timer: 3000, 
                        timerProgressBar: true
                    });
                    return; 
                } else {
                    url = 'proceso/serenazgoauto.php?action=crearasisegu'; 
                    dataToSend.estado = dataToSend.estado2; 
                }
            } else { 
                let horaActual2 = new Date().getHours(); 

                if (dataToSend.turno === "Tarde" && horaActual2 >= 18 && horaActual2 < 19) {
                    dataToSend.turno = "Salida";
                }
             
                if ($.trim(dataToSend.estado).toUpperCase() === 'X') { 
                    Swal.fire({
                        icon: 'warning',
                        title: 'Registro no permitido',
                        text: 'Personal administrativo no se registran en este momento.',
                        showConfirmButton: false, 
                        timer: 3000, 
                        timerProgressBar: true
                    });
                    return; 
                }
            }   


           
            delete dataToSend.estado2;
    
            $.ajax({
                url: url,
                type: 'POST',
                data: dataToSend,
                success: function(response) {
                    let icono = 'success';
    
                    if (
                        response.includes('registrado en el turno de la mañana') ||
                        response.includes('registrado en el turno de la tarde') ||
                        response.includes('no ha registrado su ingreso') ||
                        response.includes('Sistema fuera de servicio')||
                        response.includes('Su salida ya fue registrada previamente')||
                        response.includes('Su entrada ya fue registrada previamente.')

                    ) {
                        icono = 'error';
                    }
    
                    Swal.fire({
                        title: response,
                        icon: icono,
                        timer: 3000,
                        showConfirmButton: false,
                        timerProgressBar: true
                    });
    
                    actualizarTarjetas();
                    $('#adni').val('');
                },
                error: function(error) {
                    console.error('Error al enviar los datos:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al enviar los datos',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true
                    });
                }
            });
        },
        error: function(error) {
            console.error('Error al obtener el cargo:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al obtener el cargo del personal',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        }
    });
});

function actualizarTarjetas() {
    $.ajax({
        url: 'proceso/tarjetasasis.php', 
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Actualizar los valores en las tarjetas
            $('#total-personal').text(response.totalPersonal);
            $('#asistieron').text(response.asistieron);
            $('#faltaron').text(response.faltaron);
        },
        error: function(xhr, status, error) {
            console.error("Error al obtener los datos: " + error);
        }
    });
}

    actualizarTarjetas();




