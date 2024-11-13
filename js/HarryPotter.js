// Clase HarryPotter

const xINICIAL = 300-16;
const yINICIAL = 300 + 20; //PENDIENTE HACER ANIMACIONES PARA SUBIR Y BAJAR 20 PIXSELES

const VELOCIDAD = 2;

const xTAMAÑO = 48;
const yTAMAÑO = 64;

const xTOPE = 600 - xTAMAÑO;

let imagen;

function HarryPotter() {

    this.x = xINICIAL;
    this.y = yINICIAL;

    this.velocidad = VELOCIDAD;

    this.tamañoX = xTAMAÑO;
    this.tamañoY = yTAMAÑO;

    this.animacion = [
        [2, 192], [48, 192], // recto
        [0, 64], [48, 64], // izquierda
        [0, 128], [47, 128] // derecha
    ];
}

imagen = new Image();
imagen.src = "assets/images/potter.png";
HarryPotter.prototype.imagen = imagen;

HarryPotter.prototype.posicionIzquierda = function() {

    this.x -= this.velocidad;

    if (this.x < 0) {
        this.x = 0;
    }
}

HarryPotter.prototype.posicionDerecha = function() {
    this.x += this.velocidad;

    if (this.x > xTOPE) {
        this.x = xTOPE;
    }
}
