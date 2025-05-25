const sidebar = document.getElementById('mySidebar');

//mensaje de bienvenida
const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('bienvenido');
    if (nombre) {
        Swal.fire({
            title: "¡Bienvenido!",
            text: `Hola, ${nombre}. ¡Que tengas un gran día! `,
            icon: "info",
            confirmButtonText: "OK"
          }).then(() => {
            // Eliminar el parámetro 
            const newUrl = window.location.pathname; 
            window.history.replaceState({}, document.title, newUrl);
        });
    }
//expander la barra horizontal
sidebar.addEventListener('mouseover', function() {
    sidebar.classList.add('expanded');
});
//constraer la barra horizontal
sidebar.addEventListener('mouseout', function() {
    sidebar.classList.remove('expanded');
});

//formulario personal validar dni
function validarLongitud(input) {
  let valor = input.value.toString().replace(/\D/g, '');


  if (valor.length > 8) {
      valor = valor.slice(0, 8);
  }
  input.value = valor;
}


//traer las vistas con jquery
$(document).ready(function () {
  $("#inicio").click(function (e) {
    e.preventDefault(); 
    location.reload(); 
  });
  
    // Usuarios
    $("#usuario").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/usuario.php"); 
    });
    //listado de usuarios
    $("#lisusu").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/listadeusuarios.php"); 
    });
    //lista de personal
    $("#liper").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/listadepersonal.php"); 
    });
    // lista cargos
    $("#licargos").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/lista_cargos.php"); 
    });
    //trabajadores
    $("#x4").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/personal.php"); 
    });
    //Asistencia
    $("#x2").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/asistencia.html"); 
    });
    $("#x1").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/asistenciaauto.html"); 
    });
    $("#ver_asistencia").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/asistencia_diaria.php"); 
    });
    //reporte asistencia
    $("#reporteas").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/reporte_de_asistencia.php"); 
    });
    //reporte serenazgo
    $("#reporteaseguridad").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/reporte_serenazgo.php"); 
    });
 //reporte vacaciones
  $("#reporvacaciones").click(function (e) {
    e.preventDefault(); 
    $("#vistas").load("view/reporte_vacaciones.php"); 
  });
    //reportesalidas
    $("#reportesalidas").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/reporte_salidas.php"); 
    });
    //reporte General
    $("#rgeneral").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/reporte_general.php"); 
    });
//lista de modalidad
    $("#limodali").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/lista_modalidad.php"); 
    });
   $("#diasrecu").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/reporte_horasrecu.php"); 
    });


    //lista de vacaciones
    $("#lvaca").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/lis_vacaciones.php"); 
    });
    //boton de cierre de dia
    $("#bcierre").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/cerrar_dia.php"); 
    });
    //solicitud de vacaciones
    $("#gvaca").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/solicitarvacaciones.php"); 
    });

//registrar serenazgo
    $("#reserena").click(function (e) {
      e.preventDefault();
      $("#vistas").load("view/modalresegu.php", function () {
        const modal = new bootstrap.Modal(document.getElementById('regisserengo'));
        modal.show();
      });
    });
    //salidas 
    $("#resa").click(function (e) {
      e.preventDefault();
      $("#vistas").load("view/salidas.php", function () {
        const modal = new bootstrap.Modal(document.getElementById('modalSalida'));
        modal.show();
      });
    });
    //listar salidas
    $("#lisa").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/lista_salidas.php"); 
    });
    //serenazgo
    let cargando = false;

    $("#lserena").click(function (e) {
        e.preventDefault();
        if (cargando) return; // Evita múltiples cargas
        cargando = true;
    
        $("#vistas").load("view/Lista_seguridadciu.php", function () {
            cargando = false; // Permitir nueva carga después de completar la anterior
        });
    });
    
  
  
  });


 