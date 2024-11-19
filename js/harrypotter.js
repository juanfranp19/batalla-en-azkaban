// Clase HarryPotter

const xINICIALplayer = 300 - 16;
const yINICIALplayer = 300; //PENDIENTE HACER ANIMACIONES PARA SUBIR Y BAJAR 20 PIXSELES

const xVELOCIDADplayer = 5;
const yVELOCIDADplayer = 1;

const xTAMAÑOplayer = 48;
const yTAMAÑOplayer = 64;

const xTOPEplayer = 600 - xTAMAÑOplayer;
const yTOPEUPplayer = yINICIALplayer - 10;
const yTOPEDOWNplayer = yINICIALplayer + 25;

let imagenPotter;

function HarryPotter() {

    this.x = xINICIALplayer;
    this.y = yINICIALplayer;

    this.velocidadX = xVELOCIDADplayer;
    this.velocidadY = yVELOCIDADplayer;

    this.tamañoX = xTAMAÑOplayer;
    this.tamañoY = yTAMAÑOplayer;

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

    if (this.x > xTOPEplayer) {
        this.x = xTOPEplayer;
    }
}

HarryPotter.prototype.posicionUp = function() {

    this.y -= this.velocidadY;

    if (this.y < yTOPEUPplayer) {
        this.y = yTOPEUPplayer;
    }
}

HarryPotter.prototype.posicionDown = function() {
    
    this.y += this.velocidadY;

    if (this.y > yTOPEDOWNplayer) {
        this.y = yTOPEDOWNplayer;
    }
}
