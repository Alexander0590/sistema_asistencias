<?php
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'carnet':
        shell_exec('start explorer "C:\canerts_pdf"');
        sleep(1);
        shell_exec('nircmd win activate title "canerts_pdf"');

        break;
    case 'base':
        shell_exec('start explorer "C:\copias_bdasistencia"');
        sleep(1);
        shell_exec('nircmd win activate title "copias_bdasistencia"'); 
        break;
    default:
      
        break;
}


?>