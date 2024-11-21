window.onload = function() {

    let canvas, ctx;
    let idAnimacionCanvas, idAnimacionPlayer, idAnimacionHechizo, idIntervalDementor, idAnimacionDementor;

    let playerPotter;
    let xIzquierda, xDerecha, yUp, yDown, espacio;
    let posicionPlayer = 0;
    let posicionInicialPlayer;

    let hechizoPlayer;
    let xHechizo, yHechizo;
    let posicionHechizo = 0;
    let hechizoLanzado = false;
    let hechizoLista = [];
    let hechizo;      

    let dementor;
    let posicionDementor = 0;
    let posicionInicialDementor = 0;
    let dementoresLista = [];

    let botonNuevaPartida;
    let inputNombrePlayer;
    let pMensajePlayer;
    let nodePMensajePlayer;


    function start() {
    
        inputNombrePlayer = document.getElementById("nombrePlayer");
        pMensajePlayer = document.getElementById("mensajePlayer");
    
        const NOMBREJUGADOR = inputNombrePlayer.value;
    
        botonNuevaPartida.disabled = true;
    
        if (NOMBREJUGADOR) {
            
            nodePMensajePlayer = document.createTextNode("¡Hola, " + NOMBREJUGADOR + "!");
            pMensajePlayer.appendChild(nodePMensajePlayer);
    
            pMensajePlayer.style.display = 'block';
            
            inputNombrePlayer.style.display = 'none';
    
        } else {
            
            nodePMensajePlayer = document.createTextNode("¡Hola, jugador!");
            pMensajePlayer.appendChild(nodePMensajePlayer);
    
            pMensajePlayer.style.display = 'block';
            
            inputNombrePlayer.style.display = 'none';
        }
    
        cargarPartida();
    }





















    function dibujarPlayer() {
        ctx.drawImage(
            playerPotter.imagen,
            playerPotter.animacion[posicionPlayer][0],
            playerPotter.animacion[posicionPlayer][1],
            playerPotter.tamañoX,
            playerPotter.tamañoY, 
            playerPotter.x,
            playerPotter.y,
            playerPotter.tamañoX,
            playerPotter.tamañoY
        );
    }

    function dibujarHechizo() {
        ctx.drawImage(
            Hechizo.prototype.imagen,
            Hechizo.prototype.animacion[posicionHechizo][0],
            Hechizo.prototype.animacion[posicionHechizo][1],
            hechizo.tamañoX, 
            hechizo.tamañoY,
            hechizo.x, 
            hechizo.y,
            hechizo.tamañoX, 
            hechizo.tamañoY 
        );
    }
    
    


    function generarCanvas() {

        ctx.clearRect(0, 0, 600, 400);

        comandos();
        
        dibujarPlayer();

        generarDementor();
    }



























    function generarDementor() {

        //console.log(dementoresLista.length);

        if (dementoresLista.length === 0) {

            crearDementores();

            idIntervalDementor = setInterval(intervalDementor, 1000/300);
            idAnimacionDementor = setInterval(generarAnimacionDementor, 1000/5);
        }
    }

    function crearDementores() {

        // crea los dementores y los añade a la lista de los dementores vivos

        for (let i = 0; i < NUMEROdementores; i++) {

            let dementor = new Dementor();
            dementoresLista.push(dementor);
        }
    }

    function intervalDementor() {

        comprobarDementores();

        movimientoDementor();

        dibujarDementores();
    }

    function comprobarDementores() {

        //console.log("todo ok");

        if (dementoresLista.length === 0) {
            clearInterval(idIntervalDementor);
            clearInterval(idAnimacionDementor);
            console.log("fin animación dementor");
        }
    }

    function movimientoDementor() {

        for (let i = 0; i < dementoresLista.length; i++) {

            dementor = dementoresLista[i];

            
            if (dementor.y >= TOPEsueloDEMENTOR || !dementor.vivo) {

                dementoresLista.splice(i, 1);
                console.log("dementores: " + dementoresLista.length);

            }

            
            
            //if (dementor.vivo) 
            
            //Dementor.prototype.movimiento(dementor);
            dementor.movimiento();
        }
    }

    function dibujarDementores() {

        for (let i = 0; i < dementoresLista.length; i++) {

            dementor = dementoresLista[i];   

            
            //console.log(posicionDementor);
            
            //console.log(Dementor.prototype.animacion[0][0]);


            dementor.pintar(ctx, posicionDementor);

            
        }
    }

    function generarAnimacionDementor() {

        for (let i = 0; i < dementoresLista.length; i++) {

            dementor = dementoresLista[i];

            posicionInicialDementor = 0;

            //console.log(dementor.y);

            //if (dementor.y >= 170) posicionInicialDementor = 3;

            //console.log(dementor.animacion[0][0]);

            posicionDementor = posicionInicialDementor + ((posicionDementor + 1) % 3);
        }
    }














    














    













































    function generarAnimacionPlayer() {

        posicionInicialPlayer = 0;

        if (yUp) posicionInicialPlayer = 0;
        if (yDown) posicionInicialPlayer = 2;
        if (xIzquierda) posicionInicialPlayer = 4;
        if (xDerecha) posicionInicialPlayer = 6;

        posicionPlayer = posicionInicialPlayer + ((posicionPlayer + 1) % 2);

        if (!yUp && !yDown && !xIzquierda && !xDerecha) posicionPlayer = 0;
        
        if (espacio) posicionPlayer = 1;
    }

    function generarHechizo() {

        

        if (hechizoLista.length < 1) {

            xHechizo = playerPotter.x;
            yHechizo = playerPotter.y

            hechizoPlayer = new Hechizo(xHechizo, yHechizo);

            hechizoLista.push(hechizoPlayer.valores());
            

            idAnimacionHechizo = setInterval(generarAnimacionHechizo, 1000/80); // id incrementado poco a poco la velocidad
        }
        
    }

    function generarAnimacionHechizo() {

        actualizarValoresHechizoLista();

        hechizoPlayer.movimiento();
        
        hechizo = hechizoLista[0];
        dibujarHechizo();

        

        posicionHechizo = 0; 

        if (hechizo.y < 230) {
            posicionHechizo = 1;

            if (hechizo.y < 150) {
                posicionHechizo = 2;

                if (hechizo.y < 90) {
                    posicionHechizo = 3;
                }
            }
        }

        hechizoPlayer.tamañoImagen(posicionHechizo);
        
        

        

        // (hechizoPlayer.y + hechizoPlayer.tamañoY)
        if ( hechizoLista[0].y <= 0 /*|| choca*/) {

            

            hechizoPlayer.haChocado = true;

            cerrarAnimacionHechizo();
            
        }

        // borrar
        //
        //
        // if () {
        //     calcular las posiciones Y de Hechizo para calcular su animación
        // }


    }

    function actualizarValoresHechizoLista() {

        hechizoLista.pop();

        hechizoLista.push(hechizoPlayer.valores());

        // borrar
        //
        //console.table(hechizoLista);
        //console.log(hechizoLista[0].y);
    }

    function cerrarAnimacionHechizo() {

        clearInterval(idAnimacionHechizo);



        // ctxHechizo.clearRect(
        //     hechizoLista[0].x, 
        //     hechizoLista[0].y,
        //     hechizoLista[0].tamañoX, 
        //     hechizoLista[0].tamañoY
        // );

        hechizoLista.pop();

        console.log("cierre animacion del hechizo");

        // console.log(object);
    }

























    function comandos() {

        if (yUp) playerPotter.posicionUp();
        if (yDown) playerPotter.posicionDown();
        if (xIzquierda) playerPotter.posicionIzquierda();
        if (xDerecha) playerPotter.posicionDerecha();

        if (espacio) generarHechizo();
    }

    function activarMovimiento(evt) {
        switch (evt.keyCode) {
            case 38:
                yUp = true;
                break;
            case 40:
                yDown = true;
                break;
            case 37:
                xIzquierda = true;
                break;
            case 39:
                xDerecha = true;
                break;
            case 32: // tecla espacio
                espacio = true;
                break;
        }
    }

    function desactivarMovimiento(evt) {
        switch (evt.keyCode) {
            case 38:
                yUp = false;
                break;
            case 40:
                yDown = false;
                break;
            case 37:
                xIzquierda = false;
                break;
            case 39:
                xDerecha = false;
                break;
            case 32:
                espacio = false;
                break;
        }
    }






    function cargarPartida() {

        document.addEventListener("keydown", activarMovimiento, false);
        document.addEventListener("keyup", desactivarMovimiento, false);

        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");

        playerPotter = new HarryPotter();

        idAnimacionCanvas = setInterval(generarCanvas, 1000/50);
        idAnimacionPlayer = setInterval(generarAnimacionPlayer, 1000/8);
    }






    

    botonNuevaPartida = document.getElementById("nuevaPartida");
    botonNuevaPartida.onclick = start;
}
