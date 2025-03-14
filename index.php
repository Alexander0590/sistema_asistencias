<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Asistencia</title>
    <link rel="stylesheet" href="lib/boostrap-css/bootstrap.min.css">
    <link rel="stylesheet" href="lib/boostrap-iconos/bootstrap-icons.min.css">
    <link rel="shortcut icon" href="img/muni.png" type="image/x-icon">
    <script src="lib/jquery-3.7.1.min.js"></script>
    <link rel="stylesheet" href="lib/sweetalert2/sweetalert2.min.css">
    <style>
      .container {
        justify-content: flex-end; 
        padding-right: 5rem; 

      }
   
    #hora {
        font-size: 4.5rem;
        font-weight: bold;
    }

    #mensaje {
        font-size: 1.2rem;
        font-weight: bold;
    }

    #mensaje2 {
        font-size: 1.1rem;
        font-weight: bold;
        color: red;
    }

    .cerrado {
        color: red;
    }

    .abierto {
        color: green;
    }

    #carasis {
        width: 28rem;
        top: -2rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    #headercardasis {
        background-color: #0c0c24;
    }

    #fecha {
        font-size: 1.1rem;
        font-weight: bold;
    }

    #turno-actual {
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: 1rem;
    }

   
    .stats-container {
        margin-left: 17rem; 
    }

    .card {
        border-radius: 10px;
    }

    .card-header {
        border-radius: 10px 10px 0 0;
    }

    .card-body {
        padding: 1.5rem;
    }
</style>
</head>
<body>
  <?php  date_default_timezone_set("America/Lima"); ?>
  <div class="container d-flex justify-content-end   align-items-center vh-100">
    <!-- Tarjeta de Registro de Asistencia -->
    <div class="card text-center shadow-lg" id="carasis">
        <div class="card-header text-white" id="headercardasis">
            <h1 class="card-title">Registro de Asistencia</h1>
        </div>
        <div class="card-body" sty>
            <p id="fecha" class="text-muted"></p>
            <p id="hora" class="my-3"></p>
            <p id="mensaje"></p>
            <p id="mensaje2"></p>
            <p id="turno-actual"></p>

            <!-- Formulario para enviar datos -->
            <form id="formulario-asistencia" method="post">
                <!-- Campos ocultos para almacenar los datos -->
                <input type="hidden" id="adni" name="adni">
                <input type="hidden" id="dia" name="dia">
                <input type="hidden" id="turno" name="turno">
                <input type="hidden" id="afecha" name="afecha">
                <input type="hidden" id="fecha_actual" name="fecha_actual" value="<?php echo date("Y-m-d"); ?>">
                <input type="hidden" id="ashora" name="ashora">
                <input type="hidden" id="estado" name="estado">

                <a href="login.php" class="btn btn-success">
                    <i class="bi bi-box-arrow-in-right"></i> Acceder al Sistema
                </a>
                <button type="submit" class="btn btn-success mt-3" id="enviar" style="display: none;" >Enviar Datos</button>
            </form>
        </div>
    </div>

    <!--  tarjetas  -->
<div class="stats-container" style="margin-left: 5rem;">
    <!-- Tarjeta 1: Total del Personal -->
    <div class="card text-center shadow-lg mb-3" style="width: 12rem;">
        <div class="card-header bg-primary text-white">
            <h5 class="card-title">
                <i class="bi bi-people-fill"></i> Total Personal
            </h5>
        </div>
        <div class="card-body">
            <p id="total-personal" class="card-text" style="font-size: 2rem;">0</p>
        </div>
    </div>

    <!-- Tarjeta 2: Asistieron -->
    <div class="card text-center shadow-lg mb-3" style="width: 12rem;">
        <div class="card-header bg-success text-white">
            <h5 class="card-title">
                <i class="bi bi-check-circle-fill"></i> Asistieron
            </h5>
        </div>
        <div class="card-body">
            <p id="asistieron" class="card-text" style="font-size: 2rem;">0</p>
        </div>
    </div>

    <!-- Tarjeta 3: Faltaron -->
    <div class="card text-center shadow-lg" style="width: 12rem;">
        <div class="card-header bg-danger text-white">
            <h5 class="card-title">
                <i class="bi bi-x-circle-fill"></i> Faltaron
            </h5>
        </div>
        <div class="card-body">
            <p id="faltaron" class="card-text" style="font-size: 2rem;">0</p>
        </div>
    </div>
</div>
    <script src="lib/sweetalert2/sweetalert2.min.js"></script>
<script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
<script src="javascrip/asistenciaau.js"></script>
</body>
</html>