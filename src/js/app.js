import { sortNumbers } from "./sorting.js";

const inputNumbers = document.querySelector("#userInputNumbers");
const inputNumbersButton = document.querySelector("#userInputNumbersButton");
const messageForUserText = document.querySelector("#messageForUserText");

let numbersArr = [];
messageForUserText.textContent = "1 부터 9999 까지 숫자들을 입력하면 오름차순으로 정렬 돼요!"

const saveNumbers = async function () {
  numbersArr = inputNumbers.value.trim().split(',').map(Number);
  const isBlankValue = inputNumbers.value.trim().split(',').includes('');
  const isBlankBetweenNumbers = inputNumbers.value.trim().split('').includes('');
  const isPrimeNumbers = inputNumbers.value.trim().split('').includes('.');
  const isAllPositiveNumbersInRange = numbersArr.every((num) => {
    if (num <= 0 || num >= 10000) {
      return false;
    }

    return typeof num === 'number' && !isNaN(num);
  });

  if (isBlankValue || isBlankBetweenNumbers || isPrimeNumbers || !isAllPositiveNumbersInRange) {
    inputNumbers.value = null;

    messageForUserText.style.color = "red";
    messageForUserText.textContent = "0 보다 큰 정수를 입력해 주세요!";

    return;
  }

  if (isAllPositiveNumbersInRange) {
    inputNumbers.value = numbersArr;
    messageForUserText.textContent="";
    inputNumbersButton.removeEventListener("click", saveNumbers);

    renderNumberGraph(numbersArr);
    await sortNumbers(numbersArr);

    inputNumbersButton.addEventListener("click", saveNumbers);

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
