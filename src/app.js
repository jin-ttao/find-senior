const inputNumbers = document.querySelector("#userInputNumbers");
const inputNumbersButton = document.querySelector("#userInputNumbersButton");
const graphBoxs = document.querySelectorAll(".graphBox");
const graphBoxArr = Array.from(graphBoxs);

let numbersArr;
let animationId = null;
const PX_PER_MOVE = 2;

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
    graphNew.id = "graphBox" + index;

    graphBoxs[index].appendChild(graphNew);
  });
};

const startChangePosition = async function (currentTargetObject) {
  console.log("current 아래로 내려감 - startChangePosition");
  currentTargetObject.yPos += PX_PER_MOVE;

  // console.log('start ', currentTargetObject.yPos);
  if (currentTargetObject.yPos >= 100) {
    cancelAnimationFrame(animationId);
    return;
  }
  console.log("#1 startChangePosition");
  graphBoxArr[currentTargetObject.domIndex].style.transform = `translate(${currentTargetObject.xPos}px, ${currentTargetObject.yPos}px)`;
  animationId = requestAnimationFrame(()=> startChangePosition(currentTargetObject));
  console.log("#2 startChangePosition");
};

const searchPosition = async function (currentTargetObject) {
  console.log("current 좌로 감 - searchPosition");
  currentTargetObject.xPos -= PX_PER_MOVE;

  // console.log('search ', currentTargetObject.yPos, currentTargetObject.xPos, PX_PER_MOVE);
  if (currentTargetObject.xPos <= -80) {
    cancelAnimationFrame(animationId);
    return;
  }
  
  graphBoxArr[currentTargetObject.domIndex].style.transform = `translate(${currentTargetObject.xPos}px, ${currentTargetObject.yPos}px)`;
  animationId = requestAnimationFrame(() => searchPosition(currentTargetObject));
};

const fixPosition = async function (currentTargetObject) {
  console.log("current 위로 올라감 - fixPosition");
  currentTargetObject.yPos += PX_PER_MOVE;

  if (currentTargetObject.yPos < -1) {
    cancelAnimationFrame(animationId);
    return;
  }

  graphBoxArr[currentTargetObject.domIndex].style.transform = `translate(${currentTargetObject.xPos}px, ${currentTargetObject.yPos}px)`;
  animationId = requestAnimationFrame(() => fixPosition(currentTargetObject));
};

const moveRight = async function (compareTargetObject) {
  console.log("compare 오른쪽으로 뺌 - moveRight");
  compareTargetObject.xPos += PX_PER_MOVE;

  if (compareTargetObject.xPos >= 80) {
    cancelAnimationFrame(animationId);
    return;
  }

  graphBoxArr[compareTargetObject.domIndex].style.transform = `translate(${compareTargetObject.xPos}px, ${compareTargetObject.yPos}px)`;
  animationId = requestAnimationFrame(() => moveRight(compareTargetObject));
};

const checkTargets = function (currentIndex, compareIndex, isFixed) {
  const currentGraph = graphBoxs[currentIndex].classList;
  const comparedGraph = graphBoxs[compareIndex].classList;
  const preComparedGraph = graphBoxs[compareIndex + 1].classList;

  if (isFixed === false) {
    preComparedGraph.toggle("colorCompare");
    preComparedGraph.toggle("colorDefault");
  
    comparedGraph.toggle("colorCompare");
    comparedGraph.toggle("colorDefault");

    return;
  }

  currentGraph.toggle("colorDefault");
  currentGraph.toggle("colorCurrent");
  
  comparedGraph.toggle("colorDefault");
  comparedGraph.toggle("colorCompare");
};

const sortArray = async function (array) {
  const sortedArray = array.map((number, index) => Object({"number": number, "domIndex": index, "xPos": 0, "yPos": 0}));

  for (let currentIndex = 1; currentIndex < sortedArray.length; currentIndex++) {
      const currentNumberObject = sortedArray[currentIndex];
      let compareIndex = currentIndex - 1;
      let isFixed = true;

      checkTargets(currentNumberObject.domIndex, sortedArray[compareIndex].domIndex);
      console.log("sort-currentNumberObject", currentNumberObject);

      while ((compareIndex >= 0) && (sortedArray[compareIndex].number > currentNumberObject.number)) {
        if (isFixed === true) {
          console.log("await startChangePosition 시작");
          await startChangePosition(currentNumberObject);
          // console.log("await startChangePosition 끝");
          // console.log(startChangePosition(currentNumberObject));
          // await new Promise(requestAnimationFrame(()=> startChangePosition(currentNumberObject)));
        }
        
        if (isFixed === false) {
          checkTargets(currentNumberObject.domIndex, sortedArray[compareIndex].domIndex, isFixed);
        }
        console.log("compareIndex", compareIndex); // compareIndex 0
        console.log("sortedArray[compareIndex]", sortedArray[compareIndex]); // {number: 90, domIndex: 0, xPos: 0, yPos: 0}
        console.log("await moveRight 시작");
        await requestAnimationFrame(() => moveRight(sortedArray[compareIndex]));
        console.log("await moveRight 끝");
        // await moveRight(sortedArray[compareIndex]);
        await requestAnimationFrame(() => searchPosition(currentNumberObject));
        // await searchPosition(currentNumberObject);

        sortedArray[compareIndex + 1] = sortedArray[compareIndex];
        compareIndex--;
        
        isFixed = false;
      }
      // 음수로 내려가는 경우 임의 처리.
      if (compareIndex < 0) {
        compareIndex = 0;
      }
      // console.log("#", currentNumberObject.domIndex);
      // console.log("##sortedArray[compareIndex]", sortedArray[compareIndex]);
      checkTargets(currentNumberObject.domIndex, sortedArray[compareIndex].domIndex);
      
      sortedArray[compareIndex + 1] = currentNumberObject;

      if (compareIndex + 1 !== currentIndex) {
        await fixPosition(currentNumberObject);
      }

  }
  console.log("알고리즘 종료");
  console.log("결과", sortedArray);
  return sortedArray.map(object => object.number);
};

inputNumbersButton.addEventListener("click", saveNumbers);
document.getElementById("testButton").addEventListener("click", () => sortArray(numbersArr));
