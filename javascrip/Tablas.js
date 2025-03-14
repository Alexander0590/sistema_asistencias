
//TABLAS
$(document).ready(function () { 
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

$('#tasis').DataTable({
    "paging": false, // Deshabilitar paginación (muestra todos los registros)
    "searching": true, // Habilitar búsqueda
    "ordering": false, // Deshabilitar ordenamiento
    "info": true, // Mostrar información de registros
    "autoWidth": false, // Deshabilitar ajuste automático de ancho
    "scrollX": true, // Habilitar desplazamiento horizontal
    "responsive": true, // Habilitar responsividad
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
                        asistencia.horasm ? `${asistencia.horasm} PM` : "No hay registro",
                        asistencia.estadom || "No hay registro",
                        asistencia.horait ? `${asistencia.horait} PM` : "No hay registro",
                        asistencia.horast ? `${asistencia.horast} PM` : "No hay registro",
                        estado,
                        minutosdes,
                        asistencia.comentario || "Sin comentarios"
                    ]).draw(false);
                });
            },
            error: function (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        });
    }


    
    $(document).on('click', '#limpiarfil', function (e) {
        setTimeout(() => {
            obtenerlistadoasis(); 
        }, 100); 
    });
    obtenerUsuarios();
    obtenerpersonal();
    obtenerlistadoasis();


});


