<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Botón de Cerrar Día">
    <title>Botón Cerrar Día</title>
    <style>
        .card-cerrar-dia {
            font-size: 4rem;
            border: none;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.86);
            width: 100%;
            max-width: 800px;
            overflow: hidden;
            background: white;
            transition: transform 0.3s ease;
            margin: 0 auto;
            left: 70px;
            top: 30px;
        }
        
        .card-cerrar-dia:hover {
            transform: translateY(-5px);
        }
        
        .card-body {
            padding: 3rem;
        }
        
        h2 {
            color: #343a40;
            font-weight: 600;
            font-size: 2rem;
            margin-bottom: 1.5rem !important;
        }
        
        .text-muted {
            color: #6c757d !important;
            font-size: 1.2rem;
            margin-bottom: 2rem !important;
        }
        
        .btn-cerrar-dia {
            padding: 15px 40px;
            font-size: 1.5rem;
            font-weight: 500;
            border-radius: 50px;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);
            position: relative;
            overflow: hidden;
            border: none;
            background: linear-gradient(45deg, #dc3545, #c82333);
        }
        
        .btn-cerrar-dia:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(220, 53, 69, 0.6);
        }
        
        .btn-cerrar-dia:active {
            transform: translateY(0);
        }
        
        .btn-cerrar-dia::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #c82333, #dc3545);
            z-index: -1;
            transition: opacity 0.3s ease;
            opacity: 0;
        }
        
        .btn-cerrar-dia:hover::after {
            opacity: 1;
        }
        
        .bi-exclamation-triangle {
            font-size: 1.5rem;
        }
        
        @media (max-width: 768px) {
            .card-body {
                padding: 2rem;
            }
            
            h2 {
                font-size: 1.5rem;
            }
            
            .text-muted {
                font-size: 1rem;
            }
            
            .btn-cerrar-dia {
                font-size: 1.2rem;
                padding: 12px 30px;
            }
        }
    </style>
</head>
<body>
    <div class="card card-cerrar-dia">
        <div class="card-body text-center">
            <div class="mb-4">
                <h2 class="mb-3">Al presionar el botón, se cerrará el día en el sistema de asistencia.</h2>
                <p class="text-muted">Esto implica registrar las asistencias del día y bloquear nuevos registros.</p>
            </div>
            <button class="btn btn-danger btn-cerrar-dia" id="cerrardia" type="button">
                <i class="bi bi-exclamation-triangle me-2"></i> Cerrar Día
            </button>
        </div>
    </div>
    <script src="javascrip/asistencia_diaria.js"></script>
</body>
</html>