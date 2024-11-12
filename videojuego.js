window.onload = function() {

    let xIzquierda, xDerecha;
    let canvas, ctx, idAnimacionCanvas;
    let playerPotter;

    function generarCanvas() {
        ctx.clearRect(0, 0, 600, 400);

        if (xIzquierda) playerPotter.posicionIzquierda();
        if (xDerecha) playerPotter.posicionDerecha();

        ctx.drawImage(
            playerPotter.imagen,
            playerPotter.animacion[0][0],
            playerPotter.animacion[0][1],
            playerPotter.tamañoX,
            playerPotter.tamañoY, 
            playerPotter.x,
            playerPotter.y,
            playerPotter.tamañoX,
            playerPotter.tamañoY
        );
    }

    function activarMovimiento(evt) {
        switch(evt.keyCode) {
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

    document.addEventListener("keyDown", activarMovimiento, false);
    document.addEventListener("keyUp", desactivarMovimiento, false);

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    playerPotter = new HarryPotter();

    idAnimacionCanvas = setInterval(generarCanvas, 1000/50);
    
}
