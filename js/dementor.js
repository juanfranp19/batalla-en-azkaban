// Clase Dementor

function getRandomX() {
    const numeroRandomEjeX = Math.random() * (600 - xTAMAÑOdementorImagen);
    return numeroRandomEjeX;
}
function getRandomVelocidad() {
    const velocidad = Math.random() * (0.2 - 0.05) + 0.05;
    return velocidad;
}
// const VELOCIDADdementor = 5;



const xTAMAÑOdementorImagen = 74;
const yTAMAÑOdementorImagen = 134;

const xTAMAÑOdementorCanva = xTAMAÑOdementorImagen / 2;
const yTAMAÑOdementorCanva = yTAMAÑOdementorImagen / 2;

const TOPEsueloDEMENTOR = 400 - yTAMAÑOdementorImagen/2;


let imagenDementor;

let NUMEROdementores = 10;





function Dementor() {

    this.x = getRandomX();
    this.y = 0 - yTAMAÑOdementorImagen;

    this.tamañoXImagen = xTAMAÑOdementorImagen;
    this.tamañoYImagen = yTAMAÑOdementorImagen;

    this.tamañoXCanva = xTAMAÑOdementorCanva;
    this.tamañoYCanva = yTAMAÑOdementorCanva;

    this.velocidad = getRandomVelocidad();

    this.vivo = true;
}

imagenDementor = new Image();
imagenDementor.src = "assets/images/dementor.png";
Dementor.prototype.imagen = imagenDementor;

Dementor.prototype.animacion = [
    [8, 1], [83, 0], [166, 1], // negro
    [8, 145], [85, 143], [167, 144] // gris
];

Dementor.prototype.pintar = function(ctx_, posicionDementor_) {

    ctx_.drawImage(
        this.imagen,
        this.animacion[posicionDementor_][0],
        this.animacion[posicionDementor_][1],
        this.tamañoXImagen, 
        this.tamañoYImagen,
        this.x,
        this.y,
        this.tamañoXCanva,
        this.tamañoYCanva
    );
}

Dementor.prototype.movimiento = function() {

    this.y += this.velocidad;
}
