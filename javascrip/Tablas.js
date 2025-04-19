
//TABLAS
$(document).ready(function () { 
    if ($.fn.DataTable.isDataTable('#tusu')) {
        $('#tusu').DataTable().clear().destroy();
    }
    if ($.fn.DataTable.isDataTable('#tasis')) {
        $('#tasis').DataTable().clear().destroy();
    }
    if ($.fn.DataTable.isDataTable('#tper')) {
        $('#tper').DataTable().clear().destroy();
    }
    if ($.fn.DataTable.isDataTable('#tsalidas')) {
        $('#tsalidas').DataTable().clear().destroy();
    }
    // Inicializar tabla usuario
$('#tusu').DataTable({
    "paging": true,
    "searching": true,
    "ordering": true,
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
    
    
    
});

if ($.fn.DataTable.isDataTable('#treposeguri')) {
    $('#treposeguri').DataTable().clear().destroy();
}
//reporte de serenazgo
$('#treposeguri').DataTable({
    "paging": false, 
    "searching": true, 
    "ordering": false, 
    "info": true, 
    "autoWidth": false, 
    "scrollX": true, 
    "responsive": true, 
    "language": {
        "search": "Buscar:",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "infoEmpty": "No hay registros disponibles",
        "zeroRecords": "No se encontraron registros",
        "paginate": {
            "next": "Siguiente",
            "previous": "Anterior"
        }
    },
    "dom": '<"row"<"col-sm-12 col-md-6"B><"col-sm-12 col-md-6"f>>' + 
           '<"row"<"col-sm-12"tr>>' + 
           '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>', 
    "buttons": [
        {
            extend: 'excelHtml5', 
            text: '<i class="bi bi-file-earmark-excel"></i> Exportar a Excel',
            className: 'btn btn-success',
            title: 'Reporte_de_Serenazgo' 
        },
        {
            extend: 'pdfHtml5', 
            text: '<i class="bi bi-file-earmark-pdf"></i> Exportar a PDF',
            className: 'btn btn-danger',
            title: 'reporte_de_Serenazgo', 
            customize: function (doc) {
                // Personalización del PDF
                doc.defaultStyle.fontSize = 10;
                doc.styles.tableHeader.fontSize = 10;
                doc.styles.title.fontSize = 14;
                doc.pageOrientation = 'landscape';  
            }
        }
    ]
});
//reporte de salidas
$('#treportesalida').DataTable({
    "paging": false, 
    "searching": true, 
    "ordering": false, 
    "info": true, 
    "autoWidth": false, 
    "scrollX": true, 
    "responsive": true, 
    "language": {
        "search": "Buscar:",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "infoEmpty": "No hay registros disponibles",
        "zeroRecords": "No se encontraron registros",
        "paginate": {
            "next": "Siguiente",
            "previous": "Anterior"
        }
    },
    "dom": '<"row"<"col-sm-12 col-md-6"B><"col-sm-12 col-md-6"f>>' + 
           '<"row"<"col-sm-12"tr>>' + 
           '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>', 
    "buttons": [
        {
            extend: 'excelHtml5', 
            text: '<i class="bi bi-file-earmark-excel"></i> Exportar a Excel',
            className: 'btn btn-success',
            title: 'Reporte_de_Salidas' 
        },
        {
            extend: 'pdfHtml5', 
            text: '<i class="bi bi-file-earmark-pdf"></i> Exportar a PDF',
            className: 'btn btn-danger',
            title: 'reporte_de_Salidas', 
            customize: function (doc) {
                // Personalización del PDF
                doc.defaultStyle.fontSize = 10;
                doc.styles.tableHeader.fontSize = 10;
                doc.styles.title.fontSize = 14;
                doc.pageOrientation = 'landscape';  
            }
        }
    ]
});
//reporte de asistencia
$('#tasis').DataTable({
    "paging": false, 
    "searching": true, 
    "ordering": false, 
    "info": true, 
    "autoWidth": false, 
    "scrollX": true, 
    "responsive": true, 
    "language": {
        "search": "Buscar:",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "infoEmpty": "No hay registros disponibles",
        "zeroRecords": "No se encontraron registros",
        "paginate": {
            "next": "Siguiente",
            "previous": "Anterior"
        }
    },
    "dom": '<"row"<"col-sm-12 col-md-6"B><"col-sm-12 col-md-6"f>>' + 
           '<"row"<"col-sm-12"tr>>' + 
           '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>', 
    "buttons": [
        {
            extend: 'excelHtml5', 
            text: '<i class="bi bi-file-earmark-excel"></i> Exportar a Excel',
            className: 'btn btn-success',
            title: 'Reporte_de_Asistencia' 
        },
        {
            extend: 'pdfHtml5', 
            text: '<i class="bi bi-file-earmark-pdf"></i> Exportar a PDF',
            className: 'btn btn-danger',
            title: 'reporte_de_Asistencia', 
            customize: function (doc) {
                // Personalización del PDF
                doc.defaultStyle.fontSize = 10;
                doc.styles.tableHeader.fontSize = 10;
                doc.styles.title.fontSize = 14;
                doc.pageOrientation = 'landscape';  
            }
        }
    ]
});
//iniciar tabla personal
$('#tper').DataTable({
    "paging": false,
    "searching": true,
    "ordering": false,
    "info": true,
    "autoWidth": false,
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
    "columnDefs": [
        { "width": "100px", "targets": 9 } 
    ]
});
//inicializar tabla salidas
$('#tsalidas').DataTable({
    "paging": false,
    "searching": true,
    "ordering": false,
    "info": true,
    "autoWidth": false,
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
    "columnDefs": [
        { "width": "100px", "targets": 8 } 
    ]
});

function obtenerUsuarios() {
    
        $.ajax({
            url: 'proceso/mantenusuario.php?action=read',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Limpiar la tabla de usuarios
                $('#tusu').DataTable().clear().draw();

                data.forEach(function (usuarios, index) {
                    let rol1;
                    if(usuarios.rol === "1"){
                     rol1="Administrador";
                    }else{
                        rol1="Personal";
                    }
                    $('#tusu').DataTable().row.add([
                        index + 1,
                        usuarios.idusudni,
                        usuarios.datos,
                        usuarios.usuario,
                        usuarios.password,
                        usuarios.email,
                        usuarios.Telefono,
                        rol1,
                        `
                        <button  class="btn btn-primary usuEditar" data-id="${usuarios.idusudni}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button  class="btn btn-danger usuEliminar" data-id="${usuarios.idusudni}">
                            <i class="bi bi-trash"></i>
                        </button>
                        `
                    ]).draw(false);
                });
            },
            error: function (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        });
    }


    function obtenerpersonal() {
        $.ajax({
            url: 'proceso/mantenpersonal.php?action=read',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#tper').DataTable().clear().draw();
                data.forEach(function (personal, index) {

                    let estado;
                    if (personal.estado === "activo") {
                        estado = '<span class="punto punto-activo"></span> Activo';
                    } else {
                        estado = '<span class="punto punto-inactivo"></span> Inactivo';
                    }
                    var imagen = '';
                    if (personal.foto && personal.foto.startsWith('data:image')) {
                        imagen = `<img src="${personal.foto}" alt="Imagen" width="50" height="50">`;
                    } else {
                        imagen = '<img src=" img/usuariodefecto.png" alt="Imagen predeterminada" width="50" height="50">';
                    }
                    
                    let btneditar = `<button  class="btn btn-primary perEditar" data-id="${personal.dni}">
                            <i class="bi bi-pencil"></i>
                        </button>`;
                    let btneliminar = `<button  class="btn btn-danger perEliminar" data-id="${personal.dni}">
                            <i class="bi bi-trash"></i>
                        </button>`;
                    let btnimpre=`<button  class="btn btn-dark perImpri" data-id="${personal.dni}">
                           <i class="bi bi-printer"></i>
                        </button>`;


                    if (personal.estado === "inactivo") {
                        btnimpre =`<button  class="btn btn-dark perImpri" data-id="${personal.dni}" disabled>
                        <i class="bi bi-printer"></i>
                        </button>`;
                    }


                    $('#tper').DataTable().row.add([
                        index + 1,
                        imagen,
                        personal.dni,
                        personal.apellidos,
                        personal.nombres,
                        personal.modalidad_contratacion,
                        personal.nombre_cargo,
                        estado,
                        personal.fecha_nacimiento,
                        personal.edad,
                       "S/."+personal.sueldo,
                        personal.fecha_registro,
                        btneditar + btneliminar +btnimpre
                    ]).draw(false);
                });
            },
            error: function (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        });
    }

    
    function obtenerlistadoasis() {
    
        $.ajax({
            url: 'proceso/asistenciaman.php?action=read',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Limpiar la tabla de usuarios
                $('#tasis').DataTable().clear().draw();

                data.forEach(function (asistencia, index) {
                    let minutosTarde = parseInt(asistencia.minutos_descut) || 0;
                    let minutosManana = parseInt(asistencia.minutos_descum) || 0;
                    let totalMinutos = minutosTarde + minutosManana;
    
                    let minutosdes = totalMinutos === 0 
                        ? "No hay descuento" 
                        : `${totalMinutos} minutos ( ${minutosTarde} Tarde + ${minutosManana} Mañana)`;
    
                    let estado = asistencia.estadot || "No hay registro";
                    $('#tasis').DataTable().row.add([
                        index + 1,
                        asistencia.dni,
                        asistencia.fecha,
                        asistencia.dia,
                        asistencia.horaim ? `${asistencia.horaim} AM` : "No hay registro",
                        asistencia.estadom || "No hay registro",
                        asistencia.horait ? `${asistencia.horait} PM` : "No hay registro",
                        estado,
                        asistencia.horast ? `${asistencia.horast} PM` : "No hay registro",
                        minutosdes,
                        "S/."+asistencia.descuento_dia,
                        asistencia.comentario || "Sin comentarios"
                    ]).draw(false);
                });
            },
            error: function (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        });
    }


    //reporte de serenazgo
    function obtenerreporsere() {

      
        $.ajax({
            url: 'proceso/mantesernazgo.php?action=readreporte',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const tabla = $('#treposeguri').DataTable();
    
                // Limpiar y preparar la tabla
                tabla.clear();
                console.log("DATA COMPLETA:", data);
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
                    tabla.row.add([
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
    
                tabla.draw();
            },
            error: function (error) {
                console.error('Error al obtener los datos:', error);
            }
        });
    }
    
    function obtenersalidas() {
        $.ajax({
            url: 'proceso/mantesalidas.php?action=readhoysal',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const tabla = $('#tsalidas').DataTable();
    
                // Limpiar y preparar la tabla
                tabla.clear();
                data.forEach(function (salidas, index) {
                    tabla.row.add([
                        index + 1,
                        salidas.dni || "",
                        (salidas.apellidos || "") + " " + (salidas.nombres || ""),
                        salidas.turno || "",
                        salidas.hora_salida || "No registrado",
                        salidas.hora_reingreso || "No hay registro",
                        salidas.motivo || "Sin motivo",
                        salidas.comentario || "Sin comentarios",
                        `<div class="btn-group" role="group">
                        <button class="btn btn-primary btn-sm saleditar" data-id="${salidas.id_sali || ''}">
                            <i class="bi bi-pencil"></i> Editar
                        </button>
                        <button class="btn btn-warning btn-sm usuSalidaFinal" data-id="${salidas.id_sali || ''}">
                            <i class="bi bi-door-open"></i> Salida Final
                        </button>
                    </div>`
                    ]);
                });
    
                tabla.draw();
            },
            error: function (error) {
                console.error('Error al obtener los datos:', error);
            }
        });
    }
    
    function reportesalidas() {
        $.ajax({
            url: 'proceso/mantesalidas.php?action=reportesalidas',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                const tabla = $('#treportesalida').DataTable();
    
                tabla.clear();
    
                data.forEach(function (salida, index) {
                    // hora_salida con AM/PM
                    let horaSalida = salida.hora_salida || '';
                    if (horaSalida !== '') {
                        const hora = parseInt(horaSalida.split(':')[0]);
                        const ampm = hora < 12 ? 'AM' : 'PM';
                        horaSalida += ' ' + ampm;
                    } else {
                        horaSalida = 'No registrado';
                    }
    
                    // hora_reingreso con AM/PM
                    let horaReingreso = salida.hora_reingreso || '';
                    if (horaReingreso !== '') {
                        const hora = parseInt(horaReingreso.split(':')[0]);
                        const ampm = hora < 12 ? 'AM' : 'PM';
                        horaReingreso += ' ' + ampm;
                    } else {
                        horaReingreso = 'No registrado';
                    }
    
                    tabla.row.add([
                        index + 1,
                        salida.dni || '',
                        salida.fecha_salida || '',
                        salida.dia || '',
                        salida.turno || '',
                        horaSalida,
                        horaReingreso,
                        salida.motivo || 'Sin motivo',
                        salida.comentario || 'Sin comentarios'
                    ]);
                });
    
                tabla.draw();
            },
            error: function (error) {
                console.error('error al obtener el reporte de salidas:', error);
            }
        });
    }
    
    
    $(document).on('click', '#limpiarfil', function (e) {
        setTimeout(() => {
            obtenerlistadoasis(); 
        }, 100); 
    });
    $(document).on('click', '#limpiarsalida', function (e) {
        setTimeout(() => {
            reportesalidas();
        }, 100); 
    });

    $(document).on('click', '#limpiarreporte', function (e) {
        setTimeout(() => {
            obtenerreporsere();
        }, 100); 
    });
    reportesalidas();
    obtenersalidas();
    obtenerUsuarios();
    obtenerpersonal();
    obtenerreporsere();
    obtenerlistadoasis();


});


