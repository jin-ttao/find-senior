import { sortNumbers } from "./sorting.js";

const inputNumbers = document.querySelector("#userInputNumbers");
const inputNumbersButton = document.querySelector("#userInputNumbersButton");
const graphBoxs = document.querySelectorAll(".graphBox");
const messageForUserText = document.querySelector("#messageForUserText");

let numbersArr = [];

const saveNumbers = async function () {
  numbersArr = inputNumbers.value.trim().split(',').map(Number);

  const isAllNumber = numbersArr.every((num) => {
    return typeof num === 'number' && !isNaN(num);
  });

  if (isAllNumber) {
    inputNumbers.value = numbersArr;
    messageForUserText.textContent="";
    inputNumbersButton.removeEventListener("click", saveNumbers);

    renderNumberGraph(numbersArr);
    await sortNumbers(numbersArr);

    inputNumbersButton.addEventListener("click", saveNumbers);
  } else {
    inputNumbers.value = null;

    messageForUserText.style.color = "red";
    messageForUserText.textContent = "숫자를 입력해 주세요.";
    return;
  }
};

const renderNumberGraph = function (array) {
  const graphArea = document.querySelector("#graphArea");

  graphArea.innerHTML = '';

  array.forEach((number) => {
    const graphBox = document.createElement("div");
    const graphNew = document.createElement("div");
    const graphValue = document.createElement("p");
    const heightRatio = (number/(Math.max(...array)));

    graphBox.classList.add("graphBox");

    graphNew.classList.add("graph", "colorDefault");
    graphNew.style.height = (heightRatio * 250) + "px";

    graphValue.classList.add("graph-value");
    graphValue.textContent = number;

    graphArea.appendChild(graphBox);
    graphBox.appendChild(graphNew);
    graphBox.appendChild(graphValue);
  });
};

inputNumbersButton.addEventListener("click", saveNumbers);
