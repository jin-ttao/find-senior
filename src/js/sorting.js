import { endChangePosition, fixPosition, checkTargets, startChangePosition, moveRight, searchPosition } from "./animation.js"
import { delayAnimation } from "./utils.js";

export const sortNumbers = async function (array) {
    const graphBoxs = document.querySelectorAll(".graphBox");
    const graphs = document.querySelectorAll(".graph");
    const sortedArray = array.map((number, index) => Object({"number": number, "domIndex": index, "domGraphBox": graphBoxs[index], "domGraph": graphs[index], "xPos": 0, "yPos": 0, }));

    await delayAnimation(500);
    for (let currentIndex = 1; currentIndex < sortedArray.length; currentIndex++) {
        const currentNumberObject = sortedArray[currentIndex];
        let comparedIndex = currentIndex - 1;
        let isFixed = true;
  
        checkTargets(currentNumberObject.domIndex, sortedArray[comparedIndex].domIndex);
        await delayAnimation(500);
        
  
        while ((comparedIndex >= 0) && (sortedArray[comparedIndex].number > currentNumberObject.number)) {
          if (isFixed === true) {
            await startChangePosition(currentNumberObject);
          }
          
          if (isFixed === false) {
            checkTargets(currentNumberObject.domIndex, sortedArray[comparedIndex].domIndex, sortedArray[comparedIndex + 1].domIndex, isFixed);
            await delayAnimation(500);
          }

          await moveRight(sortedArray[comparedIndex]);
          await searchPosition(currentNumberObject);
  
          sortedArray[comparedIndex + 1] = sortedArray[comparedIndex];
          comparedIndex--;
          
          isFixed = false;
        }

        let tempComparedIndex = comparedIndex
        if (isFixed) {
          tempComparedIndex --;
        }
        
        if (comparedIndex + 1 !== currentIndex) {
          await fixPosition(currentNumberObject);
        }

        checkTargets(currentNumberObject.domIndex, sortedArray[tempComparedIndex+1].domIndex);
        await delayAnimation(500);
  
        sortedArray[comparedIndex + 1] = currentNumberObject;
    }
    await endChangePosition(graphs);

    return sortedArray.map(object => object.number);
  };
