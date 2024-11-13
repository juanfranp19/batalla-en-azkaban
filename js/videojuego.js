window.onload = function() {

    let xIzquierda, xDerecha, yUp, yDown;
    let canvas, ctx, idAnimacionCanvas, idAnimacionPlayer;
    let playerPotter;

    let posicion = 0;
    let posicionInicial;

    function generarCanvas() {

        ctx.clearRect(0, 0, 600, 400);

        if (yUp) playerPotter.posicionUp();
        if (yDown) playerPotter.posicionDown();
        if (xIzquierda) playerPotter.posicionIzquierda();
        if (xDerecha) playerPotter.posicionDerecha();
        
        //console.log(posicion);
        ctx.drawImage(
            playerPotter.imagen,
            playerPotter.animacion[posicion][0],
            playerPotter.animacion[posicion][1],
            playerPotter.tamañoX,
            playerPotter.tamañoY, 
            playerPotter.x,
            playerPotter.y,
            playerPotter.tamañoX,
            playerPotter.tamañoY
        );
    }

    function generarAnimacionPlayer() {

        posicionInicial = 0;

        if (yUp) posicionInicial = 0;
        if (yDown) posicionInicial = 2;
        if (xIzquierda) posicionInicial = 4;
        if (xDerecha) posicionInicial = 6;

        posicion = posicionInicial + ((posicion + 1) % 2);
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
        }
    }

    function desactivarMovimiento(evt) {
        switch(evt.keyCode) {
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
