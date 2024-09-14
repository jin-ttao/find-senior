import { sortArray } from "./sorting.js";

const inputNumbers = document.querySelector("#userInputNumbers");
const inputNumbersButton = document.querySelector("#userInputNumbersButton");
const testButton = document.getElementById("testButton");
const graphBoxs = document.querySelectorAll(".graphBox");

let numbersArr = [];

const saveNumbers = async function () {
    numbersArr = inputNumbers.value.split(',').map((num) => {
        return parseInt(num.trim(), 10);
    });

    const isAllNumber = numbersArr.every((num) => {
        return typeof num === 'number' && !isNaN(num);
    });

    if (isAllNumber) {
        inputNumbersButton.removeEventListener("click", saveNumbers);
        renderNumberGraph(numbersArr);
        await sortArray(numbersArr);
        inputNumbersButton.addEventListener("click", saveNumbers);
    } else {
        inputNumbers.value = null;
    }
};

const renderNumberGraph = function (array) {
    const main = document.querySelector("main");
    main.innerHTML = '';
    array.forEach((number) => {
        const graphNew = document.createElement("div");
        graphNew.classList.add("graph", "colorDefault");
        graphNew.style.height = number + "px";

        const graphBox = document.createElement("div");
        graphBox.classList.add("graphBox");

        graphBox.appendChild(graphNew);
        main.appendChild(graphBox);
    });
};

inputNumbersButton.addEventListener("click", saveNumbers);
