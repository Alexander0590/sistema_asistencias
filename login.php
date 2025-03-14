<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <link rel="stylesheet" href="lib/boostrap-css/bootstrap.min.css">
  <link rel="stylesheet" href="lib/boostrap-iconos/bootstrap-icons.min.css">
  <link rel="shortcut icon" href="img/muni.png" type="image/x-icon">
  <style>
    :root {
      --primary-color: #060614; 
      --secondary-color: #060614;
      --accent-color: #6c5ce7;
      --border-radius: 15px;
      --box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); 
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      background: var(--primary-color); 
      display: flex;
      justify-content: center; 
      align-items: center;
      min-height: 100vh;
      overflow: hidden;
    }

    .login-container {
      width: 100%;
      max-width: 400px;
      padding: 2.5rem;
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      text-align: center;
      animation: fade-in 1s ease-in-out;
      position: relative;
      overflow: hidden;
      /* margin-right: 10%; Margen derecho para separar del borde */
      border: 1px solid #ddd; 
    }

    @keyframes fade-in {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .login-container img {
      width: 180px;
      margin-bottom: 1.5rem;
      filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1)); 
    }

    .login-container h3 {
      margin-bottom: 1.5rem;
      color: var(--secondary-color);
      font-size: 1.75rem;
      font-weight: 600;
    }

    .form-group {
      position: relative;
      margin-bottom: 1rem;
    }

    .form-group .form-control {
      padding-left: 2.5rem;
      border-radius: var(--border-radius);
      border: 1px solid #ddd; /* Borde más suave */
      background: rgba(255, 255, 255, 0.9);
      color: var(--secondary-color);
      transition: all 0.3s ease;
    }

    .form-group .form-control::placeholder {
      color: rgba(0, 0, 0, 0.5); 
    }

    .form-group .form-control:focus {
      border-color: var(--accent-color);
      box-shadow: 0 0 10px rgba(108, 92, 231, 0.2);
      background: rgba(255, 255, 255, 1);
    }

    .form-group .bi {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--accent-color);
      font-size: 1.2rem;
    }

    .btn-custom {
      background: var(--accent-color);
      border: none;
      color: white;
      padding: 0.75rem;
      border-radius: var(--border-radius);
      font-size: 1rem;
      font-weight: 500;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
      width: 100%;
    }

    .btn-custom:hover {
      transform: translateY(-3px);
      box-shadow: 0px 6px 15px rgba(108, 92, 231, 0.3); 
    }

    .btn-custom:active {
      transform: translateY(0);
      box-shadow: 0px 4px 10px rgba(108, 92, 231, 0.2); 
    }

    .error-message {
      color: #ff4757;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <img src="img/muni.png" alt="Logo de la Empresa">
    <h3>Acceso Corporativo</h3>
    <form action="proceso/login.php" method="post">
      <div class="form-group">
        <i class="bi bi-person-fill"></i>
        <input type="text" class="form-control" placeholder="Usuario" name="usuario" required>
      </div>
      <div class="form-group">
        <i class="bi bi-lock-fill"></i>
        <input type="password" class="form-control" placeholder="Contraseña" name="clave" required>
      </div>
      <button type="submit" class="btn btn-custom btn-block">Ingresar</button>
      <?php
      $dato = isset($_GET['dato']) ? $_GET['dato'] : '';
      if (!empty($dato)) {
          echo "<div class='error-message'>$dato</div>";
      }
      ?>
    </form>
  </div>

  <script src="lib/boostrap-js/bootstrap.bundle.min.js"></script>
  <script src="lib/jquery-3.5.1.slim.min.js"></script>
  <script src="lib/popper.min.js"></script>
  <script src="lib/bootstrap.min.js"></script>
</body>
</html>