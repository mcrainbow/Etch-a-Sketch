"use strict";

// ! Some Variables
const DEFAULT_SIZE = 8;
const GAME_TYPE = "fill";
const DEFAULT_BG = "rgb(211 211 211)";

const gridField = document.querySelector(".grid__field"); // ! Grid Container
const rangeText = document.querySelector(".boxes-text");
const rangeInput = document.querySelector(".boxes-range");
const clearBtn = document.querySelector(".clear-grid");
const toggleGridBtn = document.querySelector(".toggle-grid");
let gridBlocks = document.querySelectorAll(".grid__field-block");

// ! Functions

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
};

window.onload = setGridTemplate(gridField); // * Drawing blocks on load site

const reloadGrid = (value) => {
  rangeText.textContent = `Grid Size: ${value} x ${value}`;
  clearGridTemplate(gridField);
  setGridTemplate(gridField, value);
};
const clearBg = (blocks) => {
  for (let block of blocks) {
    block.style.background = DEFAULT_BG;
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

// ! Event Listeners

// * Range Input
rangeInput.addEventListener("input", (e) => {
  resetingToggleBtn();
  reloadGrid(e.target.value);
  gridBlocks = document.querySelectorAll(".grid__field-block");
});

// * Clear button
clearBtn.addEventListener("click", () => {
  clearBg(gridBlocks);
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
