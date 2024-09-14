import { sortArray } from "./sorting.js";

const inputNumbers = document.querySelector("#userInputNumbers");
const inputNumbersButton = document.querySelector("#userInputNumbersButton");
const graphBoxs = document.querySelectorAll(".graphBox");
const messageForUserText = document.querySelector("#messageForUserText");

let numbersArr = [];

const saveNumbers = async function () {
  numbersArr = inputNumbers.value.split(',').map((num) => {
    return parseInt(num.trim(), 10);
  });

  const isAllNumber = numbersArr.every((num) => {
    return typeof num === 'number' && !isNaN(num);
  });

  if (isAllNumber) {
    messageForUserText.textContent="";
    inputNumbersButton.removeEventListener("click", saveNumbers);
    renderNumberGraph(numbersArr);
    await sortArray(numbersArr);
    inputNumbersButton.addEventListener("click", saveNumbers);
  } else {
    inputNumbers.value = null;
    messageForUserText.style.color = "red";
    messageForUserText.textContent = "숫자를 입력해 주세요.";
  }
};

const renderNumberGraph = function (array) {
  const graphArea = document.querySelector("#graphArea");

  graphArea.innerHTML = '';
  array.forEach((number) => {
    const graphNew = document.createElement("div");
    const graphValue = document.createElement("p");
    const heightRatio = (number/(Math.max(...array)));
    graphNew.classList.add("graph", "colorDefault");
    graphValue.classList.add("graph-value");
    graphNew.style.height = (heightRatio * 250) + "px";
    graphValue.textContent = number;

    const graphBox = document.createElement("div");
    graphBox.classList.add("graphBox");

    graphBox.appendChild(graphNew);
    graphBox.appendChild(graphValue);
    graphArea.appendChild(graphBox);
  });
};

inputNumbersButton.addEventListener("click", saveNumbers);
