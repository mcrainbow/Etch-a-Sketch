"use strict";

// ! Some Variables
const DEFAULT_SIZE = 8;
const GAME_TYPE = "fill";
const DEFAULT_BG = "#d3d3d3";
const DEFAULT_COLOR = "#333333";

let currentDrawingMode = "";
let currentDrawingColor = "";

const gridField = document.querySelector(".grid__field"); // ! Grid Container
const rangeText = document.querySelector(".boxes-text");
const rangeInput = document.querySelector(".boxes-range");
const clearBtn = document.querySelector(".clear-grid");
const toggleGridBtn = document.querySelector(".toggle-grid");

const modeButtons = document.querySelectorAll(".mode-btn");
const colorModeBtn = document.querySelector(".color-mode");

const bgPlate = document.querySelector(".bg-color");
const penPlate = document.querySelector(".pen-color");
const grabberColor = document.querySelector(".color-grabber");
let gridBlocks = document.querySelectorAll(".grid__field-block");

// ! Functions
const reloadGrid = (value) => {
  rangeText.textContent = `Grid Size: ${value} x ${value}`;
  clearGridTemplate(gridField);
  setGridTemplate(gridField, value);
};
const clearBg = (blocks, color = DEFAULT_BG) => {
  for (let block of blocks) {
    block.style.background = color;
  }
};
const removeGridLines = (blocks) => {
  for (let block of blocks) {
    block.classList.add("noBorder");
  }
};
const addGridLines = (blocks) => {
  for (let block of blocks) {
    block.classList.remove("noBorder");
  }
};
const resetingToggleBtn = () => {
  toggleGridBtn.value = "OFF";
  toggleGridBtn.classList.remove("active");
};
const addingActiveClass = (btn) => {
  modeButtons.forEach((button) => {
    button.classList.remove("active");
  });
  btn.classList.add("active");
};
const gettingCurrentMode = () => {
  modeButtons.forEach((btn) => {
    if (btn.classList.contains("active")) {
      currentDrawingMode = btn.textContent;
    }
  });
};
const gettingBGColor = (plate) => {
  return plate.value;
};
const gettingPenColor = (plate) => {
  return plate.value;
};

const colorMode = (elem) => {
  currentDrawingColor = gettingPenColor(penPlate);
  elem.style.background = currentDrawingColor;
};
const rainbowMode = (elem) => {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  currentDrawingColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  elem.style.background = currentDrawingColor;
};

const clearGridTemplate = (gridContainer) => {
  gridContainer.innerHTML = "";
};
const setGridTemplate = (gridContainer, value = DEFAULT_SIZE) => {
  gridContainer.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${value}, 1fr)`;
  rangeText.textContent = `Grid Size: ${value} x ${value}`;
  rangeInput.value = value;

  for (let i = 0; i < value * value; i++) {
    let block = document.createElement("div");
    block.style.background = DEFAULT_BG;
    block.classList.add("grid__field-block");
    gridContainer.appendChild(block);
  }
  gridBlocks = document.querySelectorAll(".grid__field-block");
};
const drawingMode = (mode) => {
  gridBlocks.forEach((block) => {
    block.addEventListener("click", () => {
      console.log(currentDrawingMode);
      if (mode === "Color Mode" && colorModeBtn.classList.contains("active")) {
        colorMode(block);
      } else if (mode === "Rainbow Mode") {
        rainbowMode(block);
      }
    });
  });
};

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
const formatingRGB = (elem) => {
  let rgbColor = elem.style.background;
  let grbArr = rgbColor
    .slice(4, rgbColor.length - 1)
    .replaceAll(", ", " ")
    .split(" ")
    .map((num) => parseInt(num));
  console.log("grbArr " + grbArr);
  console.log("rgbToHex(...grbArr) " + rgbToHex(...grbArr));
  return rgbToHex(...grbArr);
};
const pickingColor = (grid) => {
  let color = "";
  grid.forEach((elem) => {
    elem.addEventListener("click", () => {
      color = formatingRGB(elem);
      penPlate.value = color;
    });
  });
};

const disablingModeBtns = (btns) => {
  btns.forEach((btn) => {
    btn.classList.remove("active");
    currentDrawingMode = "";
    console.log(currentDrawingMode);
  });
};

window.onload = setGridTemplate(gridField); // * Drawing blocks on load site

// ! Event Listeners

// * Range Input
rangeInput.addEventListener("input", (e) => {
  resetingToggleBtn();
  reloadGrid(e.target.value);
  gridBlocks = document.querySelectorAll(".grid__field-block");
  clearBg(gridBlocks, gettingBGColor(bgPlate));
  gettingCurrentMode();
  drawingMode(currentDrawingMode);
});

// * Clear button
clearBtn.addEventListener("click", () => {
  clearBg(gridBlocks, gettingBGColor(bgPlate));
});

// * Toggle button
toggleGridBtn.addEventListener("click", (e) => {
  if (e.target.value === "OFF") {
    removeGridLines(gridBlocks);
    e.target.value = "ON";
    e.target.classList.add("active");
  } else {
    addGridLines(gridBlocks);
    e.target.value = "OFF";
    e.target.classList.remove("active");
  }
});
// * Mode Buttons
modeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    addingActiveClass(e.target);
    gettingCurrentMode();
    console.log(currentDrawingMode);
    drawingMode(currentDrawingMode);
  });
});
// * Grabber Color Btn
grabberColor.addEventListener("click", (e) => {
  if (e.target.value === "OFF") {
    e.target.value = "ON";
    e.target.classList.add("active");
    pickingColor(gridBlocks);
    disablingModeBtns(modeButtons);
  } else {
    addGridLines(gridBlocks);
    e.target.value = "OFF";
    e.target.classList.remove("active");
  }
});

// ! Реализовать:
// ! 1 закрашивание по задержки кнопки мыши
// ! 2 все режимы
// * 3 починить закраску при запкмке первой сетки
// ! 4 сохранение цвета при нажатии (Color grabber)

// При нажатии на сборку цвета происходит смена цвета в рэйнбоу моде
// Сборка цвета работает безприрывно после первого включения
