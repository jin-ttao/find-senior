const inputNumbers = document.querySelector("#userInputNumbers");
const inputNumbersButton = document.querySelector("#userInputNumbersButton");
const graphBoxs = document.querySelectorAll(".graphBox");

const numbersArr = [];

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


let element1 = document.getElementById("graphBox1"); // 받아와야 하는 데이터 - 비교 인덱스
let element2 = document.getElementById("graphBoxB"); // 받아와야 하는 데이터 - 현재 인덱스
let element3 = document.getElementById("graphBoxC");
let animationId = null; // 중복 이벤트 방지, test용 코드
let yPos = 0; // y 시작 좌표
let xPos = 0; // x(비교 인덱스) 시작 좌표
let posNum = 2; // y 애니메이션 이동 범위

function checkTargets() {
  // 하이라이트
    element3.classList.toggle("colorDefault");
    element2.classList.toggle("colorDefault");
    element3.classList.toggle("colorCurrent");
    element2.classList.toggle("colorCompare");
}

// 자리 교체 O 아래로 내림
function startChangePosition() {
  yPos += posNum;

  if (yPos >= 100) { // 100 대신 바 길이 받아와야 함
    cancelAnimationFrame(animationId);
    return;
  }

  element3.style.transform = `translateY(${yPos}px)`;
  animationId = requestAnimationFrame(startChangePosition);
  // 현재 인덱스가 가리키는 DOM 요소, 바 길이
}

// 현재 인덱스 좌로 이동
function searchPosition() {
  xPos -= posNum;

  if (xPos <= -80) { // 100 대신 바 길이 받아와야 함
    cancelAnimationFrame(animationId);
    return;
  }

  element3.style.transform = `translateX(${xPos}px)`;
  animationId = requestAnimationFrame(searchPosition);
}

// 비교 인덱스 우로 이동
function moveRight() {
  xPos += posNum;

  if (xPos >= 80) { // 100 대신 바 길이 받아와야 함
    cancelAnimationFrame(animationId);
    return;
  }

  element3.style.transform = `translateX(${xPos}px)`;
  animationId = requestAnimationFrame(moveRight);
}

document.getElementById("testButton").addEventListener("click", function() {
  if (!animationId) {
    requestAnimationFrame(fixPosition);
  }
});

