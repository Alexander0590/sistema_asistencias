$(document).ready(function () {
    listar_faltas();

    function listar_faltas() {
        $.ajax({
            async: true,
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_faltas' },
            success: function (response) {
                if (response == 'sin_data') {
                    $('#cuerpo_tabla_fd').html('');
                } else {
                    var registro = JSON.parse(response);
                    var template = '';
                    console.log(registro);
                    var i = 0;
                    for (z in registro) {
                        i++;
                        template +=
                            '<tr class="fila-falta">' + // Clase para filas de faltas
                            '<td class="text-center align-middle">' + i + '</td>' +
                            '<td>' + registro[z].dni + '</td>' +
                            '<td>' + registro[z].apellidos + '</td>' +
                            '<td>' + registro[z].nombres + '</td>' +
                            '<td>' +
                            '<button class="btn btn-danger btn-sm registrarf" data-id=' + registro[z].dni + '>' +
                            '<i class="bi bi-x-circle"></i> Registrar falta</button>' +
                            '</td>' +
                            '</tr>';
                    }
                    $('#cuerpo_tabla_fd').html(template);
                }
            }
        });
        listar_asistencias();
    }

    $(document).on('click', '.registrarf', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        alert('ok');
    });

    function listar_asistencias() {
        $.ajax({
            async: true,
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_registrados' },
            success: function (response2) {
                if (response2 == 'sin_data') {
                    $('#cuerpo_tabla_ad').html('');
                } else {
                    var registro2 = JSON.parse(response2);
                    var template2 = '';
                    console.log(registro2);
                    var i = 0;
                    for (z in registro2) {
                        i++;
                        template2 +=
                            '<tr class="fila-asistencia">' + // Clase para filas de asistencia
                            '<td class="text-center align-middle">' + i + '</td>' +
                            '<td>' + registro2[z].dni + '</td>' +
                            '<td>' + registro2[z].apellidos + '</td>' +
                            '<td>' + registro2[z].nombres + '</td>' +
                            '<td>' +
                            '<button class="btn btn-success btn-sm registrara" data-id=' + registro2[z].dni + '>' +
                            '<i class="bi bi-pencil"></i> Editar</button>' +
                            '</td>' +
                            '</tr>';
                    }
                    $('#cuerpo_tabla_ad').html(template2);
                }
            }
        });
    }
});