
function recuperarDatosLocal() {
    
    let tablaRecords = document.getElementById(tablaRecords).getElementsByTagName

    if (localStorage.length === 0) {

        console.log("no hay datos en el almacenamiento local");

    } else {

        localStorage.array.forEach(element, f => {
            
        });
    }    	
}























function almacenarDatosLocal(datosNombre, datosDementores, datosNivel) {

    let mismoNombre = false;

    if (localStorage.getItem("datosRecords")) {

        let datosRecordsLocalStorage = JSON.parse(localStorage.getItem("datosRecords"));

        datosRecordsLocalStorage.forEach(dato => {

            if (dato.nombre === datosNombre) {

                if (datosDementores > dato.dementores) {

                    dato.dementores = datosDementores;
                    dato.nivel = datosNivel;

                } else {

                    datosDementores = dato.dementores;
                    datosNivel = dato.nivel;
                }

                mismoNombre = true;

                localStorage.setItem("datosRecords", JSON.stringify(datosRecordsLocalStorage));
            }
        });

        if (mismoNombre) {

            localStorage.setItem("datosRecords", JSON.stringify(datosRecordsLocalStorage));

        } else {

            let datosPlayer = {
                nombre: datosNombre,
                dementores: datosDementores,
                nivel: datosNivel
            }

            datosRecordsLocalStorage.push(datosPlayer);

            localStorage.setItem("datosRecords", JSON.stringify(datosRecordsLocalStorage));
        } 

    } else {

        let datosPlayer = [{
            nombre: datosNombre,
            dementores: datosDementores,
            nivel: datosNivel
        }];

        console.log(datosPlayer);

        localStorage.setItem("datosRecords", JSON.stringify(datosPlayer));
    }
}
