// Clase Dementor

function getRandomX() {
    const numeroRandomEjeX = Math.random() * (600 - xTAMAÑOdementor);
    return numeroRandomEjeX;
}
function getRandomVelocidad() {
    const velocidad = Math.random() * (0.2 - 0.05) + 0.05;
    return velocidad;
}
// const VELOCIDADdementor = 5;



const xTAMAÑOdementor = 74;
const yTAMAÑOdementor = 134;

const TOPEsueloDEMENTOR = 400 - yTAMAÑOdementor;


let imagenDementor;

let NUMEROdementores = 10;





function Dementor() {

    this.x = getRandomX();
    this.y = 0 - yTAMAÑOdementor;

    this.tamañoX = xTAMAÑOdementor;
    this.tamañoY = yTAMAÑOdementor;

    this.tamañoXPintar =this.tamañoX/2;
    this.tamañoYPintar =this.tamañoY/2;

    this.velocidad = getRandomVelocidad();

    

    this.vivo = true;
/*
    this.valores = function() {
        let valoresDementor = {
            x: this.x, 
            y: this.y,
            tamañoX: this.tamañoX,
            tamañoY: this.tamañoY,
            velocidad: this.velocidad,
            vivo: this.vivo
        }

        return valoresDementor;
    }
*/
}

Dementor.prototype.pintar = function(ctx_, posicionDementor_) {

    ctx_.drawImage(
        this.imagen,
        this.animacion[posicionDementor_][0],
        this.animacion[posicionDementor_][1],
        this.tamañoX, 
        this.tamañoY,
        this.x,
        this.y,
        this.tamañoXPintar,
        this.tamañoYPintar
    );

}


Dementor.prototype.animacion = [

    [8, 1], [83, 0], [166, 1], // negro
    [8, 145], [85, 143], [167, 144] // gris
];

imagenDementor = new Image();
imagenDementor.src = "assets/images/dementor.png";
Dementor.prototype.imagen = imagenDementor;

/*
Dementor.prototype.movimiento = function(dementor) {

    dementor.y += dementor.velocidad;
    //console.log("se mueve");
}
*/

Dementor.prototype.movimiento = function() {

    this.y += this.velocidad;
    //console.log("se mueve");
}












