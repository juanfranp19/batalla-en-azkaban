window.onload = function() {

    let canvas, ctx;
    let idAnimacionCanvas, idAnimacionPlayer, idAnimacionHechizo;

    let playerPotter;
    let xIzquierda, xDerecha, yUp, yDown, espacio;
    let posicionPlayer = 0;
    let posicionInicial;

    let hechizoPlayer;
    let xHechizo, yHechizo;
    let posicionHechizo = 0;
    let hechizoLanzado = false;
    let hechizoLista = [];
    

    function generarCanvas() {

        ctx.clearRect(0, 0, 600, 400);

        if (yUp) playerPotter.posicionUp();
        if (yDown) playerPotter.posicionDown();
        if (xIzquierda) playerPotter.posicionIzquierda();
        if (xDerecha) playerPotter.posicionDerecha();

        if (espacio) generarHechizo();
        
        //console.log(posicionPlayer);
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

        if (hechizoLanzado) {
            console.log("lanzado");
        }
    }

    function generarAnimacionPlayer() {

        posicionInicial = 0;

        if (yUp) posicionInicial = 0;
        if (yDown) posicionInicial = 2;
        if (xIzquierda) posicionInicial = 4;
        if (xDerecha) posicionInicial = 6;

        posicionPlayer = posicionInicial + ((posicionPlayer + 1) % 2);

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
        

        

        

        posicionHechizo = 0; //borrar porque ya está arriba

        if (hechizoLista[0].y < 230) {
            posicionHechizo = 1;

            if (hechizoLista[0].y < 150) {
                posicionHechizo = 2;

                if (hechizoLista[0].y < 90) {
                    posicionHechizo = 3;
                }
            }
        }

        hechizoPlayer.tamañoImagen(posicionHechizo);
        
        ctxHechizo.drawImage(
            hechizoPlayer.imagen,
            hechizoLista[0].animacion[posicionHechizo][0],
            hechizoLista[0].animacion[posicionHechizo][1],
            hechizoLista[0].tamañoX, 
            hechizoLista[0].tamañoY,
            hechizoLista[0].x, 
            hechizoLista[0].y,
            hechizoLista[0].tamañoX, 
            hechizoLista[0].tamañoY 
        );

        

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

    document.addEventListener("keydown", activarMovimiento, false);
    document.addEventListener("keyup", desactivarMovimiento, false);

    canvas = document.getElementById("myCanvas");

    ctx = canvas.getContext("2d");
    let ctxHechizo = canvas.getContext("2d");

    playerPotter = new HarryPotter();

    idAnimacionCanvas = setInterval(generarCanvas, 1000/50);
    idAnimacionPlayer = setInterval(generarAnimacionPlayer, 1000/8);

    
}
