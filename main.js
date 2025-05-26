let previousOperand = "";
let currentOperand = "";
let operation = "";
let result = "";

// All necessary elements from html
const previousDisplayNumber = document.querySelector("[data-previous]");
const currentDisplayNumber = document.querySelector("[data-current]");

const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete");
const equalsButton = document.querySelector("[data-equals");

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");

// All Clear button //
allClearButton.addEventListener("click", allClear);
function allClear() {
  previousDisplayNumber.textContent = "";
  currentDisplayNumber.textContent = "";
  previousOperand = "";
  currentOperand = "";
  operation = "";
  result = "";
}

// Delete button //
deleteButton.addEventListener("click", deleteNumber);
function deleteNumber() {
  currentOperand = currentOperand.slice(0, -1);
  currentDisplayNumber.textContent = currentOperand;
}

// Equals button //
equalsButton.addEventListener("click", () => {
  if (previousOperand && currentOperand) compute();
  console.log(result);
});
function compute() {
  let a = parseFloat(previousOperand);
  let b = parseFloat(currentOperand);
  switch (operation) {
    case "÷":
      result = a / b;
      break;
    case "*":
      result = a * b;
      break;
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    default:
      break;
  }
  currentDisplayNumber.textContent = result;
  previousDisplayNumber.textContent = "";
  currentOperand = "" + result;
  previousOperand = "";
  operation = "";
}

// Number buttons //
numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    appendNumber(e.target.textContent);
  });
});
function appendNumber(number) {
  // Check if dot is clicked more than 1 times
  if (number === "." && currentDisplayNumber.textContent.includes(".")) return;
  // If we have result, clicked number should overwrite the result and current operand
  if (result) {
    result = "";
    currentOperand = "";
  }
  // Check if 0 is clicked more than 1 times initially
  if (currentOperand === "0" && number === "0") return;
  // If we have 0 initially and  click numbers between 1-9, it should overwrite 0
  if (currentOperand === "0" && number !== "0" && number !== ".") {
    currentOperand = number;
    // Otherwise numbers between 0-9 should append to current operand
  } else {
    currentOperand += number;
  }
  // Update current display with current operand
  currentDisplayNumber.textContent = currentOperand;
}

operationButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (currentOperand && !operation) chooseOperation(e.target.textContent);
  });
});
function chooseOperation(op) {
  operation = op;
  previousOperand = currentOperand;
  previousDisplayNumber.textContent = previousOperand + " " + operation;
  currentOperand = "";
  currentDisplayNumber.textContent = "";
}
