import { sortArray } from "./sorting.js";

const inputNumbers = document.querySelector("#userInputNumbers");
const inputNumbersButton = document.querySelector("#userInputNumbersButton");
const testButton = document.getElementById("testButton");
const graphBoxs = document.querySelectorAll(".graphBox");
const messageForUserText = document.querySelector("#messageForUserText");

let numbersArr = [];

const saveNumbers = function () {
    numbersArr = inputNumbers.value.split(',').map((num) => {
        return parseInt(num.trim(), 10);
    });

    const isAllNumber = numbersArr.every((num) => {
        return typeof num === 'number' && !isNaN(num);
    });

    if (isAllNumber) {
        messageForUserText.remove();
        renderNumberGraph(numbersArr);
        sortArray(numbersArr);
    } else {
        inputNumbers.value = null;
        messageForUserText.textContent = "숫자를 입력해 주세요.";
    }
};

const renderNumberGraph = function (array) {
    const main = document.querySelector("main");
    array.forEach((number) => {
        const graphNew = document.createElement("div");
        const graphValue = document.createElement("p");
        graphNew.classList.add("graph", "colorDefault");
        graphValue.classList.add("graph-value");
        graphNew.style.height = number + "px";
        graphValue.textContent = number;

        const graphBox = document.createElement("div");
        graphBox.classList.add("graphBox");

        graphBox.appendChild(graphValue);
        graphBox.appendChild(graphNew);
        main.appendChild(graphBox);
    });
};

inputNumbersButton.addEventListener("click", saveNumbers);
