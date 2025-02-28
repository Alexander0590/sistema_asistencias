<?php
session_start();
include('../conecxion/conecxion.php'); // Conexión a la base de datos

// Obtener los datos del formulario
$usuario = $_POST['usuario'];
$contraseña = $_POST['clave'];

// Consulta preparada para evitar SQL Injection
$sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";
$stmt = $cnn->prepare($sql);

// Vincular los parámetros
$stmt->bind_param("ss", $usuario, $contraseña);

// Ejecutar la consulta
$stmt->execute();
$result = $stmt->get_result();

// Verificar si existe el usuario
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    // Configurar variables de sesión
    $_SESSION['nombre'] = $row['datos'];
    $_SESSION['rol'] = $row['rol'];
    $_SESSION['email'] = $row['email'];
    $_SESSION['tel'] = $row['Telefono'];
    $_SESSION['usuario'] = $row['usuario'];

    // Redirigir al panel de control
    header("Location: ../panel_control.php?bienvenido=" . urlencode($row['datos']));
    exit();
} else {

 $dato="Usuario o contraseña incorrectos";
    // Usuario o contraseña incorrectos
    header("Location: ../login.php?dato=". urldecode($dato));
    exit();
}

// Cerrar la conexión
$stmt->close();
$cnn->close();
?>
