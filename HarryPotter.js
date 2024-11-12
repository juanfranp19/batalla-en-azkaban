// Clase HarryPotter

const xINICIAL = 300-16;
const yINICIAL = 300;

const VELOCIDAD = 20;

const xTAMAÑO = 48;
const yTAMAÑO = 64;

let imagen;

function HarryPotter() {

    this.x = xINICIAL;
    this.y = yINICIAL;

    this.velocidad = VELOCIDAD;

    this.tamañoX = xTAMAÑO;
    this.tamañoY = yTAMAÑO;

    this.animacion = [
        [2, 192], [48, 192]
        [5, 64], [47, 64],
        [0, 128], [47, 128]
    ];
}

imagen = new Image();
imagen.src = "images/potter.png";
HarryPotter.prototype.imagen = imagen;

HarryPotter.prototype.posicionIzquierda = function() {

    this.x -= this.velocidad;
}

HarryPotter.prototype.posicionDerecha = function() {
    this.x += this.velocidad;
}
