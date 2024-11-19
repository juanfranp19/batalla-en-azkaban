// Clase Hechizo

let imagenHechizo;

const VELOCIDADhechizo = 7;

function Hechizo(x_, y_) {

    this.x = x_;
    this.y = y_;

    this.tamañoX = 0;
    this.tamañoY = 0;

    

    this.velocidad = VELOCIDADhechizo;

    this.animacion = [
        [8, 10], [40, 10], [107, 10], [181, 10], // animación subida del hechizo
        [266, 10], [375, 10] // animación choque del hechizo
    ];

    this.valores = function() {
        let valoresHechizo = {
            x: this.x,
            y: this.y,
            tamañoX: this.tamañoX,
            tamañoY: this.tamañoY,
            animacion: this.animacion
        }
    
        return valoresHechizo;
    }

}

imagenHechizo = new Image();
imagenHechizo.src = "assets/images/hechizo.png";
Hechizo.prototype.imagen = imagenHechizo;

Hechizo.prototype.movimiento = function() {
    this. y -= VELOCIDADhechizo;
}

Hechizo.prototype.tamañoImagen = function(posicion) {

    switch (posicion) {
        case 0:
            this.tamañoX = 28;
            this.tamañoY = 79;
            // return posicion;
            break;
        case 1:
            this.tamañoX = 56;
            this.tamañoY = 110;
            // return posicion;
            break;
        case 2:
            this.tamañoX = 63;
            this.tamañoY = 209;
            // return posicion;
            break;
        case 3:
            this.tamañoX = 68;
            this.tamañoY = 202;
            // return posicion;
            break;
        case 4:
            this.tamañoX = 80;
            this.tamañoY = 181;
            // return posicion;
            break;
        case 5:
            this.tamañoX = 42;
            this.tamañoY = 79;
            // return posicion;
            break;
        default:
            this.tamañoX = 0;
            this.tamañoY = 0;
            console.log("no se ha podido cargar el tamaño de la imagen");
            break;
    }

    
}
