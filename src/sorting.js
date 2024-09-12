/**
 * 입력 받은 숫자의 배열을 받아 오름차순으로 정렬하여 반환함.
 * 정렬 단계마다 해당 바들의 위치가 변경되는 애니메이션이 보여짐
 * 
 * @param {array} array 입력 받은 숫자의 배열
 * @returns {array} 오름차순으로 정렬된 숫자의 배열
 */
export async function sortArray(array) {
  const sortedArray = array.map((number, index) => Object({"number": number, "domIndex": index + 1}));

  for (let currentIndex = 1; currentIndex < sortedArray.length; currentIndex++) {
      const currentNumber = sortedArray[currentIndex];
      let compareIndex = currentIndex - 1;
      await highlightBar(sortedArray[currentIndex].domIndex, "on");

      while ((compareIndex >= 0) && (sortedArray[compareIndex].number > currentNumber.number)) {
        await highlightBar(sortedArray[compareIndex].domIndex, "on");
        await switchBar(currentNumber.domIndex, sortedArray[compareIndex].domIndex);
        await highlightBar(sortedArray[compareIndex].domIndex, "off");
        sortedArray[compareIndex + 1] = sortedArray[compareIndex];
        compareIndex--;
      }
      await highlightBar(currentNumber.domIndex, "off");
      sortedArray[compareIndex + 1] = currentNumber;
  }
  return sortedArray.map(object => object.number);
}

/**
* 딜레이를 넣어서 await이 정상적으로 작동하는지 테스트 하기위한 stub
* 파라미터는 언제든지 변경 가능
* 
* @param {number} currentIndex 
* @param {number} compareIndex 
*/
function switchBar(currentDomIndex, compareDomIndex) {
  sleep(500);
  console.log("현재 바:", currentDomIndex, "바꿀 바:", compareDomIndex);
}

function highlightBar(domIndex, mode) {
  sleep(500);
  if (mode === "on") {
    console.log("하이라이트된 바:", domIndex);
  } else if (mode === "off") {
    console.log("하이라이트가 종료 된 바:", domIndex);
  }
  
}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const exampleArray = [5, 2, 3, 1, 4];
sortArray(exampleArray).then(result => console.log(result));
