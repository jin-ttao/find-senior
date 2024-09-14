import { delayAnimation } from "./utils.js";

const PX_PER_MOVE = 2;

export const startChangePosition = function (currentTargetObject) {
  return new Promise((resolve) => {
    function innerStartChangePosition() {
      const heightOfTarget = parseInt(currentTargetObject.domGraph.style.height.slice(0, -2), 10);

      if (currentTargetObject.yPos >= heightOfTarget) {
        resolve();
      } else {
        currentTargetObject.yPos += PX_PER_MOVE;
        currentTargetObject.domGraphBox.style.transform = `translate(${currentTargetObject.xPos}px, ${currentTargetObject.yPos}px)`;

        requestAnimationFrame(innerStartChangePosition);
      }
    }

    requestAnimationFrame(innerStartChangePosition);
    });
};

export const searchPosition = function (currentTargetObject) {
  return new Promise ((resolve) => {
    const xPosOfCurrentTarget = currentTargetObject.xPos;
    function innerSearchPosition() {
      if (currentTargetObject.xPos <= -80 + xPosOfCurrentTarget) {
        resolve();
      } else {
        currentTargetObject.xPos -= PX_PER_MOVE;
        currentTargetObject.domGraphBox.style.transform = `translate(${currentTargetObject.xPos}px, ${currentTargetObject.yPos}px)`;

        requestAnimationFrame(innerSearchPosition);
      }
    }
    requestAnimationFrame(innerSearchPosition);
  });
};

export const fixPosition = function (currentTargetObject) {
  return new Promise ((resolve) => {
    function innerFixPosition() {
      if (currentTargetObject.yPos <= 0) {
        resolve();
      } else {
        currentTargetObject.yPos -= PX_PER_MOVE;
        currentTargetObject.domGraphBox.style.transform = `translate(${currentTargetObject.xPos}px, ${currentTargetObject.yPos}px)`;

        requestAnimationFrame(innerFixPosition);
      }
    }
    requestAnimationFrame(innerFixPosition);
  })
};

export const moveRight = function (comparedTargetObject) {
  return new Promise ((resolve) => {
    let xPosForStopPosition = 0;
    function innerMoveRight() {
      if (xPosForStopPosition >= 80) {
        resolve();
      } else {
        xPosForStopPosition += PX_PER_MOVE;
        comparedTargetObject.xPos += PX_PER_MOVE;
        comparedTargetObject.domGraphBox.style.transform = `translate(${comparedTargetObject.xPos}px, ${comparedTargetObject.yPos}px)`;

        requestAnimationFrame(innerMoveRight);
      }
    }
    requestAnimationFrame(innerMoveRight);
  })
};

export const checkTargets = function (currentIndex, comparedIndex, preComparedIndex, isFixed) {
  const graphs = document.querySelectorAll(".graph");
  const currentGraph = graphs[currentIndex].classList;
  const comparedGraph = graphs[comparedIndex].classList;
  
  if (isFixed === false) {
    const preComparedGraph = graphs[preComparedIndex].classList;

    preComparedGraph.toggle("colorCompared");
    preComparedGraph.toggle("colorDefault");
  
    comparedGraph.toggle("colorCompared");
    comparedGraph.toggle("colorDefault");
    return;
  }

  currentGraph.toggle("colorDefault");
  currentGraph.toggle("colorCurrent");

  comparedGraph.toggle("colorDefault");
  comparedGraph.toggle("colorCompared");
};

export const endChangePosition = function (nodeArray) {
  return new Promise ((resolve) => {
    nodeArray.forEach(async element => {
      const messageForUserText = document.querySelector("#messageForUserText");

      messageForUserText.textContent = "Insertion 정렬 완료! 또 해보세요! 😃";
      messageForUserText.style.color = "blue";

      element.classList.toggle("colorCompared");
      element.classList.toggle("colorDefault");
      await delayAnimation(500);

      element.classList.toggle("colorCompared");
      element.classList.toggle("colorDefault");
      await delayAnimation(500);

      resolve();
    });
  });
};
