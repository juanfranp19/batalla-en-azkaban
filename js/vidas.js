function vidasCorazones(vidasPlayer) {

    let divVidas = document.getElementById("vidas");

    let imagenSinVida = document.createElement("img");
    imagenSinVida.src = "assets/images/sinvida.png";
    imagenSinVida.alt = "-1 vida";

    //console.log(imagenSinVida);
    //console.log(divVidas[2]);

    if (vidasPlayer === 2) {
        divVidas.replaceChild(imagenSinVida, divVidas.getElementsByTagName("img")[2]);
    }

    if (vidasPlayer === 1) {
        divVidas.replaceChild(imagenSinVida, divVidas.getElementsByTagName("img")[1]);
    }

    if (vidasPlayer === 0) {
        divVidas.replaceChild(imagenSinVida, divVidas.getElementsByTagName("img")[0]);
    }
}
