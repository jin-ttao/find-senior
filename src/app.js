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
  } else {
    inputNumbers.value = null;
  }
};

const renderNumberGraph = function (array) {
  array.forEach((number, index) => {
    const graphNew = document.createElement("div");
    graphNew.classList.add("graph");
    graphNew.style.height = number + "px";
    graphNew.id = "graphBox" + index;

    graphBoxs[index].appendChild(graphNew);
  });
};

inputNumbersButton.addEventListener("click", saveNumbers);


let element1 = document.getElementById("graphBox1");
let element2 = document.getElementById("graphBoxB");
let element3 = document.getElementById("graphBoxC");
let animationId = null;
let yPos = 0;
let xPos = 0;
let posNum = 2;

function checkTargets(currentIndex, compareIndex, isFixed) {
  if (!isFixed) {
    graphBoxs[currentIndex].classList.toggle("colorDefault");
    graphBoxs[compareIndex].classList.toggle("colorDefault");
    graphBoxs[currentIndex].classList.toggle("colorCurrent");
    graphBoxs[compareIndex].classList.toggle("colorCompare");
    return;
  }
  graphBoxs[currentIndex].classList.toggle("colorDefault");
  graphBoxs[compareIndex].classList.toggle("colorDefault");
  graphBoxs[currentIndex].classList.toggle("colorCurrent");
  graphBoxs[compareIndex].classList.toggle("colorCompare");
}

function startChangePosition() {
  yPos += posNum;

  if (yPos >= 100) {
    cancelAnimationFrame(animationId);
    return;
  }

  element3.style.transform = `translate(${xPos}px, ${yPos}px)`;
  animationId = requestAnimationFrame(startChangePosition);

}

function searchPosition() {
  xPos -= posNum;
  
  if (xPos <= -80) {
    cancelAnimationFrame(animationId);
    return;
  }
  
  element3.style.transform = `translate(${xPos}px, ${yPos}px)`;
  animationId = requestAnimationFrame(searchPosition);
}


function fixPosition() {
  yPos -= posNum;

  if (yPos < -1) {
    cancelAnimationFrame(animationId);
    return;
  }

  element3.style.transform = `translate(${xPos}px, ${yPos}px)`;
  animationId = requestAnimationFrame(fixPosition);
}

function moveRight() {
  xPos += posNum;

  if (xPos >= 80) {
    cancelAnimationFrame(animationId);
    return;
  }

  element3.style.transform = `translate(${xPos}px, ${yPos}px)`;
  animationId = requestAnimationFrame(moveRight);
}

document.getElementById("testButton").addEventListener("click", function () {
  if (!animationId) {
    requestAnimationFrame(startChangePosition);
  }
});
