$(document).ready(function () {
    
    if ($.fn.DataTable.isDataTable('#tper_sn_t2')) {
        $('#tper_sn_t2').DataTable().clear().destroy();
    }
    if ($.fn.DataTable.isDataTable('#tper_faltas')) {
        $('#tper_faltas').DataTable().clear().destroy();
    }
    if ($.fn.DataTable.isDataTable('#tperasissegu')) {
        $('#tperasissegu').DataTable().clear().destroy();
    }


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
                    cargarSalidas([]); 
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
                                    <button class="btn btn-danger btn-sm registrarfse d-block" data-id="${item.dni}"  data-fecha="${item.fecha_asistencia}">
                                        <i class="bi bi-x-circle"></i> Registrar falta
                                    </button>
                                    <button class="btn btn-success btn-sm registrardom d-block" data-id="${item.dni}" data-fecha="${item.fecha_asistencia}">
                                        <i class="bi bi-check-circle"></i> Registrar 
                                    </button>
                                </div>`
                        });
                    });
    
                    // Si hay datos de entrada cargar también las salidas
                    if (processedData.length > 0) {
                        cargarSalidas(processedData);
                    } else {
                        cargarSalidas([]); 
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
                                <button class="btn btn-success btn-sm registrarsa d-block" 
                                        data-id="${item.dni}" data-fecha="${item.fecha_asistencia}"> 
                                    <i class="bi bi-check-circle"></i> Registrar Salida
                                </button>
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
                                <button class="btn btn-success btn-sm registrarsa d-block" 
                                        data-id="${item.dni}" data-fecha="${item.fecha_asistencia}"> 
                                    <i class="bi bi-check-circle"></i> Registrar Salida
                                </button>
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

//registrar falta domingo
    $('#tper_sn_t2').on('click', '.registrarfse', function() {
        var dni = $(this).data('id');
        var fechafa = $(this).data('fecha');
        $('#dni_input1').val(dni); 
        $('#fecha_input1').val(fechafa); 

        $('#registroModal').modal('show'); 
        
        $('#guardarRegistro').off('click').on('click', function() {
            var dni = $('#dni_input1').val().trim();
            var fecha3 = $('#fecha_input1').length ? $('#fecha_input1').val().trim() : '';
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
                url: 'proceso/mantesernazgo.php?action=regisfdomingo',
                type: 'POST', 
                data: {
                    dni: dni,
                    fecha3:fecha3,
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
//boton registrar domingo
    $('#tper_sn_t2').on('click', '.registrardom', function() {
        var dni = $(this).data('id');
        var fechare = $(this).data('fecha');
        
        $('#dni_input3').val(dni); 
        $('#fecha_input3').val(fechare); 
    
        $('#registrore2').modal('show'); 

        $("#estadoingreso").change(function() {
            if ($(this).val() === "Tardanza") { 
                $("#justiingreso").closest(".mb-3").show();
            } else {
                $("#justiingreso").closest(".mb-3").hide();
            }
        });
    
        $("#estado_salida").change(function() {
            if ($(this).val() === "Salida Anticipada") {
                $("#justisalida").closest(".mb-3").show();
            } else {
                $("#justisalida").closest(".mb-3").hide();
            }
        });

        $('#guardarredomingo').off('click').on('click', function() {
            var dni = $('#dni_input3').val().trim();
            var fecha3 = $('#fecha_input3').length ? $('#fecha_input3').val().trim() : '';
            var turno = $('#turnodomingo').val().trim();
            var horai = $('#hora_ingreso').val();
            var horas = $('#horas').val();
            var estadoing = $('#estadoingreso').val();
            var justifiingreso = $('#justiingreso').val();
            var estadosalida = $('#estado_salida').val();
            var justisalida = $('#justisalida').val();
            var comentario = $('#comentariore').val().trim();
        
            if (!dni || !turno || !comentario ||  !horai|| !horas||!estadoing || !estadosalida ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Campos vacíos',
                    text: 'Todos los campos son obligatorios.',
                    confirmButtonText: 'OK'
                });
                return;
            }
            $.ajax({
                url: 'proceso/mantesernazgo.php?action=regisregidomingo',
                type: 'POST', 
                data: {
                    dni: dni,
                    fecha3:fecha3,
                    horai:horai,
                    horas:horas,
                    estadoing:estadoing,
                    justifiingreso:justifiingreso,
                    estadosalida:estadosalida,
                    justisalida:justisalida,
                    turno: turno,
                    comentario: comentario
                },
                success: function(response) {
                    $('#registrore2').modal('hide'); 
                    
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
    
        $('#guardarSalida').off('click').on('click', function () {
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
        
            $.ajax({
                url: 'proceso/mantesernazgo.php?action=obtener_turno', 
                type: 'POST',
                dataType: 'json',
                data: { dni: dni,fecha2:fecha2 },
                success: function (response) {
                    
                    let turno = response.turno;
        
                    // Definir el límite de hora según el turno
                    let limiteHora = turno === "Mañana" ? '16:00:00' : '02:00:00';
                    let [limiteH, limiteM, limiteS] = limiteHora.split(':').map(Number);
        
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
                            text: `La hora debe ser menor a las ${limiteHora} según tu turno (${turno}).`,
                            confirmButtonText: 'OK'
                        });
                        $btnGuardar.prop('disabled', false);
                        return;
                    }
        
                    // Si pasa la validación, enviar los datos al servidor
                    $.ajax({
                        url: 'proceso/mantesernazgo.php?action=registrsalijusti',
                        type: 'POST',
                        data: {
                            dni: dni,
                            fecha2: fecha2,
                            horas: horas,
                            justificar: justificar,
                            comen: comen,
                            turno:turno
                        },
                        success: function (response) {
                            $('#registroSalidaModal').modal('hide');
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
                        complete: function () {
                            $btnGuardar.prop('disabled', false);
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                            alert("Hubo un problema al guardar el registro");
                            $btnGuardar.prop('disabled', false);
                        }
                    });
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo obtener el turno del usuario.',
                        confirmButtonText: 'OK'
                    });
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
            "serverSide": false,  
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
                        console.log("No se encontraron datos");
                        return []; 
                    }
            
                    return json.data.map((item, index) => {
                        // Determinar qué botones mostrar según el estado
                        const mostrarEditar = item.estado_asis !== 'Falta salida';
                        const mostrarJustificar = item.estado_asis !== 'Registro completo';
                        
                        return {
                            "nro": index + 1,
                            "dni": item.dni,
                            "apellidos": item.apellidos,
                            "nombres": item.nombres,
                            "Turno": item.turno,
                            "Estado": item.estado_asis,
                            "acciones": `
                                <div class="d-flex justify-content-center gap-1">
                                    ${mostrarEditar ? `
                                    <button class="btn btn-warning btn-sm editar-registro" data-id="${item.dni}">
                                        <i class="bi bi-pencil-square"></i> Editar
                                    </button>
                                    ` : ''}
                                    
                                    ${mostrarJustificar ? `
                                    <button class="btn btn-primary btn-sm justificar-registro" 
                                            data-id="${item.dni}" 
                                            data-fecha="${item.fecha_asistencia}" 
                                            data-turno="${item.turno}">
                                        <i class="bi bi-file-earmark-text"></i> Justificar
                                    </button>
                                    ` : ''}
                                </div>
                            `
                        };
                    });
                }
            },
            "columns": [
                { "data": "nro", "className": "text-center" },
                { "data": "dni" },
                { "data": "apellidos" },
                { "data": "nombres" },
                { "data": "Turno" },
                { "data": "Estado" },
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
        
       
    //boton de justificacion serenazgo para el dia de hoy
    $('#tperasissegu').on('click', '.justificar-registro', function() {
        var dni = $(this).data('id');
        var fechasa = $(this).data('fecha');
        var turno= $(this).data('turno');
        $('#dni_input_salida').val(dni); 
        $('#fecha_input_salida').val(fechasa); 
        $('#turnosa').val(turno); 
        $('#registroSalidaModal').modal('show'); 
    
        $('#guardarSalida').off('click').on('click', function() {
            var $btnGuardar = $(this);
            $btnGuardar.prop('disabled', true); 
    
            var dni = $('#dni_input_salida').val().trim();
            var horas = $('#hora_salida').val().trim();
            var comen = $('#comentario_salida').val().trim();
            var justificar = $('#justificar_salida').val().trim();
            var fecha2 = $('#fecha_input_salida').val().trim();
            var turno2 =$('#turnosa').val().trim();     
    
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
     

            // Definir el límite de hora
            let limiteHora = turno2 === 'Mañana' ? '16:00:00' : '02:00:00';
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
                    turno:turno2,
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
    

    //traer datos para editar
$('#tperasissegu').on('click', '.editar-registro', function() {
var dni = $(this).data('id');
        $.ajax({
            url: 'proceso/mantesernazgo.php?action=readone', 
            type: 'POST',
            data: { dni: dni },
            dataType: 'json',
            success: function (data) {
            if (data) {
                $('#dni_edit').val(data.dni);
                $('#fecha_edit').val(data.fecha);
                $('#turno_edit').val(data.turno);
                $('#hora_ingreso_edit').val(data.horai);
                $('#estado_ingreso_edit').val(data.estado);
                $('#justificacion_ingreso_edit').val(data.Justificado);
                $('#hora_salida_edit').val(data.horas);
                $('#estado_salida_edit').val(data.estado_salida);
                $('#justificacion_salida_edit').val(data.Justificado_salida);
                $('#comentario_edit').val(data.comentario);

                $('#editarre2').modal('show');
            } else {
                alert('No se encontraron datos para el DNI especificado.');
            }
            },
            error: function (xhr, status, error) {
            console.error('Error al obtener datos:', error);
            alert('Hubo un error al intentar cargar los datos.');
            }
          
        });    
});


$(document).off('click', '#guardar_edicion').on('click', '#guardar_edicion', function (e) {
    e.preventDefault();

 // Obtener los valores
var dni = $('#dni_edit').val();
var fecha = $('#fecha_edit').val();
var turno = $('#turno_edit').val();
var horaIngreso = $('#hora_ingreso_edit').val();
var estadoIngreso = $('#estado_ingreso_edit').val();
var justificacionIngreso = $('#justificacion_ingreso_edit').val();
var horaSalida = $('#hora_salida_edit').val();
var estadoSalida = $('#estado_salida_edit').val();
var justificacionSalida = $('#justificacion_salida_edit').val();
var comentario = $('#comentario_edit').val();

// Normalizar horas 00:00 a 00:00:00
if (horaIngreso === "00:00") {
    horaIngreso = "00:00:00";
    $('#hora_ingreso_edit').val(horaIngreso); 
}

if (horaSalida === "00:00") {
    horaSalida = "00:00:00";
    $('#hora_salida_edit').val(horaSalida);
}

// Validaciones para hora de ingreso
if (estadoIngreso === "Falto" && horaIngreso !== "00:00:00") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'La hora de ingreso debe ser 00:00:00 si el estado es Falto'
    });
    return;
} else if ((estadoIngreso === "Puntual" || estadoIngreso === "Tardanza") && horaIngreso === "00:00:00") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'La hora de ingreso no puede ser 00:00:00 si el estado es Puntual o Tardanza'
    });
    return;
}

// Validar justificación si es tardanza
if (estadoIngreso === "Tardanza" && justificacionIngreso.trim() === "") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe ingresar una justificación para la tardanza'
    });
    return;
}

// Validaciones para hora de salida
if (estadoSalida === "Falto" && horaSalida !== "00:00:00") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'La hora de salida debe ser 00:00:00 si el estado es Falto'
    });
    return;
} else if ((estadoSalida === "Salida Normal" || estadoSalida === "Salida Anticipada") && horaSalida === "00:00:00") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'La hora de salida no puede ser 00:00:00 si el estado es Salida Normal o Salida Anticipada'
    });
    return;
}

// Validar justificación si es salida anticipada
if (estadoSalida === "Salida Anticipada" && justificacionSalida.trim() === "") {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe ingresar una justificación para la salida anticipada'
    });
    return;
}


    // Enviar por AJAX
    $.ajax({
        url: 'proceso/mantesernazgo.php?action=update',
        type: 'POST',
        data: {
            dni: dni,
            fecha: fecha,
            turno: turno,
            horaIngreso: horaIngreso,
            estadoIngreso: estadoIngreso,
            justificacionIngreso: justificacionIngreso,
            horaSalida: horaSalida,
            estadoSalida: estadoSalida,
            justificacionSalida: justificacionSalida,
            comentario: comentario
        },
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                text: 'Los datos fueron actualizados correctamente.',
                confirmButtonText: 'Aceptar'
            });
            $('#editarre2').modal('hide');
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al guardar los datos.',
                confirmButtonText: 'Cerrar'
            });
            console.error('Error:', error);
        }
    });
});


//reporte de serenazgo
        $(document).on('click', '#filtrarrepor', function (e) {
            e.preventDefault();
        
            var fechai = $('#fechainrepor').val();
            var fechaf = $('#fechafirepor').val();
            var dnire = $('#dnireporte').val();

            var fechaInicio = new Date(fechai);
            var fechaFin = new Date(fechaf);
            
            if (!fechai || !fechaf) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Fechas incompletas',
                    text: 'Debes ingresar ambas fechas',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
        
            if (fechaInicio > fechaFin) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fechas incorrectas',
                    text: 'La fecha de inicio no puede ser mayor que la fecha final',
                    confirmButtonText: 'Aceptar'
                });
                return; 
            }
            if (dnire !== '') {
                var dniValido = /^\d{8}$/.test(dnire);
                if (!dniValido) {
                    Swal.fire({
                        icon: 'error',
                        title: 'DNI inválido',
                        text: 'El DNI debe contener exactamente 8 dígitos numéricos',
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }
            }
            
        
            $.ajax({
                url: 'proceso/mantesernazgo.php?action=filtroreporte',
                type: 'POST',
                dataType: 'json',  
                data: { fechai: fechai, fechaf: fechaf,dnire },
                success: function (data) {
                    
                    if (data.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.error,
                            confirmButtonText: 'Aceptar'
                        });
                        return;
                    }
        
                    let table = $('#treposeguri').DataTable();
                    table.clear();
                    data.forEach(function (serenazgo, index) {
                        let horaiFormatted = "No hay registro";
                        let horasFormatted = "No hay registro";
                        let minutosDesc = serenazgo.minutos_descu ? `${serenazgo.minutos_descu} minutos` : "0 minutos";
                        let descuentoDia = serenazgo.descuento_dia ? `S/. ${serenazgo.descuento_dia}` : "S/. 0";
                        if (serenazgo.turno === "Mañana") {
                            horaiFormatted = serenazgo.horai ? `${serenazgo.horai} AM` : "No hay registro";
                            horasFormatted = serenazgo.horas ? `${serenazgo.horas} PM` : "No hay registro";
                        } else if (serenazgo.turno === "Tarde") {
                            horaiFormatted = serenazgo.horai ? `${serenazgo.horai} PM` : "No hay registro";
                            horasFormatted = serenazgo.horas ? `${serenazgo.horas} AM` : "No hay registro";
                        }
                        table.row.add([
                            index + 1,
                            serenazgo.dni,
                            serenazgo.fecha,
                            serenazgo.dia,
                            serenazgo.turno,
                            horaiFormatted,
                            serenazgo.estado || "No registrado",
                            serenazgo.Justificado || "No hay registro",
                            serenazgo.comentario || "Sin comentarios",
                            horasFormatted,
                            serenazgo.estado_salida || "No registrado",
                            serenazgo.Justificado_salida || "No hay registro",
                            serenazgo.comentario_salida || "Sin comentarios",
                            minutosDesc,
                            descuentoDia
                        ]);
                    });
        
                    table.draw(false);
                },
                error: function () {
                 
                }
            });
        });


        
});