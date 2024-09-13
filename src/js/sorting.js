import {fixPosition, checkTargets, startChangePosition, moveRight, searchPosition} from "./animation.js"

/**
 * 입력 받은 숫자의 배열을 받아 오름차순으로 정렬하여 반환함.
 * 정렬 단계마다 해당 바들의 위치가 변경되는 애니메이션이 보여짐
 * 
 * @param {array} array 입력 받은 숫자의 배열
 * @returns {array} 오름차순으로 정렬된 숫자의 배열
 */
export const sortArray = async function (array) {
    const graphBoxs = document.querySelectorAll(".graphBox");
    const graph = document.querySelectorAll(".graph");
    const sortedArray = array.map((number, index) => Object({"number": number, "domIndex": index, "domGraphBox": graphBoxs[index], "domGraph": graph[index], "xPos": 0, "yPos": 0, }));
  
    for (let currentIndex = 1; currentIndex < sortedArray.length; currentIndex++) {
        const currentNumberObject = sortedArray[currentIndex];
        let compareIndex = currentIndex - 1;
        let isFixed = true;
  
        checkTargets(currentNumberObject.domIndex, sortedArray[compareIndex].domIndex);
        await delay(500);
        
  
        while ((compareIndex >= 0) && (sortedArray[compareIndex].number > currentNumberObject.number)) {
          if (isFixed === true) {
            await startChangePosition(currentNumberObject);
          }
          
          if (isFixed === false) {
            checkTargets(currentNumberObject.domIndex, sortedArray[compareIndex].domIndex, sortedArray[compareIndex + 1].domIndex, isFixed);
            await delay(500);
          }

          await moveRight(sortedArray[compareIndex]);
          await searchPosition(currentNumberObject);
  
          sortedArray[compareIndex + 1] = sortedArray[compareIndex];
          compareIndex--;
          
          isFixed = false;
        }

        let tempCompareIndex = compareIndex
        if (isFixed) {
          tempCompareIndex --;
        }
        
        checkTargets(currentNumberObject.domIndex, sortedArray[tempCompareIndex+1].domIndex);
        await delay(500);
  
        sortedArray[compareIndex + 1] = currentNumberObject;
  
        if (compareIndex + 1 !== currentIndex) {
          await fixPosition(currentNumberObject);
        }
  
    }
    console.log("end");
    return sortedArray.map(object => object.number);
  };


function delay(ms) {
  return new Promise((resolve) => setTimeout(() => {
    resolve();
  }, ms));
}