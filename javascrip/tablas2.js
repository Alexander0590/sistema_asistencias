$(document).ready(function () { 
    if ($.fn.DataTable.isDataTable('#tcargos')) {
        $('#tcargos').DataTable().clear().destroy();
    }

    if ($.fn.DataTable.isDataTable('#tmodalidad')) {
        $('#tmodalidad').DataTable().clear().destroy();
    }
    if ($.fn.DataTable.isDataTable('#revacaciones')) {
        $('#revacaciones').DataTable().clear().destroy();
    }


    //iniciar tabla cargos
    $('#tcargos').DataTable({
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
            { "width": "100px", "targets": 4 } 
        ]
    });
//reporte de minutos recuperados
$('#tminrecu').DataTable({
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
            title: 'Reporte_de_Minutos_recuperados' 
        },
        {
            extend: 'pdfHtml5', 
            text: '<i class="bi bi-file-earmark-pdf"></i> Exportar a PDF',
            className: 'btn btn-danger',
            title: 'reporte_de_Minutos_recuperados', 
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
    //iniciar tabla modalidad
    $('#tmodalidad').DataTable({
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
            { "width": "100px", "targets": 4 } 
        ]
    });

//reporte de vacaciones
$('#revacaciones').DataTable({
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
            title: 'Reporte_de_Vacaciones' 
        },
        {
            extend: 'pdfHtml5', 
            text: '<i class="bi bi-file-earmark-pdf"></i> Exportar a PDF',
            className: 'btn btn-danger',
            title: 'reporte_de_Vacaciones', 
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

    function  obtenercargos() {
    
        $.ajax({
            url: 'proceso/mantecargosymodalidad.php?action=read',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Limpiar la tabla de cargos
                $('#tcargos').DataTable().clear().draw();

                data.forEach(function (cargos, index) {
                    let estado;
                    if (cargos.estado === "activo") {
                        estado = '<span class="punto punto-activo"></span> Activo';
                    } else {
                        estado = '<span class="punto punto-inactivo"></span> Inactivo';
                    }
                    $('#tcargos').DataTable().row.add([
                        index + 1,
                        cargos.nombre,
                        cargos.descripcion,
                        cargos.fecha_creacion,
                        estado,
                        `
                        <button  class="btn btn-primary cargoEditar" data-id="${cargos.idcargo}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button  class="btn btn-danger cargoEliminar" data-id="${cargos.idcargo}">
                            <i class="bi bi-trash"></i>
                        </button>
                        `
                    ]).draw(false);
                });
            },
            error: function (error) {
                console.error('Error al obtener los cargos:', error);
            }
        });
    }


    function  obtenermodalidad() {
        $.ajax({
            url: 'proceso/mantecargosymodalidad.php?action=read2',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Limpiar la tabla de modalidad 
                $('#tmodalidad').DataTable().clear().draw();

                data.forEach(function (modalidad, index) {
                    let estado;
                    if (modalidad.estado === "activo") {
                        estado = '<span class="punto punto-activo"></span> Activo';
                    } else {
                        estado = '<span class="punto punto-inactivo"></span> Inactivo';
                    }
                    $('#tmodalidad').DataTable().row.add([
                        index + 1,
                        modalidad.nombrem,
                        modalidad.descripcion,
                        modalidad.fecha_creacion,
                        estado,
                        `
                        <button  class="btn btn-primary modaliEditar" data-id="${modalidad.idmodalidad}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button  class="btn btn-danger modaliEliminar" data-id="${modalidad.idmodalidad}">
                            <i class="bi bi-trash"></i>
                        </button>
                        `
                    ]).draw(false);
                });
            },
            error: function (error) {
                console.error('Error al obtener los cargos:', error);
            }
        });
    }


    function reporminutosrecu() {
        $.ajax({
            url: 'proceso/minutosrecu.php?action=minutorecu',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                const tabla = $('#tminrecu').DataTable();
    
                tabla.clear();
    
                data.forEach(function (minutorecu, index) {
                   
                    tabla.row.add([
                        index + 1,
                        minutorecu.dni || 'No hay registro',
                        minutorecu.nombres || 'No hay registro',
                        minutorecu.apellidos || 'No hay registro',
                         minutorecu.fecha || 'No hay registro',
                        minutorecu.minutos_recuperados || 'No hay registro'
                       
                    ]);
                });
    
                tabla.draw();
            },
            error: function (error) {
                console.error('error al obtener el reporte de salidas:', error);
            }
        });
    }

 // Llamar las funciones inmediatamente
obtenercargos();
obtenermodalidad();
reporminutosrecu();
});