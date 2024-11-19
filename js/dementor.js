// Clase Dementor

function getRandomX() {
    const numeroRandomEjeX = Math.random() * (600 - LADO);
    return numeroRandomEjeX;
}



const xTAMAÑOdementor = 0; //por determinar
const yTAMAÑOdementor = 0; //por determinar

const VELOCIDADdementor = 5;

let imagenDementor;



let NUMEROdementores = 10;

function Dementor() {

    this.x = getRandomX();
    this.y = 0 - yTAMAÑOdementor;

    this.tamañoX = xTAMAÑOdementor;
    this.tamañoY = yTAMAÑOdementor;
}