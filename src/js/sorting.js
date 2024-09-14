import {
  fixPosition,
  checkTargets,
  startChangePosition,
  moveRight,
  searchPosition,
} from "./animation.js";

export const sortArray = async function (array) {
  const sortedArray = array.map((number, index) =>
    Object({ number: number, domIndex: index, xPos: 0, yPos: 0 })
  );

  for (
    let currentIndex = 1;
    currentIndex < sortedArray.length;
    currentIndex++
  ) {
    const currentNumberObject = sortedArray[currentIndex];
    let compareIndex = currentIndex - 1;
    let isFixed = true;

    checkTargets(
      currentNumberObject.domIndex,
      sortedArray[compareIndex].domIndex
    );

    while (
      compareIndex >= 0 &&
      sortedArray[compareIndex].number > currentNumberObject.number
    ) {
      if (isFixed === true) {
        await startChangePosition(currentNumberObject);
      }

      if (isFixed === false) {
        checkTargets(
          currentNumberObject.domIndex,
          sortedArray[compareIndex].domIndex,
          isFixed
        );
      }

      await moveRight(sortedArray[compareIndex]);
      await searchPosition(currentNumberObject);

      sortedArray[compareIndex + 1] = sortedArray[compareIndex];
      compareIndex--;

      isFixed = false;
    }

    checkTargets(
      currentNumberObject.domIndex,
      sortedArray[compareIndex + 1].domIndex
    );

    sortedArray[compareIndex + 1] = currentNumberObject;

    if (compareIndex + 1 !== currentIndex) {
      await fixPosition(currentNumberObject);
    }
  }
  console.log("end");
  return sortedArray.map((object) => object.number);
};
