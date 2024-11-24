window.onload = function() {

    let canvas, ctx;
    let idAnimacionCanvas, idAnimacionPlayer, idAnimacionHechizo, idIntervalDementor, idAnimacionDementor;

    let playerPotter;
    let xIzquierda, xDerecha, yUp, yDown, espacio;
    let posicionPlayer = 0;
    let posicionInicialPlayer;

    let hechizo;
    let xHechizo, yHechizo;
    let posicionHechizo = 0;
    let hechizoLanzado = false;
    let hechizoLista = [];
         
    let dementor;
    let posicionDementor = 0;
    let posicionInicialDementor = 0;
    let dementoresLista = [];

    let botonNuevaPartida;
    let inputNombrePlayer;
    let pMensajePlayer;
    let nodePMensajePlayer;

    const divVidas = document.getElementById("vidas");
    let imagenSinVida;
    let imagenConVida;
    const NUMEROVIDAS = 3;


    function start() {
    
        inputNombrePlayer = document.getElementById("nombrePlayer");
        pMensajePlayer = document.getElementById("mensajePlayer");
    
        const NOMBREJUGADOR = inputNombrePlayer.value;
    
        botonNuevaPartida.disabled = true;
    
        if (NOMBREJUGADOR) { 
            nodePMensajePlayer = document.createTextNode("¡Hola, " + NOMBREJUGADOR + "!");

        } else {
            nodePMensajePlayer = document.createTextNode("¡Hola, jugador!");
        }

        pMensajePlayer.appendChild(nodePMensajePlayer);
    
        pMensajePlayer.style.display = 'block';
        inputNombrePlayer.style.display = 'none';

        for (let i = 0; i < NUMEROVIDAS; i++) {
            imagenConVida = document.createElement("img");
            imagenConVida.src = "assets/images/vida.png";
            imagenConVida.alt = "vida";

            divVidas.appendChild(imagenConVida);
        }
    
        cargarPartida();
    }

    function end() {
        clearInterval(idAnimacionCanvas);
        clearInterval(idAnimacionPlayer);
        console.log("fin del juego");

        //let imagenConVida = 

        
        
        //console.log(imagenConVida);
        
        // for (let i = 0; i < NUMEROVIDAS; i++) {
        //     // imagenConVida = document.createElement("img");
        //     // imagenConVida.src = "assets/images/vida.png";
        //     // imagenConVida.alt = "vida";

            
        // }
        while (divVidas.firstChild) {
            divVidas.removeChild(divVidas.firstChild);
        }


        pMensajePlayer.removeChild(nodePMensajePlayer);
        botonNuevaPartida.disabled = false;
        pMensajePlayer.style.display = 'none';
        inputNombrePlayer.style.display = 'inline';
    }



    function calcularVidaPlayer() {
        
        let playerPierde = false;

        let pIzq = playerPotter.x;
        let pDer = playerPotter.x + playerPotter.tamañoX;
        let pUp = playerPotter.y + playerPotter.tamañoY;
        let pDown = playerPotter.y;
		
		let i = 0;

		do {		
			let nIzq  = Math.round(dementoresLista[i].x,0);
			let nDer  = Math.round((dementoresLista[i].x + dementoresLista[i].tamañoXCanva),0);
			let nDown   = Math.round(dementoresLista[i].y,0);
			let nUp = Math.round((dementoresLista[i].y + dementoresLista[i].tamañoYCanva),0);

			if ((pDer > nIzq) && 
                (pIzq < nDer) && 
                (pUp > nDown) && 
                (pDown < nUp)) {
				
                console.log("han chocado");
                
                playerPierde = true;
                playerPotter.vidas -= 1;

                vidasCorazonesHtml();

                console.log(playerPotter.vidas);

                clearInterval(idIntervalDementor);
                clearInterval(idAnimacionDementor);

                dementoresLista.splice(0, dementoresLista.length);

                if (playerPotter.vidas === 0) {
                    end();
                }

                
				
			} else i++;
		}
		while  ((i < dementoresLista.length) && (!playerPierde));

    }

    function vidasCorazonesHtml() {

        //divVidas = document.getElementById("vidas");
    
        imagenSinVida = document.createElement("img");
        imagenSinVida.src = "assets/images/sinvida.png";
        imagenSinVida.alt = "-1 vida";
    
        //console.log(imagenSinVida);
        //console.log(divVidas[2]);

        for (let i = 0; i < NUMEROVIDAS; i++) {

            if (playerPotter.vidas === i) {
                divVidas.replaceChild(imagenSinVida, divVidas.getElementsByTagName("img")[i]);
            }
        }
    
        /*
        if (playerPotter.vidas === 2) {
            divVidas.replaceChild(imagenSinVida, divVidas.getElementsByTagName("img")[2]);
        }
    
        if (playerPotter.vidas === 1) {
            divVidas.replaceChild(imagenSinVida, divVidas.getElementsByTagName("img")[1]);
        }
    
        if (playerPotter.vidas === 0) {
            divVidas.replaceChild(imagenSinVida, divVidas.getElementsByTagName("img")[0]);
        }
        */
    }
    












    


    function generarCanvas() {

        ctx.clearRect(0, 0, 600, 400);

        comandos();
        
        playerPotter.pintar(ctx, posicionPlayer);

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

            dementor.movimiento();
        }
    }

    function dibujarDementores() {

        for (let i = 0; i < dementoresLista.length; i++) {

            dementor = dementoresLista[i];   

            dementor.pintar(ctx, posicionDementor);
        }
    }

    function generarAnimacionDementor() {

        for (let i = 0; i < dementoresLista.length; i++) {

            dementor = dementoresLista[i];

            posicionInicialDementor = 0;

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

        calcularVidaPlayer();
    }
















    function generarHechizo() {

        if (hechizoLista.length < 1) {

            xHechizo = playerPotter.x;
            yHechizo = playerPotter.y

            hechizo = new Hechizo(xHechizo, yHechizo);
            hechizoLista.push(hechizo);
            hechizo = hechizoLista[0];

            idAnimacionHechizo = setInterval(generarAnimacionHechizo, 1000/80); // id incrementado poco a poco la velocidad
        }
    }

    function generarAnimacionHechizo() {

        actualizarValoresHechizoLista();

        hechizo.movimiento();

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

        hechizo.pintar(ctx, posicionHechizo);
        hechizo.tamañoImagen(posicionHechizo);
        
        

        

        // (hechizoPlayer.y + hechizoPlayer.tamañoY)
        if ( hechizoLista[0].y <= 0 /*|| choca*/) {

            

            hechizo.haChocado = true;

            cerrarAnimacionHechizo();
            
        }

        // borrar
        //
        //
        // if () {
        //     calcular las posiciones Y de Hechizo para calcular su animación
        // }
        /**
         * YA ESTÁN CALCULADAS
         */


    }

    function actualizarValoresHechizoLista() {

        hechizoLista.pop();

        hechizoLista.push(hechizo);
    }

    function cerrarAnimacionHechizo() {

        clearInterval(idAnimacionHechizo);

        hechizoLista.pop();

        console.log("cierre animacion del hechizo");
    }






















    /**
     *  TECLAS
     */


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



    /**
     * CANVAS
     */


    function cargarPartida() {

        document.addEventListener("keydown", activarMovimiento, false);
        document.addEventListener("keyup", desactivarMovimiento, false);

        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");

        playerPotter = new HarryPotter();

        idAnimacionCanvas = setInterval(generarCanvas, 1000/50);
        idAnimacionPlayer = setInterval(generarAnimacionPlayer, 1000/8);
    }




    /**
     *  CÓDIGO PRINCIPAL
     */

    

    botonNuevaPartida = document.getElementById("nuevaPartida");
    botonNuevaPartida.onclick = start;
}
