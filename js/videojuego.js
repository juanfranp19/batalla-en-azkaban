window.onload = function() {

    let xIzquierda, xDerecha;
    let canvas, ctx, idAnimacionCanvas, idAnimacionPlayer;
    let playerPotter;

    let posicion = 0;
    let posicionInicial;

    function generarCanvas() {
        ctx.clearRect(0, 0, 600, 400);

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

        if (xIzquierda) posicionInicial = 2;
        if (xDerecha) posicionInicial = 4;

        //if (!xIzquierda && !xDerecha ) 

        posicion = posicionInicial + ((posicion + 1) % 2);

    }

    function activarMovimiento(evt) {
        switch (evt.keyCode) {
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
