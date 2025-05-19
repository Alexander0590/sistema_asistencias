<?php
session_start();
session_unset();
session_destroy();
setcookie(session_name(), '', time() - 3600, '/');

// Evitar que el navegador almacene en caché
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

header('Location: ../index.php');
exit();
?>
