<?php
// Incluir el autoload de Composer para cargar PhpSpreadsheet
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

// Incluir la conexión a la base de datos
include('../conecxion/conecxion.php');

// Verificar la conexión
if ($cnn->connect_error) {
    die("Error de conexión: " . $cnn->connect_error);
}

// Obtener los filtros del formulario
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$nombre = isset($_GET['nombre']) ? $cnn->real_escape_string($_GET['nombre']) : null;

// Construir la consulta SQL con los filtros
$query = "SELECT dni, nombres, apellidos, edad, cargo FROM personal WHERE 1=1";
if ($id) {
    $query .= " AND dni = $id";
}
if ($nombre) {
    $query .= " AND nombres LIKE '%$nombre%'";
}

// Ejecutar la consulta
$result = $cnn->query($query);

// Verificar si hay resultados
if ($result->num_rows === 0) {
    die("No se encontraron resultados.");
}

// Crear una nueva instancia de Spreadsheet
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

// Agregar un título arriba de la tabla
$sheet->setCellValue('A1', 'Reporte de Personal'); // Título
$sheet->mergeCells('A1:E1'); // Combinar celdas desde A1 hasta E1

// Estilo para el título
$titleStyle = [
    'font' => [
        'bold' => true,
        'size' => 16,
        'color' => ['rgb' => 'FFFFFF'], // Texto blanco
    ],
    'fill' => [
        'fillType' => Fill::FILL_SOLID,
        'startColor' => ['rgb' => '4F81BD'], // Fondo azul
    ],
    'alignment' => [
        'horizontal' => Alignment::HORIZONTAL_CENTER, // Centrar texto
    ],
];

// Aplicar estilo al título
$sheet->getStyle('A1')->applyFromArray($titleStyle);

// Agregar encabezados de la tabla
$sheet->setCellValue('A2', 'DNI');
$sheet->setCellValue('B2', 'Nombre');
$sheet->setCellValue('C2', 'Apellidos');
$sheet->setCellValue('D2', 'Edad');
$sheet->setCellValue('E2', 'Cargo');

// Llenar el archivo con datos de la base de datos
$row = 3; // Empezar en la fila 3 (debajo del título y los encabezados)
while ($fila = $result->fetch_assoc()) {
    $sheet->setCellValue('A' . $row, $fila['dni']);
    $sheet->setCellValue('B' . $row, $fila['nombres']);
    $sheet->setCellValue('C' . $row, $fila['apellidos']);
    $sheet->setCellValue('D' . $row, $fila['edad']);
    $sheet->setCellValue('E' . $row, $fila['cargo']);
    $row++;
}

// Aplicar formato de tabla
$lastRow = $row - 1; // Última fila con datos
$lastColumn = 'E';   // Última columna con datos

// Estilo para los encabezados
$headerStyle = [
    'font' => [
        'bold' => true,
        'color' => ['rgb' => 'FFFFFF'], // Texto blanco
    ],
    'fill' => [
        'fillType' => Fill::FILL_SOLID,
        'startColor' => ['rgb' => '4F81BD'], // Fondo azul
    ],
    'alignment' => [
        'horizontal' => Alignment::HORIZONTAL_CENTER, // Centrar texto
    ],
    'borders' => [
        'allBorders' => [
            'borderStyle' => Border::BORDER_THIN, // Bordes finos
            'color' => ['rgb' => '000000'], // Color negro
        ],
    ],
];

// Aplicar estilo a los encabezados
$sheet->getStyle('A2:' . $lastColumn . '2')->applyFromArray($headerStyle);

// Estilo para las celdas de datos
$dataStyle = [
    'borders' => [
        'allBorders' => [
            'borderStyle' => Border::BORDER_THIN, // Bordes finos
            'color' => ['rgb' => '000000'], // Color negro
        ],
    ],
    'alignment' => [
        'horizontal' => Alignment::HORIZONTAL_CENTER, // Centrar texto
    ],
];

// Aplicar estilo a las celdas de datos
$sheet->getStyle('A3:' . $lastColumn . $lastRow)->applyFromArray($dataStyle);

// Ajustar automáticamente el ancho de las columnas
foreach (range('A', $lastColumn) as $column) {
    $sheet->getColumnDimension($column)->setAutoSize(true);
}

// Crear un escritor para guardar el archivo
$writer = new Xlsx($spreadsheet);

// Enviar el archivo al navegador para descargar
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="reporte.xlsx"');
header('Cache-Control: max-age=0');

$writer->save('php://output');
exit;