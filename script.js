// All elements from the document
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete");
const equalButton = document.querySelector("[data-equals");
const operationButtons = document.querySelectorAll("[data-operation]");
const numberButtons = document.querySelectorAll("[data-number]");
const prevDisplay = document.querySelector("[data-previous]");
const currentDisplay = document.querySelector("[data-current]");

// Global variables
let currentOperand = "";
let currentOperation = "";
let prevOperand = "";

// Numbers
numberButtons.forEach((btn) => {
    btn.addEventListener("click", getNumber);
});

// Operations
operationButtons.forEach((btn) => {
    btn.addEventListener("click", getOperation);
});

// Equal button
equalButton.addEventListener("click", () => {
    if (currentOperand && prevOperand) calculate();
});

// All clear button
allClearButton.addEventListener("click", clear);

// Delete button
deleteButton.addEventListener("click", deleteNumber);

function getNumber(event) {
    let number = event.target.textContent;

    if (currentOperand.includes(".") && number == ".") return;

    if (currentOperand == "" && number == ".") return;

    if (currentOperand == "0" && number == "0") return;

    if (currentOperand == "0" && number != ".") {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateScreen();
}

function getOperation(event) {
    if (!currentOperand) return;
    if (prevOperand) calculate();

    currentOperation = event.target.textContent;
    prevOperand = currentOperand;
    currentOperand = "";

    updateScreen();
}

function calculate() {
    let result = "";

    prevOperand = parseFloat(prevOperand);
    currentOperand = parseFloat(currentOperand);

    switch (currentOperation) {
        case "+":
            result = (prevOperand + currentOperand).toFixed(10);
            break;
        case "-":
            result = (prevOperand - currentOperand).toFixed(10);
            break;
        case "*":
            result = (prevOperand * currentOperand).toFixed(10);
            break;
        case "÷":
            result = (prevOperand / currentOperand).toFixed(10);
            break;
        default:
            console.log("error");
            return;
    }

    currentOperand = parseFloat(result);
    prevOperand = "";
    currentOperation = "";

    updateScreen();
}

function clear() {
    currentOperand = "";
    currentOperation = "";
    prevOperand = "";
    updateScreen();
}

function deleteNumber() {
    currentOperand = currentOperand.slice(0, -1);
    updateScreen();
}

function updateScreen() {
    console.log(currentOperand.toLocaleString());
    currentOperand = String(currentOperand);
    // currentOperand = currentOperand.toLocaleString();
    currentDisplay.textContent = currentOperand;
    prevDisplay.textContent = prevOperand + " " + currentOperation;
}
