<?php
$host = "localhost";
$user = "root";
$pass = ""; 
$dbname = "bdasistencia";
date_default_timezone_set('America/Lima');
// ruta de la carpeta 
$backup_folder = 'C:/copias_bdasistencia';
// verificar si la carpeta existe sino crearla
if (!file_exists($backup_folder)) {
    if (!mkdir($backup_folder, 0777, true)) {
        die("No se pudo crear la carpeta: $backup_folder");
    }
}
// nombre del archivo de copia de seguridad
$backup_file = $backup_folder . '/backup_' . $dbname . '_' . date("Y-m-d") . '.sql';

// ruta completa de mysqldump 
$mysqldump_path = 'C:/xampp/mysql/bin/mysqldump.exe';

// Comando para hacer la copia de seguridad
if (empty($pass)) {
    $command = "$mysqldump_path --opt -h $host -u $user $dbname";
} else {
    $command = "$mysqldump_path --opt -h $host -u $user -p$pass $dbname";
}
// ejecutar el comando y capturar la salida
exec($command, $output, $return_var);

if ($return_var === 0) {
    file_put_contents($backup_file, implode("\n", $output));
    echo "Copia de seguridad de la Base de Datos realizada con éxito";
} else {
    echo "Error al realizar la copia de seguridad";
    
}
?>