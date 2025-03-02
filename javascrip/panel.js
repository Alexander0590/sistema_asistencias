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
    $("#reporteas").click(function (e) {
      e.preventDefault(); 
      $("#vistas").load("view/reporte_de_asistencia.php"); 
    });

    $("#cerrarsesion").click(function(){
      Swal.fire({
          title: "¿Estás seguro de que quieres salir?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, salir",
          cancelButtonText: "No, quedarme"
      }).then((result) => {
          if (result.isConfirmed) {
              window.location.href = "proceso/cerrar_sesion.php"; // O usa window.close();
          }
      });
  });
  
  });


 