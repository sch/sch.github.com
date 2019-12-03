import React from "react";
import ReactDOM from "react-dom";
import { emptyCanvas, flipBit } from "./canvas";

function currentWindowSize() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState(currentWindowSize());

  React.useEffect(function() {
    function handleResize() {
      setWindowSize(currentWindowSize());
    }

    window.addEventListener("resize", handleResize);

    return function unmount() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

function Checkbox(props) {
  return React.createElement("input", {
    type: "checkbox",
    checked: props.isChecked,
    onChange: props.onChange
  });
}

function CheckboxCanvas() {
  const windowSize = useWindowSize();
  const [point, setPoint] = React.useState(null);

  const width = Math.floor(windowSize.width / 20);
  const height = Math.floor(windowSize.height / 20);

  React.useEffect(function() {
    const interval = setInterval(function() {
      const randomPoint = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      };

      setPoint(randomPoint);
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  const canvas = emptyCanvas(width, height);

  if (point) {
    flipBit(canvas, point.x, point.y);
  }

  const checkboxes = canvas.map((row, rowIndex) =>
    React.createElement(
      "div",
      { key: rowIndex },
      row.map((isChecked, columnIndex) =>
        React.createElement(Checkbox, {
          key: columnIndex,
          isChecked,
          onChange: () => {
            console.log(`Clicked (${columnIndex}, ${rowIndex})`);
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
    checkboxes
  );
}

const target = document.querySelector(".js-Checkboxes");

ReactDOM.render(React.createElement(CheckboxCanvas), target);

if (target && target.classList.contains("isPaused")) {
  target.classList.remove("isPaused");
}
