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
        "processing": true, 
        "serverSide": false, 
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
                console.log("Respuesta del servidor:", response);
                try {
                    var salidaData = response === 'sin_data' ? [] : 
                    (typeof response === 'string' ? JSON.parse(response) : response);
                    
                    // Si no hay datos de entrada y sí hay de salida, solo mostrar salidas
                    if (entradaData.length === 0 && salidaData.length > 0) {
                        entradaData = salidaData.map((item, index) => ({
                            "nro": index + 1,
                            "dni": item.dni,
                            "apellidos": item.apellidos,
                            "nombres": item.nombres,
                            "fecha": item.fecha_asistencia,
                            "dia": item.dia_semana,
                            "estado": "Salida",
                            "acciones": `
                                <div class="d-flex justify-content-center gap-1">
                                    <button class="btn btn-success btn-sm registrarsa d-block" data-id="${item.dni}">
                                        <i class="bi bi-check-circle"></i> Registrar Salida
                                    </button>
                                </div>`
                        }));
                    } else {
                        // Si hay datos de entrada, agregar las salidas
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
                                        <button class="btn btn-success btn-sm registrarsa d-block" data-id="${item.dni}">
                                            <i class="bi bi-check-circle"></i> Registrar Salida
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

    $('#tper_sn_t2').on('click', '.registrarsa', function() {
        var dni = $(this).data('id');
        $('#dni_input_salida').val(dni); 
        $('#registroSalidaModal').modal('show'); 
      
        
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
            "serverSide": false
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