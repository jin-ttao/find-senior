import { sortArray } from "./sorting.js";

const inputNumbers = document.querySelector("#userInputNumbers");
const inputNumbersButton = document.querySelector("#userInputNumbersButton");
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
        sortArray(numbersArr).then(result => console.log(result));
    } else {
        inputNumbers.value = null;
    }
};

const renderNumberGraph = function (array) {
    array.forEach((number, index) => {
        const graphNew = document.createElement("div");
        graphNew.classList.add("graph");
        graphNew.style.height = number + "px";
        graphBoxs[index].appendChild(graphNew);
    });
};

inputNumbersButton.addEventListener("click", saveNumbers);

  
// const graphBox = document.querySelector(".graph");
// graphBoxs[0].style.transform = "translateX(100px)";
