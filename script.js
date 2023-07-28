"use strict";

// ! Some Variables
const DEFAULT_SIZE = 8;
const GAME_TYPE = "fill";

const gridField = document.querySelector(".grid__field"); // ! Grid Container
const rangeText = document.querySelector(".boxes-text");
const rangeInput = document.querySelector(".boxes-range");

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
};

window.onload = setGridTemplate(gridField); // * Drawing blocks on load site

const reloadGrid = (value) => {
  rangeText.textContent = `Grid Size: ${value} x ${value}`;
  clearGridTemplate(gridField);
  setGridTemplate(gridField, value);
};

// ! Event Listeners

rangeInput.addEventListener("input", (e) => {
  reloadGrid(e.target.value);
});
