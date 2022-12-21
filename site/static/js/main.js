//  En un futuro agregar sistema de puntos

// const puntosStorage = localStorage.getItem('puntos');

// let puntos = parseInt(puntosStorage)

// if(puntosStorage){
//     puntos = puntosStorage;
// }

// localStorage.setItem('puntos', puntos);


const titulo = document.getElementById("titleColor");
const colors = document.getElementById("colors");
const header = document.getElementById("header");
const statusText = document.getElementById("status");
const buttons = document.querySelectorAll("#button")

function random() {
    return Math.floor(Math.random()*(255 + 1));
}

function randomColor(){
    return `rgb(${random()}, ${random()}, ${random()})`
}

console.log(titulo)

// Borrar todo

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Crear colores

function createColor() {
    let color = document.createElement("div");
    color.classList.add('square')

    color.style.backgroundColor = randomColor()
    //crear
    colors.appendChild(color);
}

let colorArray=[]
let ganador
let colorGanador
let wintimes = 0
function createGame(difficulty) {
    removeAllChildNodes(colors)
    header.style.backgroundColor = "#0A6245"
    if (difficulty == "easy") {
        for (let i = 0; i < 3; i++) {
            createColor()
        }
    } else {
        for (let i = 0; i < 6; i++) {
            createColor()
        }
    }
    colorArray = document.querySelectorAll(".square");
    ganador = colorArray[Math.floor(Math.random()*colorArray.length)];
    titulo.innerHTML = ganador.style.backgroundColor
    colorGanador = ganador.style.backgroundColor
    statusText.innerHTML = "ColorGame"
    clickListener()
    wintimes = 0
}

createGame("hard")

function win() {
    if (wintimes < 1) {
        colorArray.forEach(function(i) {
            i.style.backgroundColor = colorGanador
        });
        ganador.style.outline = "0.5rem solid"
        buttons.forEach(i => {
            i.classList.toggle("agrandar")
            setTimeout(function () {
                i.classList.toggle("agrandar")
            },500);
        });
        header.style.backgroundColor = colorGanador
        statusText.innerHTML = "Felicidades!"
        // puntos = puntos + 10
        // localStorage.setItem('puntos', puntos);  || En un futuro agregar sistema de puntos
        wintimes++
    }
}
function retry(item) {
    statusText.innerHTML = "Intenta de nuevo!"
    item.classList.toggle("shake")
    setTimeout(function () {
        item.classList.toggle("shake")
    },500);
    item.style.backgroundColor = "rgb(22, 22, 22)"
}

function clickListener() {
    colorArray.forEach(function(i) {
        i.addEventListener("click", function() {
            let color = i.style.backgroundColor
            if (color == colorGanador) {
                win()
            } else {
                retry(i)
            }
        });
    });
}