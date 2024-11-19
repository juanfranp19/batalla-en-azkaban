// Clase Dementor

function getRandomX() {
    const numeroRandomEjeX = Math.random() * (600 - LADO);
    return numeroRandomEjeX;
}
function getRandomVelocidad() {
    const velocidad = 0.1 + Math.random();
    return velocidad;
}
// const VELOCIDADdementor = 5;

const TOPEsueloDEMENTOR = 400 - yTAMAÑOdementor;

const xTAMAÑOdementor = 74;
const yTAMAÑOdementor = 134;


let imagenDementor;

let NUMEROdementores = 10;





function Dementor() {

    this.x = getRandomX();
    this.y = 0 - yTAMAÑOdementor;

    this.tamañoX = xTAMAÑOdementor;
    this.tamañoY = yTAMAÑOdementor;

    this.velocidad = getRandomVelocidad();

    this.animacion = [
        [8, 1], [83, 0], [166, 1], // negro
        [8, 145], [85, 143], [167, 144] // gris
    ];

    this.vivo = true;

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

}

imagenDementor = new Image();
imagenDementor.src = "assets/images/dementor.png";
Dementor.prototype.imagen = imagenDementor;

Dementor.prototype.movimiento = function() {

    this.y += this.velocidad;
}













