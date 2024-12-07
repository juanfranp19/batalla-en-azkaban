
function recuperarDatosLocal() {		

    if (localStorage.length === 0) {

        console.log("no hay datos en el almacenamiento local");

    } else {

        localStorage.array.forEach(element, f => {
            
        });
    }    	
}



function almacenarDatosLocal(datosNombre, datosDementores, datosNivel) {

    if (localStorage.getItem(datosNombre)) {

        let dementoresDerrotadosAnteriorPartida = JSON.parse(localStorage.getItem(datosNombre)).dementores;
        let nivelAnteriorPartida = JSON.parse(localStorage.getItem(datosNombre)).nivel

        if (dementoresDerrotadosAnteriorPartida > datosDementores) {
            
            datosDementores = dementoresDerrotadosAnteriorPartida;
            datosNivel = nivelAnteriorPartida;
        }
    }

    let datosPlayer = {
        nombre: datosNombre,
        dementores: datosDementores,
        nivel: datosNivel
    }

    let datosPlayerJSON = JSON.stringify(datosPlayer);

    localStorage.setItem(datosNombre, datosPlayerJSON);
}
