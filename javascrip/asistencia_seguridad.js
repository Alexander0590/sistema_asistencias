$(document).ready(function () {
    
    var table = $('#tper_sn_t2').DataTable({
        "paging": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        "lengthMenu": [5, 10, 15, 20],  
        "scrollX": true, 
        "responsive": true,
        "language": {
            "search": "Buscar:",
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "No hay registros disponibles",
            "zeroRecords": "No se encontraron registros",
            "paginate": {
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
      "processing": true,  // Muestra la barra de carga
    "serverSide": true,  // Cambiar a true si se usa AJAX
        "ajax": {
            "url": "proceso/proceso_asistencia_diaria.php",
            "type": "GET",
            "data": function (d) {
                d.accion = 'listar_serenazgoentrada';
                return d;
            },
            "dataSrc": function (json) {
                if (json === 'sin_data') {
                    cargarSalidas([]); // Si no hay datos de entrada, cargar solo salida
                    return [];
                }
                
                try {
                    var data = typeof json === 'string' ? JSON.parse(json) : json;
                    var processedData = [];
                    
                    $.each(data, function(index, item) {
                        processedData.push({
                            "nro": index + 1,
                            "dni": item.dni,
                            "apellidos": item.apellidos,
                            "nombres": item.nombres,
                            "fecha": item.fecha_asistencia,
                            "dia": item.dia_semana,
                            "estado": "Entrada y Salida",
                            "acciones": `
                                <div class="d-flex justify-content-center gap-1">
                                    <button class="btn btn-danger btn-sm registrarfse d-block" data-id="${item.dni}">
                                        <i class="bi bi-x-circle"></i> Registrar falta
                                    </button>
                                    <button class="btn btn-success btn-sm registrartc d-block" data-id="${item.dni}">
                                        <i class="bi bi-check-circle"></i> Registrar 
                                    </button>
                                </div>`
                        });
                    });
    
                    // Si hay datos de entrada, cargar también las salidas
                    if (processedData.length > 0) {
                        cargarSalidas(processedData);
                    } else {
                        cargarSalidas([]); // Si no hay entradas, solo cargar salidas
                    }
                    
                    return processedData;
                } catch (e) {
                    console.error("Error al procesar datos:", e);
                    return [];
                }
            }
        },
        "columns": [
            { "data": "nro", "className": "text-center" },
            { "data": "dni" },
            { "data": "apellidos" },
            { "data": "nombres" },
            { "data": "fecha" },
            { "data": "dia" },
            { "data": "estado" },
            { 
                "data": "acciones",
                "className": "text-center",
                "orderable": false,
                "searchable": false
            }
        ]
    });
    
    // Función para cargar datos de salida
function cargarSalidas(entradaData) {
    $.ajax({
        url: 'proceso/proceso_asistencia_diaria.php',
        type: 'GET',
        data: { accion: 'listar_serenazgosa' },
        success: function (response) {
            try {
                var salidaData = response === 'sin_data' ? [] : 
                (typeof response === 'string' ? JSON.parse(response) : response);
                
                // Obtener la fecha de hoy en zona horaria de Perú (GMT-5)
                let fechaHoy = new Intl.DateTimeFormat('es-PE', {
                    timeZone: 'America/Lima',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).format(new Date()).split('/').reverse().join('-'); 

                if (entradaData.length === 0 && salidaData.length > 0) {
                    entradaData = salidaData.map((item, index) => ({
                        "nro": index + 1,
                        "dni": item.dni,
                        "apellidos": item.apellidos,
                        "nombres": item.nombres,
                        "fecha": item.fecha_asistencia,
                        "dia": item.dia_semana,
                        "estado": "Falta Salida",
                        "acciones": `
                            <div class="d-flex justify-content-center gap-1">
                                ${item.fecha_asistencia !== fechaHoy ? `
                                <button class="btn btn-success btn-sm registrarsa d-block" 
                                        data-id="${item.dni}"> 
                                    <i class="bi bi-check-circle"></i> Registrar Salida
                                </button>` : ''}
                                <button class="btn btn-primary btn-sm rejustifisa d-block" 
                                        data-id="${item.dni}"
                                        data-fecha="${item.fecha_asistencia}">
                                    <i class="bi bi-file-earmark"></i> Justificar
                                </button>
                            </div>`
                    }));
                } else {
                    $.each(salidaData, function(index, item) {
                        entradaData.push({
                            "nro": entradaData.length + index + 1,
                            "dni": item.dni,
                            "apellidos": item.apellidos,
                            "nombres": item.nombres,
                            "fecha": item.fecha_asistencia,
                            "dia": item.dia_semana,
                            "estado": "Salida",
                            "acciones": `
                                <div class="d-flex justify-content-center gap-1">
                                    ${item.fecha_asistencia !== fechaHoy ? `
                                    <button class="btn btn-success btn-sm registrarsa d-block" 
                                            data-id="${item.dni}"> 
                                        <i class="bi bi-check-circle"></i> Registrar Salida
                                    </button>` : ''}
                                    <button class="btn btn-primary btn-sm rejustifisa d-block" 
                                            data-id="${item.dni}"
                                            data-fecha="${item.fecha_asistencia}">
                                        <i class="bi bi-file-earmark"></i> Justificar
                                    </button>
                                </div>`
                        });
                    });
                }

                table.clear();
                table.rows.add(entradaData).draw();
            } catch (e) {
                console.error("Error al procesar datos de salida:", e);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en AJAX:", status, error);
        }
    });
}


    $('#tper_sn_t2').on('click', '.registrarfse', function() {
        var dni = $(this).data('id');
      
        
    });

    $('#tper_sn_t2').on('click', '.registrartc', function() {
        var dni = $(this).data('id');
        console.log("Registrar asistencia para DNI:", dni);
        
    });

//boton de registrar salida serenazgo
    $('#tper_sn_t2').on('click', '.registrarsa', function() {
        var $this = $(this);
        
        $this.prop('disabled', true);
        
        var dni = $this.data('id');
        var fecha = $this.data('fecha');
        var horas = '2:00:00';
        var estado = 'Normal';
    
        $.ajax({
            url: 'proceso/mantesernazgo.php?action=registrsali',
            type: 'POST', 
            data: {
                dni: dni,
                horasa: horas,
                estado: estado,
                fecha: fecha
            },
            success: function(response) {
                if(response === "success"){
                    $("#vistas").load("view/Lista_seguridadciu.php", function () {
                        $(this).fadeIn(200);
                    });
    
                    Swal.fire({
                        icon: 'success',
                        title: '¡Registro de Salida!',
                        text: 'El registro de salida se ha guardado correctamente.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            complete: function() {
                
                $this.prop('disabled', false);
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
                alert("Hubo un problema al guardar el registro");
                $this.prop('disabled', false);
            }
        });
    });
    

    //boton de justificacion serenazgo
    $('#tper_sn_t2').on('click', '.rejustifisa', function() {
        var dni = $(this).data('id');
        var fechasa = $(this).data('fecha');
        
        $('#dni_input_salida').val(dni); 
        $('#fecha_input_salida').val(fechasa); 
        $('#registroSalidaModal').modal('show'); 
    
        $('#guardarSalida').off('click').on('click', function() {
            var $btnGuardar = $(this);
            $btnGuardar.prop('disabled', true); 
    
            var dni = $('#dni_input_salida').val().trim();
            var horas = $('#hora_salida').val().trim();
            var comen = $('#comentario_salida').val().trim();
            var justificar = $('#justificar_salida').val().trim();
            var fecha2 = $('#fecha_input_salida').val().trim();      
    
            if (!dni || !horas || !justificar || !comen) {
                Swal.fire({
                    icon: 'error',
                    title: 'Campos vacíos',
                    text: 'Todos los campos son obligatorios.',
                    confirmButtonText: 'OK'
                });
                $btnGuardar.prop('disabled', false);
                return;
            }
    
            // Obtener la fecha actual (zona horaria de Perú)
            let fechaHoy = new Intl.DateTimeFormat('es-PE', {
                timeZone: 'America/Lima',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date()).split('/').reverse().join('-');
    
            // Definir el límite de hora
            let limiteHora = fecha2 === fechaHoy ? '16:00:00' : '02:00:00';
            let [limiteH, limiteM, limiteS] = limiteHora.split(':').map(Number);
    
            // Convertir la hora ingresada a Date para comparar
            let horasIngresada = new Date();
            let [h, m, s] = horas.split(':').map(Number);
            horasIngresada.setHours(h, m, s || 0, 0);
    
            let horasLimite = new Date();
            horasLimite.setHours(limiteH, limiteM, limiteS, 0);
    
            // Verificar si la hora ingresada es mayor al límite
            if (horasIngresada > horasLimite) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hora incorrecta',
                    text: `La hora debe ser menor a las ${limiteHora}`,
                    confirmButtonText: 'OK'
                });
                $btnGuardar.prop('disabled', false);
                return;
            }
    
            // Enviar datos por AJAX
            $.ajax({
                url: 'proceso/mantesernazgo.php?action=registrsalijusti',
                type: 'POST', 
                data: {
                    dni: dni,
                    fecha2: fecha2,
                    horas: horas,
                    justificar: justificar,
                    comen: comen
                },
                success: function(response) {
                    $('#registroSalidaModal').modal('hide'); 
    
                    $("#vistas").load("view/Lista_seguridadciu.php", function () {
                        $(this).fadeIn(200);
                    });
    
                    Swal.fire({
                        icon: 'success',
                        title: '¡Registro guardado!',
                        text: 'El registro se ha guardado correctamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        $('#registroSalidaModal').modal('hide'); 
                    });
                },
                complete: function() {
                    $btnGuardar.prop('disabled', false); 
                },
                error: function(xhr, status, error) {
                    console.error("Error:", error);
                    alert("Hubo un problema al guardar el registro");
                    $btnGuardar.prop('disabled', false);
                }
            });
        });
    });
    

    
        // Configuración común para ambas DataTables
        const commonConfig = {
            "paging": false,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": false,
            "lengthMenu": [5, 10, 15, 20],
            "scrollX": true,
            "responsive": true,
            "language": {
                "search": "Buscar:",
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "infoEmpty": "No hay registros disponibles",
                "zeroRecords": "No se encontraron registros",
                "paginate": {
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
           "processing": true,  
            "serverSide": true,  
        };
    
        //  Tabla de Faltas de serenazgo
        const tableFaltas = $('#tper_faltas').DataTable({
            ...commonConfig,
            "ajax": {
                "url": "proceso/proceso_asistencia_diaria.php",
                "type": "GET",
                "data": { accion: 'listarfaltaseguri' },
                "dataSrc": function (json) {
                    try {
                        if (json === 'sin_data') return [];
                        
                        const data = typeof json === 'string' ? JSON.parse(json) : json;
                        return data.map((item, index) => ({
                            "nro": index + 1,
                            "dni": item.dni,
                            "apellidos": item.apellidos,
                            "nombres": item.nombres,
                            "acciones": `
                                <div class="d-flex justify-content-center gap-1">
                                    <button class="btn btn-success btn-sm registrarfalta2" data-id="${item.dni}">
                                        <i class="bi bi-check-circle"></i> Registrar falta
                                    </button>
                                </div>`
                        }));
                    } catch (e) {
                        console.error("Error procesando faltas:", e);
                        return [];
                    }
                }
            },
            "columns": [
                { "data": "nro", "className": "text-center" },
                { "data": "dni" },
                { "data": "apellidos" },
                { "data": "nombres" },
                { 
                    "data": "acciones",
                    "className": "text-center",
                    "orderable": false,
                    "searchable": false
                }
            ]
        });
    
        const tableAsistencias = $('#tperasissegu').DataTable({
            ...commonConfig,
            "ajax": {
                "url": "proceso/proceso_asistencia_diaria.php",
                "type": "GET",
                "data": { accion: 'listarasistenciaseguri' },
                "dataSrc": function (json) {
                    if (json.error) {
                        console.error("Error del servidor:", json.error);
                        return [];
                    }
        
                    if (!json.data || json.data.length === 0) {
                        return []; 
                    }
        
                    return json.data.map((item, index) => ({
                        "nro": index + 1,
                        "dni": item.dni,
                        "apellidos": item.apellidos,
                        "nombres": item.nombres,
                        "acciones": `
                            <div class="d-flex justify-content-center gap-1">
                                <button class="btn btn-warning btn-sm editar-registro" data-id="${item.dni}">
                                    <i class="bi bi-pencil-square"></i> Editar
                                </button>
                            </div>`
                    }));
                }
            },
            "columns": [
                { "data": "nro", "className": "text-center" },
                { "data": "dni" },
                { "data": "apellidos" },
                { "data": "nombres" },
                { 
                    "data": "acciones",
                    "className": "text-center",
                    "orderable": false,
                    "searchable": false
                }
            ]
        });
 //boton de registrar faltas serenazgo
        $('#tper_faltas').on('click', '.registrarfalta2', function() {
            var dni = $(this).data('id');
            $('#dni_input1').val(dni); 
            $('#registroModal').modal('show'); 
        
            $('#guardarRegistro').off('click').on('click', function() {
                var dni = $('#dni_input1').val().trim();
                var turno = $('#turno').val().trim();
                var justi = $('#justificar').val().trim();
                var comentario = $('#comentario').val().trim();
            
                if (!dni || !turno || !justi || !comentario) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos vacíos',
                        text: 'Todos los campos son obligatorios.',
                        confirmButtonText: 'OK'
                    });
                    return;
                }
                $.ajax({
                    url: 'proceso/mantesernazgo.php?action=regisfh',
                    type: 'POST', 
                    data: {
                        dni: dni,
                        justi: justi,
                        turno: turno,
                        comentario: comentario
                    },
                    success: function(response) {
                        $('#registroModal').modal('hide'); 
                        
                        $("#vistas").load("view/Lista_seguridadciu.php", function () {
                            $(this).fadeIn(200);
                        });
        
                        Swal.fire({
                            icon: 'success',
                            title: '¡Registro guardado!',
                            text: 'El registro se ha guardado correctamente.',
                            confirmButtonText: 'Aceptar'
                        });
                    },
                    error: function(xhr, status, error) {
                        console.error("Error:", error);
                        alert("Hubo un problema al guardar el registro");
                    }
                });
            });
        });
        
       
    
        $('#tperasissegu').on('click', '.editar-registro', function() {
            var dni = $(this).data('id');
          
            
        });
       
});