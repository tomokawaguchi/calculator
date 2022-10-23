// separate () from operator
// Only allowed to type operator right after the number or ')' else do nothing
// readyToCalc() --> num + operator + num set with/without ()
// When () exist in the string, put it in an array and calculate

// 3*(4-2)
// (3+1)*2
// (3*3)-(5*3)
// ((5-2)*3+(4-2))-5
// 100*(5-(6/3)+7)

// when there is no ()
// Priority of * and / --> find first * or / as well as numbers before/after until you finish calculating * or /
// ---> better to put it in the array?
// 12-3*40/2

// data-type -->
// data-key --> numbers / * / '/' /

const btnsWrapper = document.querySelector(".btns-wrapper");
let currentFullStr = "";
let currentFrontStr = "";
let currentComputeStr = "";
let currentResult = "";
let processArea;
let halfwayArea;

btnsWrapper.addEventListener("click", (event) => {
  processArea = document.getElementById("process-display");
  halfwayArea = document.getElementById("halfway-result");
  const btn = event.target;
  const { type } = btn.dataset; // Evaluates number / decimal / operator / brackets / equal / back / clear
  const { key } = btn.dataset; //

  // Update the frontend with the final result when '=' is pressed

  // Update the frontend with the current result
  updateProcessArea(currentResult);
});

// Update the process area
function updateProcessArea(result) {
  processArea.innerHTML = `<span>${result}</span>`;
}

// Update the halfway area
function updateHalfwayArea(result) {
  halfwayArea.innerHTML = `<span>${result}</span>`;
}
