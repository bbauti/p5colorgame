// Variables

const title = document.getElementById("titleColor");
const colors = document.getElementById("colors");
const header = document.getElementById("header");
const statusText = document.getElementById("status");
const buttons = document.querySelectorAll("#button");
let colorArray = [];
let winner;
let winnerColor;
let timesWon = 0;

function random() {
  return Math.floor(Math.random() * (255 + 1));
}

function randomColor() {
  return `rgb(${random()}, ${random()}, ${random()})`;
}

// Delete all childs from parent element

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Create color squares

function createColor() {
  let color = document.createElement("div");
  color.classList.add("square");
  color.style.backgroundColor = randomColor();
  colors.appendChild(color);
}

/* Init function

Removes all squares and creates new ones
Asigns click listener for every square
Chooses winner color

*/

function createGame(difficulty) {
  removeAllChildNodes(colors);
  header.style.backgroundColor = "#0A6245";
  if (difficulty == "easy") {
    for (let i = 0; i < 3; i++) {
      createColor();
    }
  } else {
    for (let i = 0; i < 6; i++) {
      createColor();
    }
  }

  colorArray = document.querySelectorAll(".square");
  winner = colorArray[Math.floor(Math.random() * colorArray.length)];

  title.innerHTML = winner.style.backgroundColor;
  winnerColor = winner.style.backgroundColor;

  statusText.innerHTML = "ColorGame";
  clickListener();
  timesWon = 0;
}

// Creates game on page load, hard by default.

createGame("hard");

function win() {

  // If statment so you cant win multiple times after squares change to winner color
  
  if (timesWon < 1) {
    colorArray.forEach(function (i) {
      i.style.backgroundColor = winnerColor;
    });

    winner.style.outline = "0.5rem solid";

    //Make buttons bigger on win

    buttons.forEach((i) => {
      i.classList.toggle("agrandar");
      setTimeout(function () {
        i.classList.toggle("agrandar");
      }, 500);
    });

    header.style.backgroundColor = winnerColor;
    statusText.innerHTML = "Felicidades!";

    timesWon++;
  }
}

function retry(item) {
  statusText.innerHTML = "Intenta de nuevo!";
  item.classList.toggle("shake");
  setTimeout(function () {
    item.classList.toggle("shake");
  }, 500);
  item.style.backgroundColor = "rgb(22, 22, 22)";
}

// Function to assing click listener to every square

function clickListener() {
  colorArray.forEach(function (i) {
    i.addEventListener("click", function () {
      let color = i.style.backgroundColor;
      if (color == winnerColor) {
        win();
      } else {
        retry(i);
      }
    });
  });
}
