let tablaRecords;

let mismoNombre;
let datosRecordsLocalStorage;
let datosPlayer;

let tr, tdNombre, tdDementores, tdNivel;

function recuperarDatosLocal() {

    // se recuperan datos del localStorage si hay
    if (localStorage.getItem("datosRecords")) {

        // donde se situa las filas de la tabla
        tablaRecords = document.getElementById("tablaRecords").getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];

        // se extrae el item donde está la información de los records y se pasa a un Objeto
        datosRecordsLocalStorage = JSON.parse(localStorage.getItem("datosRecords"));

        // por cada dato se crea una fila (tr) donde cada elemento de ese dato tendrá una celda (td)
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

    // si hay records almacenados en el localStorage ...
    if (localStorage.getItem("datosRecords")) {

        // se extraen convirtiendolos en array de objetos
        datosRecordsLocalStorage = JSON.parse(localStorage.getItem("datosRecords"));

        datosRecordsLocalStorage.forEach(dato => {

            // para cada dato se mira si ya estaba antes registrado, 
            // se quedará con el que más número de dementores derrotados tenga
            if (dato.nombre === datosNombre) {

                if (datosDementores > dato.dementores) {

                    dato.dementores = datosDementores;
                    dato.nivel = datosNivel;

                } else {

                    datosDementores = dato.dementores;
                    datosNivel = dato.nivel;
                }

                mismoNombre = true;
            }
        });

        if (mismoNombre) {

            // una vez con los datos actualizados, se agrega al localhost combiertiendo el array de objetos de tal manera
            // que pueda guardarlo el localStorage
            localStorage.setItem("datosRecords", JSON.stringify(datosRecordsLocalStorage));

        } else {

            // si el player no estaba en el localStorage, se añade sus datos sin mirar qué puntuación tenía antes
            let datosPlayer = {
                nombre: datosNombre,
                dementores: datosDementores,
                nivel: datosNivel
            }

            datosRecordsLocalStorage.push(datosPlayer);

            localStorage.setItem("datosRecords", JSON.stringify(datosRecordsLocalStorage));
        } 
    
    // ... sinó, se crea la primera fila de datos como array de objetos, en vez de como un solo objeto
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
