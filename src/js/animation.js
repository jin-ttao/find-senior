
const PX_PER_MOVE = 2;

export const startChangePosition = function (currentTargetObject) {
  return new Promise((resolve) => {
    function startChangePosition1() {
      if (currentTargetObject.yPos >= 100) {
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
  return new Promise ((resolve) => {
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
  })
};

export const moveRight = function (compareTargetObject) {
  return new Promise ((resolve) => {
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
  })
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