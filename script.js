let processArea = document.getElementById("process-display");
let halfwayArea = document.getElementById("halfway-resultt");

const btnsWrapper = document.querySelector(".btns-wrapper");
let enteredStr = "";
let enteredStrForDisplay = "";
// var halfwayResult = "";
const regexNonNums = /[^0-9]/g;

btnsWrapper.addEventListener("click", (event) => {
  // Gettting the clicked button value and showcase it in the porcess area
  let clickedItemContent = event.target.innerHTML;
  enteredStrForDisplay += clickedItemContent;

  // Convert some operators to be computer compatible for calculation
  if (clickedItemContent == "÷") {
    enteredStr += "/";
  } else if (clickedItemContent == "×") {
    enteredStr += "*";
  } else {
    enteredStr += clickedItemContent;
  }

  // when the string contains the operator and the last charactar isn't operator
  if (enteredStr.search(regexNonNums) && regexNonNums.test(enteredStr.charAt(enteredStr.length - 1))) {
    let currentResult = calculate(enteredStr);
    // console.log(currentResult);
    halfwayArea.innerHTML = `<span>${currentResult}</span>`;
  }

  // When '=' is entered
  if (/=/.test(enteredStr.charAt(enteredStr.length - 1))) {
    processArea.innerHTML = `<span>${currentResult}</span>`;
    halfwayArea.innerHTML = ``;
  } else {
    processArea.innerHTML = `<span>${enteredStrForDisplay}</span>`;
  }
});

function calculate(enteredStr) {
  return new Function(`return ${enteredStr}`)();
}
