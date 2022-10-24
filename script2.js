const btnsWrapper = document.querySelector(".btns-wrapper");

let processArea;
let halfwayArea;

let typedStr = ""; // to update the top display
let computableStr = ""; // to calculate
let currentResult = ""; // to update the bottom display
let finalResult = ""; // to update the final result
let prevStrLength = 0;
const operators = /[-+/*]/g;
// let bracketsCounter = 0;

btnsWrapper.addEventListener("click", (event) => {
  processArea = document.getElementById("process-display"); // Top display area
  halfwayArea = document.getElementById("halfway-result"); // Bottom display area
  const btn = event.target;
  const { type } = btn.dataset; // Evaluates number / decimal / operator / brackets / equal / back / clear
  const { key } = btn.dataset; // 0~9 / . / () / +-*/

  typedStr += btn.innerHTML;
  computableStr += key == "undefined" ? "" : key;

  // if (type == "brackets") {
  //   typedStr = typedStr.substring(0, typedStr.length - 2); // remove ()

  //   if (bracketsCounter % 2 != 0) {
  //     computableStr = computableStr.substring(0, -1);
  //     computableStr += ")";
  //     typedStr += ")";
  //   } else {
  //     typedStr += "(";
  //   }

  //   bracketsCounter++;
  // }

  // It wipes all when 'AC' is pressed
  if (type === "clear") {
    typedStr = "";
    computableStr = "";
    currentResult = "";
    finalResult = "";
    // bracketsCounter = 0;
  }

  // Update the frontend with the final result when '=' is pressed
  if (type === "equal") {
    if (currentResult != "") {
      typedStr = "";
      finalResult = currentResult;
    } else {
      // Remove '=' from the strings
      typedStr = typedStr.slice(0, -1);
      computableStr = computableStr.slice(0, -1);
    }
  }

  // Erase the last char when 'back' btn is pressed
  // 'del' to remove from the string
  if (type == "back") {
    typedStr = typedStr.substring(0, typedStr.length - 4);
    computableStr = typedStr.substring(0, typedStr.length - 4);
    currentResult = "";
  }

  // Check if it's ready to calculate even partially
  if (!isReadyToCalculate(computableStr)) {
    updateHalfwayArea("");
  }

  try {
    currentResult = calculate(computableStr);
    updateHalfwayArea(currentResult);
  } catch (error) {
    updateHalfwayArea("");
  }

  // Update the frontend with the current entered values
  // If finalResult has any values, it updates accordingly
  finalResult == "" ? updateProcessArea(typedStr) : updateAllArea(finalResult);
});

// Calculate the math
function calculate(str) {
  return new Function(`return ${str}`)() || "";
}

// Check if the entered values make sense for start calculating
function isReadyToCalculate(str) {
  const hasString = str.search(operators) > 0;
  const notEndWithDot = str.charAt(str.length - 1) != ".";
  const containsParentheses = str.match(/[(]/g)?.length == str.match(/[)]/g)?.length;
  return hasString && notEndWithDot && containsParentheses;
}

function updateAllArea(result) {
  halfwayArea.innerHTML = `<span></span>`;
  processArea.innerHTML = `<span>${result}</span>`;
}

// Update the process area
function updateProcessArea(result) {
  processArea.innerHTML = `<span>${result}</span>`;
}

// Update the halfway area
function updateHalfwayArea(result) {
  halfwayArea.innerHTML = `<span>${result}</span>`;
}
