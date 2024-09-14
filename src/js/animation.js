import { delay } from "./utils.js";

const PX_PER_MOVE = 2;

export const startChangePosition = function (currentTargetObject) {
  return new Promise((resolve) => {
    function startChangePosition1() {
      const heightOfTarget = parseInt(currentTargetObject.domGraph.style.height.slice(0, -2), 10);

      if (currentTargetObject.yPos > heightOfTarget) {
        resolve();
      } else {
        currentTargetObject.yPos += PX_PER_MOVE;
        currentTargetObject.domGraphBox.style.transform = `translate(${currentTargetObject.xPos}px, ${currentTargetObject.yPos}px)`;
        requestAnimationFrame(startChangePosition1);
      }
    }

    requestAnimationFrame(startChangePosition1);
  });
};

export const searchPosition = function (currentTargetObject) {
  return new Promise ((resolve) => {
    const dummy = currentTargetObject.xPos;
    function searchPosition1() {
      if (currentTargetObject.xPos <= -80 + dummy) {
        resolve();
      } else {
        currentTargetObject.xPos -= PX_PER_MOVE;
        currentTargetObject.domGraphBox.style.transform = `translate(${currentTargetObject.xPos}px, ${currentTargetObject.yPos}px)`;
        requestAnimationFrame(searchPosition1);
      }
    }
    requestAnimationFrame(searchPosition1);
  });
};

export const fixPosition = function (currentTargetObject) {
  return new Promise((resolve) => {
    function fixPosition1() {
      if (currentTargetObject.yPos <= 0) {
        resolve();
      } else {
        currentTargetObject.yPos -= PX_PER_MOVE;
        currentTargetObject.domGraphBox.style.transform = `translate(${currentTargetObject.xPos}px, ${currentTargetObject.yPos}px)`;
        requestAnimationFrame(fixPosition1);
      }
    }
    requestAnimationFrame(fixPosition1);
  });
};

export const moveRight = function (compareTargetObject) {
  return new Promise((resolve) => {
    let xPos = 0;
    function moveRight1() {
      if (xPos >= 80) {
        resolve();
      } else {
        xPos += PX_PER_MOVE;
        compareTargetObject.xPos += PX_PER_MOVE;
        compareTargetObject.domGraphBox.style.transform = `translate(${compareTargetObject.xPos}px, ${compareTargetObject.yPos}px)`;
        requestAnimationFrame(moveRight1);
      }
    }
    requestAnimationFrame(moveRight1);
  });
};

export const checkTargets = function (currentIndex, compareIndex, abc,  isFixed) {
  const graphs = document.querySelectorAll(".graph");
  const currentGraph = graphs[currentIndex].classList;
  const comparedGraph = graphs[compareIndex].classList;

  if (isFixed === false) {
    const preComparedGraph = graphs[abc].classList;
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

export const endChangePosition = function (nodeArray) {
  return new Promise ((resolve) => {
    nodeArray.forEach(async element => {
      const messageForUserText = document.querySelector("#messageForUserText");
      messageForUserText.textContent = "Insertion 정렬 완료! 또 해보세요! 😃";
      messageForUserText.style.color = "blue";

      element.classList.toggle("colorCompare");
      element.classList.toggle("colorDefault");
      await delay(500);

      element.classList.toggle("colorCompare");
      element.classList.toggle("colorDefault");
      await delay(500);

      resolve();
    });
  });
};
