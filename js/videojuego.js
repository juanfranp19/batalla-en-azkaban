window.onload = function() {

    /**
     *  CONSTANTES Y VARIABLES
     */
    const NUMEROVIDAS = 3;

    const botonNuevaPartida = document.getElementById("nuevaPartida");
    const divVidas = document.getElementById("vidas");
    const spanDementoresDerrotados = document.getElementById("dementoresDerrotados");
    const spanNivel = document.getElementById("nivel");

    let canvas, ctx;
    let idAnimacionCanvas, idAnimacionPlayer, idAnimacionPatronus, idIntervalDementor, idAnimacionDementor;

    let playerPotter;
    let xIzquierda, xDerecha, yUp, yDown, espacio;
    let posicionPlayer = 0;
    let posicionInicialPlayer;

    let patronus;
    let xPatronus, yPatronus;
    let posicionPatronus = 0;
    let patronusLista = [];
         
    let dementor;
    let dementoresLista = [];
    let dementorDerrotado;

    let inputNombrePlayer;
    let pMensajePlayer;
    let nodePMensajePlayer;
    let textoIntroductorio;
    let nombreJugador;

    let imagenSinVida;
    let imagenConVida;

    /**
     *  FUNCIONES
     */
    function reproducirSonido(audio_) {
        audio_.currentTime = 0;
        audio_.play();
    }

    function start() {
    
        inputNombrePlayer = document.getElementById("nombrePlayer");
        pMensajePlayer = document.getElementById("mensajePlayer");
        textoIntroductorio = document.getElementById("texto");
    
        nombreJugador = inputNombrePlayer.value;

        if (!nombreJugador) nombreJugador = "jugador";

        botonNuevaPartida.disabled = true;
    
        
            

        nodePMensajePlayer = document.createTextNode("¡Hola, " + nombreJugador + "!");

        pMensajePlayer.appendChild(nodePMensajePlayer);
    
        pMensajePlayer.style.display = 'block';
        inputNombrePlayer.style.display = 'none';
        textoIntroductorio.style.display = 'none';

        // se inicializan para cuando haya que iniciar una partida después de otra
        spanDementoresDerrotados.innerHTML = "Dementores derrotados: 0";
        spanDementoresDerrotados.style.display = 'block';
        spanNivel.innerHTML = "Nivel: 1";
        spanNivel.style.display = 'block';

        dementorVelocidadMinima = 0.05;
        dementorVelocidadMaxima = 0.2;
        NUMEROdementores = 10;

        velocidadPatronus = 7;
        xVELOCIDADplayer = 5;
        yVELOCIDADplayer = 1;

        

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
        clearInterval(idAnimacionPatronus);
        clearInterval(idAnimacionDementor);
        clearInterval(idIntervalDementor);

        if (patronusLista.length > 0) {
            patronusLista.pop();
        }

        console.log("fin del juego");

        while (divVidas.firstChild) {
            divVidas.removeChild(divVidas.firstChild);
        }


        almacenarDatosLocal(nombreJugador, playerPotter.dementoresDerrotados, playerPotter.nivel);

        document.removeEventListener("keydown", activarMovimiento, false);
        document.removeEventListener("keyup", desactivarMovimiento, false);

        pMensajePlayer.removeChild(nodePMensajePlayer);
        botonNuevaPartida.disabled = false;
        pMensajePlayer.style.display = 'none';
        inputNombrePlayer.style.display = 'inline';
        textoIntroductorio.style.display = 'block';
    }



    function calcularVidaPlayer() {
        
        let pierdeVida = false;

        let pIzq = playerPotter.x;
        let pDer = playerPotter.x + playerPotter.tamañoX;
        let pUp = playerPotter.y + playerPotter.tamañoY;
        let pDown = playerPotter.y;
		
		let i = 0;

		do {		
			let dIzq  = Math.round(dementoresLista[i].x,0);
			let dDer  = Math.round((dementoresLista[i].x + dementoresLista[i].tamañoXCanva),0);
			let dUp = Math.round((dementoresLista[i].y + dementoresLista[i].tamañoYCanva),0);
            let dDown = Math.round(dementoresLista[i].y,0);

			if ((pDer > dIzq) && 
                (pIzq < dDer) && 
                (pUp > dDown) && 
                (pDown < dUp)) {
				
                console.log("han chocado");

                reproducirSonido(dementoresLista[i].audioDementorMataPlayer);
                
                pierdeVida = true;
                playerPotter.vidas -= 1;

                vidasCorazonesHtml();

                console.log(playerPotter.vidas);

                clearInterval(idIntervalDementor);
                clearInterval(idAnimacionDementor);

                if (playerPotter.vidas === 0) {
                    end();
                }

                dementoresLista.splice(0, dementoresLista.length);
				
			} else i++;
		}
		while ((i < dementoresLista.length) && (!pierdeVida));

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

            console.log("fin animación dementores");
            
        }
    }

    function movimientoDementor() {

        for (let i = 0; i < dementoresLista.length; i++) {

            dementor = dementoresLista[i];

            if (dementor.y >= TOPEsueloDEMENTOR) {

                dementoresLista.splice(i, 1);
                console.log("dementores: " + dementoresLista.length);
            }

            dementor.movimiento();
        }
    }

    function dibujarDementores() {

        for (let i = 0; i < dementoresLista.length; i++) {

            dementor = dementoresLista[i];   

            dementor.pintar(ctx);
        }
    }

    function generarAnimacionDementor() {

        for (let i = 0; i < dementoresLista.length; i++) {

            dementor = dementoresLista[i];
            dementor.posicion = (dementor.posicion + 1) % 3;
        }
    }











    













    function calcularDementoresDerrotados() {

        dementorDerrotado = false;

        let hIzq = patronus.x;
        let hDer = patronus.x + patronus.tamañoXCanva;
        let hUp = patronus.y + patronus.tamañoYCanva;
        let hDown = patronus.y;

        let i = 0;

        do {
            let dIzq  = Math.round(dementoresLista[i].x,0);
			let dDer  = Math.round((dementoresLista[i].x + dementoresLista[i].tamañoXCanva),0);
			let dUp = Math.round((dementoresLista[i].y + dementoresLista[i].tamañoYCanva),0);
            let dDown = Math.round(dementoresLista[i].y,0);

            if ((hDer > dIzq) &&
                (hIzq < dDer) &&
                (hUp > dDown) &&
                (hDown < dUp)) {

                console.log("dementor muerto");

                reproducirSonido(dementoresLista[i].audioDementorMuerto);

                dementoresLista.splice(i, 1);
                console.log("dementores: " + dementoresLista.length);

                dementorDerrotado = true;
                playerPotter.dementoresDerrotados += 1;

                let contenido = "Dementores derrotados: " + playerPotter.dementoresDerrotados;
                spanDementoresDerrotados.innerHTML = contenido;

                calcularNivel();

                console.log(playerPotter.dementoresDerrotados);

            } else i++;

        }
        while ((i < dementoresLista.length) &&(!dementorDerrotado));
    }


















    function calcularNivel() {

        console.log(playerPotter.nivel);

        switch (playerPotter.dementoresDerrotados) {

            case 15:
                playerPotter.nivel = 2;
                NUMEROdementores += 5;
                dementorVelocidadMinima += 0.05;
                dementorVelocidadMaxima += 0.05;
                velocidadPatronus -= 1;
                break;
            case 35:
                playerPotter.nivel = 3;
                NUMEROdementores += 6;
                dementorVelocidadMinima += 0.01;
                dementorVelocidadMaxima += 0.01;
                velocidadPatronus -= 2;
                xVELOCIDADplayer -= 1;
                yVELOCIDADplayer -= 0.1;
                break;
            case 50:
                playerPotter.nivel = 4;
                NUMEROdementores += 6;
                dementorVelocidadMinima += 0.04;
                dementorVelocidadMaxima += 0.04;
                xVELOCIDADplayer -= 1;
                yVELOCIDADplayer -= 0.1;
                break;
            case 75:
                playerPotter.nivel = 5;
                NUMEROdementores += 5;
                dementorVelocidadMinima += 0.01;
                dementorVelocidadMaxima += 0.01;
                xVELOCIDADplayer -= 1;
                yVELOCIDADplayer -= 0.1;
                break;
            case 100:
                playerPotter.nivel = 6;
                NUMEROdementores += 15;
                xVELOCIDADplayer -= 1;
                yVELOCIDADplayer -= 0.1;
                break;
        }

        spanNivel.innerHTML = "Nivel: " + playerPotter.nivel;
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
















    function generarPatronus() {

        if (patronusLista.length < 1) {

            xPatronus = playerPotter.x;
            yPatronus = playerPotter.y

            patronus = new Patronus(xPatronus, yPatronus);
            patronusLista.push(patronus);
            patronus = patronusLista[0];
            
            reproducirSonido(patronus.audio);

            idAnimacionPatronus = setInterval(generarAnimacionPatronus, 1000/80); // id incrementado poco a poco la velocidad
        }
    }

    function generarAnimacionPatronus() {

        actualizarValoresPatronusLista();
        patronus.movimiento();
        posicionPatronus = 0; 

        if (patronus.y < 200) {
            posicionPatronus = 1;

            if (patronus.y < 150) {
                posicionPatronus = 2;

                if (patronus.y < 90) {
                    posicionPatronus = 3;
                }
            }
        }
        
        patronus.pintar(ctx, posicionPatronus);
        patronus.tamañoImagen(posicionPatronus);

        if (dementoresLista.length > 0) calcularDementoresDerrotados();
        
        // (patronusPlayer.y + patronusPlayer.tamañoY)
        if ( patronusLista[0].y <= 0 || dementorDerrotado) {

            

            patronus.haChocado = true;

            cerrarAnimacionPatronus();
            
        }
    }

    function actualizarValoresPatronusLista() {

        patronusLista.pop();

        patronusLista.push(patronus);
    }

    function cerrarAnimacionPatronus() {

        clearInterval(idAnimacionPatronus);

        patronusLista.pop();

        console.log("cierre animacion del patronus");
    }













    








    /**
     *  TECLAS
     */


    function comandos() {

        if (yUp) playerPotter.posicionUp();
        if (yDown) playerPotter.posicionDown();
        if (xIzquierda) playerPotter.posicionIzquierda();
        if (xDerecha) playerPotter.posicionDerecha();

        if (espacio) generarPatronus();
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
        evt.preventDefault();
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




    /**
     *  CÓDIGO PRINCIPAL
     */
    recuperarDatosLocal();
    
    botonNuevaPartida.onclick = start;
}
