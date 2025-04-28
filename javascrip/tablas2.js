$(document).ready(function () { 
    if ($.fn.DataTable.isDataTable('#tcargos')) {
        $('#tcargos').DataTable().clear().destroy();
    }

    if ($.fn.DataTable.isDataTable('#tmodalidad')) {
        $('#tmodalidad').DataTable().clear().destroy();
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

    obtenercargos();
    obtenermodalidad();

});