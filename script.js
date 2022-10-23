let currentResult = ""; // Ongoing result when the entered values make sense (ready to calculate)
let finalRsult = ""; // showcase as the final result when '=' is clicked
let currentFullStr = ""; // For the calculation
let currentChar = ""; //clicked current single item
let rowStrFromFront = ""; // For the frontend
const operators = /[-+/*]/g;
const brackets = "()";
const decimal = ".";
const ac = "AC";
const del = "DEL";
const equal = "=";
const devision = "÷";
const multiply = "×";
let processArea;
let halfwayArea;

const btnsWrapper = document.querySelector(".btns-wrapper");

btnsWrapper.addEventListener("click", (event) => {
  processArea = document.getElementById("process-display");
  halfwayArea = document.getElementById("halfway-result");

  // Gettting the clicked button value
  currentChar = event.target.innerHTML;
  // Add the current character to the currentFullStr
  currentFullStr += currentChar;
  rowStrFromFront += currentChar;

  // Convert some operators to be computer compatible for calculation
  // Othereise keep adding the new character to the currentFullStr
  if (currentChar == devision) {
    currentFullStr = currentFullStr.replace(devision, "/");
  }

  if (currentChar == multiply) {
    currentFullStr = currentFullStr.replace(multiply, "*");
  }

  if (currentChar == brackets) {
    // checks how many bracket already exists
    currentFullStr =
      currentFullStr.match(/[(]/g).length == currentFullStr.match(/[)]/g).length
        ? currentFullStr.slice(0, -1)
        : currentFullStr.slice(0, -2) + ")";
    rowStrFromFront = currentFullStr;
  }

  // when 'DEL' is clicked
  if (currentChar == del) {
    // Delete the last value
    currentFullStr = currentFullStr.substring(0, currentFullStr.length - 4);
    rowStrFromFront = rowStrFromFront.substring(0, rowStrFromFront.length - 4);
    currentResult = currentFullStr;
  }

  // when '=' is clicked
  if (currentChar == equal) {
    finalRsult = calculate(currentFullStr.slice(0, -1));
    rowStrFromFront = finalRsult;
    currentResult = "";
    currentFullStr = "";
    updateHalfwayArea(currentResult);
    updateProcessArea(finalRsult);
  }

  // when 'AC' is clicked
  if (currentChar == ac) {
    currentResult = "";
    finalRsult = "";
    rowStrFromFront = "";
    currentFullStr = "";
    updateHalfwayArea(currentResult);
    updateProcessArea(finalRsult);
  }
  // Update the process area with current result if the current values make sense to calcurate
  currentResult = isReadyToCalculate(currentFullStr) ? calculate(currentFullStr) : "";
  updateHalfwayArea(currentResult);
  updateProcessArea(rowStrFromFront);

  // when the entered values make sense, calculate
  if (currentResult) {
    currentResult = calculate(currentFullStr);
    // Update the process area with current result
    updateHalfwayArea(currentResult);
  }
  console.log(currentResult);
});

// Check the entered values are ready to go ahead with calculation
function isReadyToCalculate(str) {
  // Return true when the string contains operator,
  // the second character from the last is operator,
  // the last character is number or ')'
  // if there are any (), there need to be a pair of ()

  return true;
  // str.search(operators) != -1 &&
  // (operators.test(str.charAt(str.length - 2)) || !isNaN(str.charAt(str.length - 2))) &&
  // (!isNaN(str.charAt(str.length - 1)) || str.charAt(str.length - 1) == ")") &&
  // str.match(/[(]/g)?.length == str.match(/[)]/g)?.length
}

// Update the process area
function updateProcessArea(result) {
  processArea.innerHTML = `<span>${result}</span>`;
}

// Update the halfway area
function updateHalfwayArea(result) {
  halfwayArea.innerHTML = `<span>${result}</span>`;
}

// Calcurating the math
function calculate(str) {
  return new Function(`return ${str}`)();
}
