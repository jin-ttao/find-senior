/**
 * 입력 받은 숫자의 배열을 받아 오름차순으로 정렬하여 반환함.
 * 정렬 단계마다 해당 바들의 위치가 변경되는 애니메이션이 보여짐
 * 
 * @param {array} array 입력 받은 숫자의 배열
 * @returns {array} 오름차순으로 정렬된 숫자의 배열
 */
export async function sortArray(array) {
  const sortedArray = array;
  for (let currentIndex = 1; currentIndex < sortedArray.length; currentIndex++) {
      const currentVacoPeople = sortedArray[currentIndex];
      let compareIndex = currentIndex - 1;
      await highlightBar(currentIndex, "on");

      while ((compareIndex >= 0) && (sortedArray[compareIndex] > currentVacoPeople)) {
        sortedArray[compareIndex + 1] = sortedArray[compareIndex];
        await highlightBar(compareIndex, "on");
        await switchBar(currentIndex, compareIndex);
        await highlightBar(compareIndex, "off");
        compareIndex--;
      }
      sortedArray[compareIndex + 1] = currentVacoPeople;
      await highlightBar(currentIndex, "off");
  }
  return sortedArray;
}

/**
* 딜레이를 넣어서 await이 정상적으로 작동하는지 테스트 하기위한 stub
* 파라미터는 언제든지 변경 가능
* 
* @param {number} currentIndex 
* @param {number} compareIndex 
*/
function switchBar(currentIndex, compareIndex) {
  sleep(1000);
  console.log("현재 바:", currentIndex, "바꿀 바:", compareIndex);
}

function highlightBar(index, mode) {
  sleep(1000);
  if (mode === "on") {
    console.log("하이라이트된 바:", index);
  } else if (mode === "off") {
    console.log("하이라이트가 종료 된 바:", index);
  }
  
}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const exampleArray = [5, 2, 3, 1, 4];
sortArray(exampleArray).then(result => console.log(result));
