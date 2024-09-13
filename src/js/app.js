import { sortArray } from "./sorting.js";

const inputNumbers = document.querySelector("#userInputNumbers");
const inputNumbersButton = document.querySelector("#userInputNumbersButton");
const testButton = document.getElementById("testButton");
const graphBoxs = document.querySelectorAll(".graphBox");

let numbersArr = [];

const saveNumbers = function () {
    numbersArr = inputNumbers.value.split(',').map((num) => {
        return parseInt(num.trim(), 10);
    });

    const isAllNumber = numbersArr.every((num) => {
        return typeof num === 'number' && !isNaN(num);
    });

    if (isAllNumber) {
        renderNumberGraph(numbersArr);
    } else {
        inputNumbers.value = null;
    }
};

const renderNumberGraph = function (array) {
    array.forEach((number, index) => {
        const graphNew = document.createElement("div");
        graphNew.classList.add("graph", "colorDefault");
        graphNew.style.height = number + "px";
        graphBoxs[index].appendChild(graphNew);
    });
};

inputNumbersButton.addEventListener("click", saveNumbers);
testButton.addEventListener("click", () => sortArray(numbersArr));
