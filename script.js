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
const bgPlate = document.querySelector(".bg-color");
const penPlate = document.querySelector(".pen-color");
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
  let currentMode = "";
  modeButtons.forEach((btn) => {
    if (btn.classList.contains("active")) {
      currentMode = btn.textContent;
    }
  });
  return currentMode;
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

const checkingForMode = (mode, blocks) => {
  blocks.forEach((block) => {
    block.addEventListener("click", () => {
      console.log(mode);
      if (mode === "Color Mode") {
        colorMode(block);
      } else if (mode === "Rainbow Mode") {
        rainbowMode(block);
      }
    });
  });
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
    block.classList.add("grid__field-block");
    gridContainer.appendChild(block);
  }
  gridBlocks = document.querySelectorAll(".grid__field-block");
  checkingForMode(currentDrawingMode, gridBlocks);
};

window.onload = setGridTemplate(gridField); // * Drawing blocks on load site

// ! Event Listeners

// * Range Input
rangeInput.addEventListener("input", (e) => {
  resetingToggleBtn();
  reloadGrid(e.target.value);
  gridBlocks = document.querySelectorAll(".grid__field-block");
  clearBg(gridBlocks, gettingBGColor(bgPlate));
  currentDrawingMode = gettingCurrentMode();
  checkingForMode(currentDrawingMode, gridBlocks);
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
    currentDrawingMode = gettingCurrentMode();
    console.log(currentDrawingMode);
  });
});

// * Mode Drawing
// gridBlocks.forEach((block) => {
//   block.addEventListener("click", () => {
//     console.log(currentDrawingMode);
//     if (currentDrawingMode === "Color Mode") {
//       colorMode(block);
//     } else if (currentDrawingMode === "Rainbow Mode") {
//       rainbowMode(block);
//     }
//   });
// });

// ! Реализовать:
// ! 1 закрашивание по задержки кнопки мыши
// ! 2 все режимы
// ! 3 починить закраску при запкмке первой сетки
// ! 4 сохранение цвета при нажатии (Color grabber)
