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

        xHechizo = playerPotter.x;
        yHechizo = playerPotter.y

        hechizoPlayer = new Hechizo(xHechizo, yHechizo);

        //hechizoLanzado = true;

        idAnimacionHechizo = setInterval(generarAnimacionHechizo, 1000/8);

        

    }

    function generarAnimacionHechizo() {

        hechizoPlayer.tamañoImagen();

        ctx.drawImage(
            hechizoPlayer.imagen,
            hechizoPlayer.animacion[posicionHechizo][0],
            hechizoPlayer.animacion[posicionHechizo][1],
            hechizoPlayer.tamañoX, 
            hechizoPlayer.tamañoY,
            hechizoPlayer.x, 
            hechizoPlayer.y,
            hechizoPlayer.tamañoX, 
            hechizoPlayer.tamañoY 
        );

        // if () {
        //     calcular las posiciones Y de Hechizo para calcular su animación
        // }


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

    playerPotter = new HarryPotter();

    idAnimacionCanvas = setInterval(generarCanvas, 1000/50);
    idAnimacionPlayer = setInterval(generarAnimacionPlayer, 1000/8);
}
