import React from "react";
import ReactDOM from "react-dom";
import { emptyCanvas, flipBit } from "./canvas";

const target = document.querySelector(".js-Checkboxes");

function Checkbox(props) {
  return React.createElement("input", {
    type: "checkbox",
    checked: props.isChecked,
    onChange: props.onChange
  });
}

function CheckboxCanvas(canvas) {
  const checkboxCanvas = canvas.map((row, rowIndex) =>
    React.createElement(
      "div",
      { key: rowIndex },
      row.map((isChecked, columnIndex) =>
        React.createElement(Checkbox, {
          key: columnIndex,
          isChecked,
          onChange: () => {
            console.log(`Clicked <${columnIndex}, ${rowIndex}>`);
          }
        })
      )
    )
  );

  return React.createElement(
    "div",
    {
      className: "CheckboxCanvasContainer"
    },
    checkboxCanvas
  );
}

function render() {
  log("rendering");
  const { width, height } = getCanvasSize();
  const canvas = emptyCanvas(width, height);
  ReactDOM.render(CheckboxCanvas(canvas), target);
}

function update() {
  requestAnimationFrame(render);
}

function getCanvasSize() {
  return log("canvas size", {
    width: Math.floor(window.innerWidth / 20),
    height: Math.floor(window.innerHeight / 20)
  });
}

window.addEventListener("resize", update, false);
update();

var el = document.querySelector(".js-Checkboxes");

if (el && el.classList.contains("isPaused")) {
  el.classList.remove("isPaused");
}

setInterval(function() {
  const { width, height } = getCanvasSize();
  const canvas = emptyCanvas(width, height);

  flipBit(
    canvas,
    Math.floor(Math.random() * width),
    Math.floor(Math.random() * height)
  );

  ReactDOM.render(CheckboxCanvas(canvas), target);
}, 2000);

function log(msg, val) {
  console.log(msg, val);
  return val;
}
