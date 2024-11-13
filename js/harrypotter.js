// Clase HarryPotter

const xINICIAL = 300 - 16;
const yINICIAL = 300; //PENDIENTE HACER ANIMACIONES PARA SUBIR Y BAJAR 20 PIXSELES

const xVELOCIDAD = 5;
const yVELOCIDAD = 1;

const xTAMAÑO = 48;
const yTAMAÑO = 64;

const xTOPE = 600 - xTAMAÑO;
const yTOPEUP = yINICIAL - 10;
const yTOPEDOWN = yINICIAL + 25;

let imagenPotter;

function HarryPotter() {

    this.x = xINICIAL;
    this.y = yINICIAL;

    this.velocidadX = xVELOCIDAD;
    this.velocidadY = yVELOCIDAD;

    this.tamañoX = xTAMAÑO;
    this.tamañoY = yTAMAÑO;

    this.animacion = [
        [2, 192], [48, 192], // arriba
        [0, 0], [49, 0], // abajo
        [0, 64], [48, 64], // izquierda
        [0, 128], [47, 128] // derecha
    ];
}

imagenPotter = new Image();
imagenPotter.src = "assets/images/potter.png";
HarryPotter.prototype.imagen = imagenPotter;

HarryPotter.prototype.posicionIzquierda = function() {

    this.x -= this.velocidadX;

    if (this.x < 0) {
        this.x = 0;
    }
}

HarryPotter.prototype.posicionDerecha = function() {

    this.x += this.velocidadX;

    if (this.x > xTOPE) {
        this.x = xTOPE;
    }
}

HarryPotter.prototype.posicionUp = function() {

    this.y -= this.velocidadY;

    if (this.y < yTOPEUP) {
        this.y = yTOPEUP;
    }
}

HarryPotter.prototype.posicionDown = function() {
    
    this.y += this.velocidadY;

    if (this.y > yTOPEDOWN) {
        this.y = yTOPEDOWN;
    }
}
