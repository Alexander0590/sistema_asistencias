$(document).ready(function () {
    listar_serefaltasse();
    function listar_serefaltasse() {
        $.ajax({
            async: true,
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_serenazgoen'},
            success: function (response) {
                try {
                        
                    var registros2 = JSON.parse(response);
    
                    var template = '';
                    var i = 0;
    
                    if (registros2.length === 0) {
                        $('#cuerpo_tabla_en_t1').html('<tr><td colspan="8" class="text-center">No hay registros</td></tr>');
                    } else {
                        for (var z in registros2) {
                            i++;
                            template +=
                                '<tr class="fila-falta">' +
                                '<td class="text-center align-middle">' + i + '</td>' +
                                '<td>' + registros2[z].dni + '</td>' +
                                '<td>' + registros2[z].apellidos + '</td>' +
                                '<td>' + registros2[z].nombres + '</td>' +
                                '<td>' + registros2[z].turno + '</td>' +
                                '<td>' + registros2[z].fecha + '</td>' +
                                '<td>' + registros2[z].dia_semana + '</td>' +
                                '<td class="text-center align-middle">' +
                                '<div class="d-flex justify-content-center gap-1">' +
                                '<button class="btn btn-danger btn-sm registrarf d-block" style="padding: 3px 6px; font-size: 15px;" data-id="' + registros2[z].dni + '">' +
                                '<i class="bi bi-x-circle"></i> Registrar falta' +
                                '</button>' +
                                '<button class="btn btn-success btn-sm registrartc d-block" style="padding: 3px 6px; font-size: 15px;" data-id="' + registros2[z].dni + '">' +
                                '<i class="bi bi-check-circle"></i> Registrar Trabajo en Campo' +
                                '</button>' +
                                '</div>' +
                                '</td>' +
                                '</tr>';
                        }
                        $('#cuerpo_tabla_en_t1').html(template);
                    }
                } catch (error) {
                    console.error("Error al procesar JSON: ", error, response);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en AJAX:", status, error);
            }
        });
    
        listar_asistenciasse(); 
    }
    

    listar_salidasr();
    function listar_salidasr() {
        $.ajax({
            async: true,
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_serenazgosa' },
            success: function (response) {
                try {
                    var registros3 = JSON.parse(response);
                    console.log(registros3);
    
                    var template = '';
                    var i = 0;
    
                    if (registros3.length === 0) {
                        $('#cuerpo_tabla_fd').html('');
                    } else {
                        for (z in registros3) {
                            i++;
                            template +=
                                '<tr class="fila-falta">' +
                                '<td class="text-center align-middle">' + i + '</td>' +
                                '<td>' + registros2[z].dni + '</td>' +
                                '<td>' + registros2[z].apellidos + '</td>' +
                                '<td>' + registros2[z].nombres + '</td>' +
                                '<td class="text-center align-middle" style="white-space: nowrap; width: 100px;">' +
                                '<div class="d-flex justify-content-center gap-1">' +
                                '<button class="btn btn-danger btn-sm registrarf d-block" style="padding: 3px 6px; font-size: 15px;" data-id="' + registros2[z].dni + '">' +
                                '<i class="bi bi-x-circle"></i> Registrar falta' +
                                '</button>' +
                                '<button class="btn btn-success btn-sm registrartc d-block" style="padding: 3px 6px; font-size: 15px;" data-id="' + registros2[z].dni + '">' +
                                '<i class="bi bi-check-circle"></i> Registrar Trabajo en Campo' +
                                '</button>' +
                                '</div>' +
                                '</td>' +
                                '</tr>';
                        }
                        $('#cuerpo_tabla_fd').html(template);
                    }
                } catch (error) {
                    console.error("Error al procesar JSON: ", error, response);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en AJAX:", status, error);
            }
        });
        listar_asistenciasse();
    }
  

    function listar_asistenciasse() {
        $.ajax({
            async: true,
            url: 'proceso/proceso_asistencia_diaria.php',
            type: 'GET',
            data: { accion: 'listar_serenazgo' },
            success: function (response2) {
                let template2 = '';
                var registro2 = JSON.parse(response2);
                if (registro2 === 'sin_data') {
                    template2 += `
                        <tr>
                            <td colspan="5" class="text-center text-muted">
                                No hay asistencias hoy
                            </td>
                        </tr>`;
                } else {
                    var registro2 = JSON.parse(response2);
                    var i = 0;
    
                    for (z in registro2) {
                        i++;
                        template2 += `
                            <tr class="fila-asistencia">
                                <td class="text-center align-middle">${i}</td>
                                <td>${registro2[z].dni}</td>
                                <td>${registro2[z].apellidos}</td>
                                <td>${registro2[z].nombres}</td>
                                <td>
                                    <button class="btn btn-primary btn-sm bg-primary registrara" data-id="${registro2[z].dni}">
                                        <i class="bi bi-pencil"></i> Editar
                                    </button>
                                </td>
                            </tr>`;
                    }
                }
    
                $('#cuerpo_tabla_ad').html(template2);
            },
            
        });
    }
    
});
