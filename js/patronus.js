// Clase Patronus

let imagenPatronus;

let velocidadPatronus = 7;

function Patronus(x_, y_) {

    this.x = x_;
    this.y = y_;

    this.tamañoXImagen = 0;
    this.tamañoYImagen = 0;

    this.tamañoXCanva = this.tamañoXImagen / 2;
    this.tamañoYCanva = this.tamañoYImagen / 2;

    this.velocidad = velocidadPatronus;
}

imagenPatronus = new Image();
imagenPatronus.src = "assets/images/patronus.png";
Patronus.prototype.imagen = imagenPatronus;

Patronus.prototype.audio = new Audio("assets/sounds/patronus.mp3");

Patronus.prototype.animacion = [
    [8, 10], [40, 10], [107, 10], [181, 10], // animación subida del patronus
    [266, 10], [375, 10] // animación choque del patronus
    // eliminalo que no va a funcionar
];

Patronus.prototype.pintar = function(ctx_, posicionPatronus_) {

    ctx_.drawImage(
        this.imagen,
        this.animacion[posicionPatronus_][0],
        this.animacion[posicionPatronus_][1],
        this.tamañoXImagen, 
        this.tamañoYImagen,
        this.x, 
        this.y,
        this.tamañoXCanva, 
        this.tamañoYCanva
    );
}

Patronus.prototype.movimiento = function() {
    this. y -= this.velocidad;
}

Patronus.prototype.tamañoImagen = function(posicion) {

    switch (posicion) {
        case 0:
            this.tamañoXImagen = 28;
            this.tamañoYImagen = 79;
            break;
        case 1:
            this.tamañoXImagen = 56;
            this.tamañoYImagen = 110;
            break;
        case 2:
            this.tamañoXImagen = 63;
            this.tamañoYImagen = 209;
            break;
        case 3:
            this.tamañoXImagen = 68;
            this.tamañoYImagen = 202;
            break;
        case 4:
            this.tamañoXImagen = 80;
            this.tamañoYImagen = 181;
            break;
        case 5:
            this.tamañoXImagen = 42;
            this.tamañoYImagen = 79;
            break;
        default:
            console.log("no se ha podido cargar el tamaño de la imagen");
            break;
    }

    this.tamañoXCanva = this.tamañoXImagen / 2;
    this.tamañoYCanva = this.tamañoYImagen / 2;
}
