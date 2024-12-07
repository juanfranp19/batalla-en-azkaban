let tablaRecords;

let mismoNombre;
let datosRecordsLocalStorage;
let datosPlayer;

let tr, tdNombre, tdDementores, tdNivel;

function recuperarDatosLocal() {

    if (localStorage.getItem("datosRecords")) {

        tablaRecords = document.getElementById("tablaRecords").getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];

        datosRecordsLocalStorage = JSON.parse(localStorage.getItem("datosRecords"));

        datosRecordsLocalStorage.forEach(dato => {

            tr = document.createElement("tr");

            tdNombre = document.createElement("td");
            tdNombre.textContent = dato.nombre;

            tdDementores = document.createElement("td");
            tdDementores.textContent = dato.dementores;

            tdNivel = document.createElement("td");
            tdNivel.textContent = dato.nivel;

            tr.appendChild(tdNombre);
            tr.appendChild(tdDementores);
            tr.appendChild(tdNivel);

            tablaRecords.appendChild(tr);
        });

        console.log("datos del localStorage cargados");
    }
}

function almacenarDatosLocal(datosNombre, datosDementores, datosNivel) {

    // variable para detectar si en el localStorage hay datos del mismo player
    mismoNombre = false;

    if (localStorage.getItem("datosRecords")) {

        datosRecordsLocalStorage = JSON.parse(localStorage.getItem("datosRecords"));

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

        datosPlayer = [{
            nombre: datosNombre,
            dementores: datosDementores,
            nivel: datosNivel
        }];

        console.log(datosPlayer);

        localStorage.setItem("datosRecords", JSON.stringify(datosPlayer));
    }
}
