
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


//iniciar tabla personal
$('#tper').DataTable({
    "paging": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "lengthMenu": [5,10, 30, 50,100],  
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
                        personal.cargo,
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

    obtenerUsuarios();
    obtenerpersonal();


  


});
