// Clase Hechizo

let imagenHechizo;

const VELOCIDADhechizo = 7; // luego la velocidad se incremente!!!!!!!!!!!!!!!!

function Hechizo(x_, y_) {

    this.x = x_;
    this.y = y_;

    this.tamañoX = 0;
    this.tamañoY = 0;

    this.velocidad = VELOCIDADhechizo;
}

imagenHechizo = new Image();
imagenHechizo.src = "assets/images/hechizo.png";
Hechizo.prototype.imagen = imagenHechizo;

Hechizo.prototype.animacion = [
    [8, 10], [40, 10], [107, 10], [181, 10], // animación subida del hechizo
    [266, 10], [375, 10] // animación choque del hechizo
    // eliminalo que no va a funcionar
];

Hechizo.prototype.pintar = function(ctx_, posicionHechizo_) {

    ctx_.drawImage(
        this.imagen,
        this.animacion[posicionHechizo_][0],
        this.animacion[posicionHechizo_][1],
        this.tamañoX, 
        this.tamañoY,
        this.x, 
        this.y,
        this.tamañoX/2, 
        this.tamañoY/2 
    );
}

Hechizo.prototype.movimiento = function() {
    this. y -= VELOCIDADhechizo;
}

Hechizo.prototype.tamañoImagen = function(posicion) {

    switch (posicion) {
        case 0:
            this.tamañoX = 28;
            this.tamañoY = 79;
            break;
        case 1:
            this.tamañoX = 56;
            this.tamañoY = 110;
            break;
        case 2:
            this.tamañoX = 63;
            this.tamañoY = 209;
            break;
        case 3:
            this.tamañoX = 68;
            this.tamañoY = 202;
            break;
        case 4:
            this.tamañoX = 80;
            this.tamañoY = 181;
            break;
        case 5:
            this.tamañoX = 42;
            this.tamañoY = 79;
            break;
        default:
            this.tamañoX = 0;
            this.tamañoY = 0;
            console.log("no se ha podido cargar el tamaño de la imagen");
            break;
    }
}
