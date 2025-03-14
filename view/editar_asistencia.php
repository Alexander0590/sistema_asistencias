<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div id="centeredFormWrapper" class="d-flex justify-content-center align-items-center ">
    <div class="row gx-0 justify-content-center align-items-center w-100">
        <div class="col-md-9 col-lg-9" id="formColumn">
            <div class="card shadow" id="formCard">
                <div class="card-header text-center" id="cardHeader">
                    <b><i class="bi bi-pencil-square"></i> EDITAR  ASISTENCIA</b>
                </div>
                <div class="card-body" id="formCardBody">
                    
                    <form class="row g-3" id="editasistenciaform">
                        <!-- sueldo del personal -->
                         <input type="hidden"  id="sueldopriv2">

                        <!-- Código -->
                        <div class="col-md-3" id="codigoContainer">
                            <label for="acodigo" class="form-label">
                                <i class="bi bi-upc-scan"></i> DNI
                            </label>
                            <input type="number" class="form-control" id="acodigo2" min="0" max="99999999" oninput="validarLongitud(this)" required>
                        </div>
                        <!-- Datos del Personal -->
                        <div class="col-md-6" id="datosContainer">
                            <label for="adatos" class="form-label">
                                <i class="bi bi-calendar"></i> Datos del Personal
                            </label>
                            <input type="text" class="form-control" id="adatos2" >
                        </div>
                        <!-- Fecha de Registro -->
                        <div class="col-md-3" id="fechaContainerRegistro">
                            <label for="fecha" class="form-label">
                                <i class="bi bi-calendar"></i> Fecha de Registro
                            </label>
                            <input type="date" class="form-control" id="fechare2">
                        </div>
                       
                        <!-- Sección para el turno de la mañana -->
                        <div class="col-md-12 mt-4" id="divm2">
                            <h5>Turno de la Mañana</h5>
                            <div class="row">
                                <div class="col-md-4 mb-2">
                                    <label for="hentradam" class="form-label">
                                        <i class="bi bi-clock"></i> Hora de Entrada
                                    </label>
                                    <input type="time" class="form-control" id="hentradam2" min="7:00" max="13:00">
                                </div>
                                <div class="col-md-4">
                                    <label for="estadom" class="form-label">
                                        <i class="bi bi-file-text"></i> Estado
                                    </label>
                                    <select class="form-select" id="estadom2">
                                        <option value="">Seleccione</option>
                                        <option value="1">Puntual</option>
                                        <option value="2">Tardanza</option>
                                        <option value="3">Falta</option>
                                        <option value="4">Trabajo en campo</option>
                                    </select>
                                </div>
                                <div class="col-md-4 mb-2" id="divmdm" >
                                    <label for="mdesm" class="form-label">
                                        <i class="bi bi-clock-history"></i> Minutos de Descuento
                                    </label>
                                    <input type="number" class="form-control" id="mdesm2">
                                </div>
                                <div class="col-md-4" id="divjusm2" >
                                    <label class="form-label">
                                        <i class="bi bi-file-earmark"></i> Justificado
                                    </label>
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="justificadom2" id="justsim" value="si">
                                            <label class="form-check-label" for="justsim">Sí</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="justificadom2" id="justnom" value="no">
                                            <label class="form-check-label" for="justnom">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12" id="divcomm2" >
                                    <label for="comenm" class="form-label">
                                        <i class="bi bi-chat-left"></i> Comentarios
                                    </label>
                                    <textarea class="form-control" id="comenm2" rows="3" placeholder="Escribe aquí..."></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Sección para el turno de la tarde -->
                        <div class="col-md-12 mt-4" id="divt2">
                            <h5>Turno de la Tarde</h5>
                            <div class="row">
                                <div class="col-md-4 mb-2">
                                    <label for="hentradat" class="form-label">
                                        <i class="bi bi-clock"></i> Hora de Entrada
                                    </label>
                                    <input type="time" class="form-control" id="hentradat2" min="13:45" max="18:00">
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label for="hsalidat" class="form-label">
                                        <i class="bi bi-clock"></i> Hora de Salida
                                    </label>
                                    <input type="time" class="form-control" id="hsalidat2">
                                </div>
                                <div class="col-md-4">
                                    <label for="estadot" class="form-label">
                                        <i class="bi bi-file-text"></i> Estado
                                    </label>
                                    <select class="form-select" id="estadota2">
                                        <option value="">Seleccione</option>
                                        <option value="1">Puntual</option>
                                        <option value="2">Tardanza</option>
                                        <option value="3">Falta</option>
                                        <option value="4">Trabajo en campo</option>
                                    </select>
                                </div>
                                <div class="col-md-4 mb-2" id="divmdt">
                                    <label for="mdest" class="form-label">
                                        <i class="bi bi-clock-history"></i> Minutos de Descuento
                                    </label>
                                    <input type="number" class="form-control" id="mdest2">
                                </div>
                                <div class="col-md-4" id="divjust2" >
                                    <label class="form-label">
                                        <i class="bi bi-file-earmark"></i> Justificado
                                    </label>
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="justificadot2" id="justsit" value="si">
                                            <label class="form-check-label" for="justsit">Sí</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="justificadot2" id="justnot" value="no">
                                            <label class="form-check-label" for="justnot">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12" id="divcomt2" >
                                    <label for="coment" class="form-label">
                                        <i class="bi bi-chat-left"></i> Comentarios
                                    </label>
                                    <textarea class="form-control" id="coment" rows="3" placeholder="Escribe aquí..."></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Sección de Pagos -->
                        <div class="col-md-12 mt-4">
                            <h5>Pagos</h5>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="totaldescuento" class="form-label">
                                        <i class="bi bi-cash"></i> Total de Descuento
                                    </label>
                                    <input type="number" class="form-control" id="totaldescuento2" >
                                </div>
                                <div class="col-md-4">
                                    <label for="totalminutos" class="form-label">
                                        <i class="bi bi-clock-history"></i> Total de Minutos de Descuento
                                    </label>
                                    <input type="number" class="form-control" id="totalminutos2" >
                                </div>
                               </div>

                        <!-- Botones -->
                        <div class="col-12 text-center mt-4">
                    
                            <button type="button" class="btn btn-warning" id="btacasis" >
                                <i class="bi bi-arrow-clockwise"></i> Actualizar
                            </button>
                            
                            <button type="reset" class="btn btn-secondary" id="btnLimpiar">
                                <i class="bi bi-arrow-repeat"></i> Limpiar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>