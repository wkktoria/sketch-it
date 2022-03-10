const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const grid = document.getElementById("grid-container");
const picker = document.getElementById("picker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");

function setCurrentColor(color) {
  currentColor = color;
}

function setCurrentMode(mode) {
  currentMode = mode;
}

function setCurrentSize(size) {
  currentSize = size;
}

function clearGrid() {
  grid.innerHTML = "";
}

function refreshGrid() {
  clearGrid();
  makeGrid(currentSize);
}

function updateSizeValue(value) {
  sizeValue.textContent = `${value} x ${value}`;
}

function changeSize(size) {
  setCurrentSize(size);
  updateSizeValue(size);
  refreshGrid();
}

function getRandomValue() {
  return Math.floor(Math.random() * (255 - 0 + 1));
}

function getRandomColor() {
  return `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;
}

function changeColor(e) {
  if (currentMode == "rainbow") {
    e.target.style.backgroundColor = `${getRandomColor()}`;
  } else if (currentMode == "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fff";
  }
}

picker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => refreshGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function makeGrid(currentSize) {
  grid.style.setProperty("--grid-rows", currentSize);
  grid.style.setProperty("--grid-cols", currentSize);
  for (c = 0; c < currentSize * currentSize; c++) {
    let cell = document.createElement("div");
    cell.classList.add("grid-item");
    cell.addEventListener("mouseover", changeColor);
    grid.appendChild(cell);
  }
}

window.onload = () => {
  makeGrid(DEFAULT_SIZE);
  changeMode(DEFAULT_MODE);
};
