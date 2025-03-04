<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: ../index.php?dato=" . urlencode("Debe iniciar sesión para acceder."));
    exit();
}
if($_SESSION['rol']==="1"){
  $rol="Administrador";
}else{
  $rol="Personal";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="lib/animaciones/animate.min.css">
    <link rel="stylesheet" href="lib/boostrap-css/bootstrap.min.css">
    <link rel="stylesheet" href="lib/boostrap-iconos/bootstrap-icons.min.css">
    <link rel="stylesheet" href="lib/sweetalert2/sweetalert2.min.css">
    <title>Panel</title>
    <script src="lib/javascrip/jquery-3.7.1.min.js"></script> 
   <link rel="stylesheet" href="estilos/estilos_panel.css">
   <link rel="stylesheet" href="estilos/estilosdeviews.css">
   <link rel="shortcut icon" href="img/muni.png" type="image/x-icon">
</head>
<body class="animate__animated animate__fadeIn">
  
<!-- Menu de nacegacion horizontal -->
<div class="container-tp" id="bhoriz">
        <div class="perfil" data-bs-toggle="modal" data-bs-target="#perfilModal">
            <div id="foto">
                <img src="img/usuariodefecto.png" alt="Foto de perfil">
            </div>
            <div id="nombre">
                <h5>
                    <?php echo htmlspecialchars($_SESSION['nombre']); ?>
                    <i class="bi bi-caret-down-square-fill"></i>
                </h5>
            </div>
        </div>
    </div>
<!-- Modal -->
<div class="modal fade" id="perfilModal" tabindex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" style="background-color: #060614; color: #ffffff;">
      <div class="modal-header" style="border-bottom: 1px solid #8773e7;">
        <h5 class="modal-title" id="perfilModalLabel"><b>Información del perfil</b></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body ">
        <div id="foto-modal " class="text-center mb-3">
          <img src="img/usuariodefecto.png" alt="Foto de perfil" class="img-fluid rounded-circle" style="width: 150px; height: 150px; margin-bottom: 10px ;">
        </div>
        <div text-fill>
        <p><strong>Nombre:</strong> <?php echo htmlspecialchars($_SESSION['nombre']); ?></p>
        <p><strong>Usuario:</strong> <?php echo htmlspecialchars($_SESSION['usuario']); ?></p>
        <p><strong>Correo Electrónico:</strong> <?php echo htmlspecialchars($_SESSION['email']); ?></p>
        <p><strong>Teléfono:</strong> <?php echo htmlspecialchars($_SESSION['tel']); ?></p>
        <p><strong>Rol:</strong> <?php echo $rol; ?> </p>
        </div>
     
      </div>
        <div class="modal-footer" style="border-top: 1px solid #8773e7;">
       <a href="#" id="cerrarsesion" class="btn btn-secondary" style="background-color: #8773e7; color: #ffffff;">
          <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
      </a>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="background-color: #8773e7; color: #ffffff;">
          <i class="bi bi-x-circle"></i> Cerrar
        </button>
      </div>
    </div>
  </div>
</div>
<!-- Menu Navegacion Vertical -->
<div class="sidebar v-a" id="mySidebar">
    <i class="bi bi-list menu-btn" onclick="toggleSidebar()" id="xd"></i>
    <a href="#" id="inicio"><i class="bi bi-house-door"></i><span>Inicio</span></a>
    <a href="#"><i class="bi bi-bar-chart-line"></i><span>Dashboard</span></a>
    <div class="menu-item">
        <a href="#"><i class="bi bi-calendar-check"></i><span>Asistencia</span></a>
        <div class="submenu">
            <a href="#" id="x2">Registrar Manual</a>
            <a href="#" id="ver_asistencia">Ver asistencia actual</a>
            <a href="#" id="reporteas">Reportes de asistencia</a>
        </div>
    </div>
    <div class="menu-item">
        <a href="#" ><i class="bi bi-people"></i><span>Personal</span></a>
        <div class="submenu">
            <a href="#" id="liper">Lista de personal</a>
            <a href="#" id="x4">Agregar personal</a>
        </div>
    </div>
    <div class="menu-item">
        <a href="#"><i class="bi bi-calendar-event"></i><span>Eventos</span></a>
        <div class="submenu">
            <a href="#">Ver eventos</a>
            <a href="#">Agregar evento</a>
            <a href="#">Reportes de eventos</a>
        </div>
    </div>
    <div class="menu-item">
        <a href="#"><i class="bi bi-person-circle"></i><span>Usuarios</span></a>
        <div class="submenu">
            <a href="#" id="lisusu">Ver usuarios</a>
            <a href="#" id="usuario">Agregar usuario</a>
        </div>
    </div>
    <div class="menu-item">
        <a href="#"><i class="bi bi-gear"></i><span>Configuraciones</span></a>
        <div class="submenu">
            <a href="#">Configurar lector</a>
            <a href="#">Parámetros de asistencia</a>
        </div>
    </div>
    <div class="menu-item">
        <a href="#" id="copia"><i class="bi bi-database-down"></i><span>Copia de Seguridad</span></a>
    </div>
    <div class="menu-item">
        <a href="#"><i class="bi bi-graph-up"></i><span>Reportes</span></a>
        <div class="submenu">
            <a href="#">Resumen mensual</a>
            <a href="#">Asistencia por empleado</a>
        </div>
    </div>
    <a href="#" id="cerrarsesion"><i class="bi bi-box-arrow-left"></i><span>Cerrar Sesión</span></a>
</div>

<div id="vistas">
  <div id="imagenprin">
  <img src="img/muni.png" alt="" id="img2">
  </div>

</div>

<script src="lib/jquery-3.6.0.min.js"></script>
<script src="lib/sweetalert2/sweetalert2.min.js"></script>
<script src="javascrip/backup.js"></script>
<script src="javascrip/panel.js"></script>
<script src="javascrip/asistenciamante.js"></script>
<script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
<script src="javascrip/usuariosmante.js"></script>
<script src="javascrip/personalmante.js"></script>

</body>
</html>

