// Query DOM for page elements
var leftnum = document.getElementById("num1");
var rightnum = document.getElementById("num2");
var operator = document.getElementById("sign");
var submit = document.getElementById("submit");
var reset = document.getElementById("reset");
var userAnswer = document.getElementById("userAnswer");
var mathSigns = document.getElementsByName("operator");
var totalDiv = document.getElementById("total");
var numRightDiv = document.getElementById("numRight");
// Initialize solution and counters
var solution, runningTotal = 0, tally = 0;
// Store available math symbols in array
// var mathSigns = ["+", "x"];
// var mathSigns = ["+", "-", "X", "\u00F7"];
// Add event handlers to both form buttons
submit.addEventListener("click", solve, false);
reset.addEventListener("click", newEquation, false);
document.getElementsByTagName("fieldset")[0].addEventListener("click", init, false);

// Generate new numbers and math signs
function init() {
    // Generate two random numbers
    // between 1 and 10
    var num1 = Math.ceil(Math.random() * 99);
    var num2 = Math.ceil(Math.random() * 9);
    for (var i = 0; i < mathSigns.length; i++) {
      if (mathSigns[i].checked) {
        chosenSign = mathSigns[i];
      }
    }
    // var pickedSign = mathSigns[Math.floor(Math.random() * mathSigns.length)]

    // Place random numbers in their
    // respective <span>s on the page
    leftnum.textContent = num1;
    rightnum.textContent = num2;
    operator.textContent = chosenSign.nextElementSibling.textContent;
    
    userAnswer.textContent = "";
    // Focus the keyboard on the answer field
    userAnswer.focus();
    
    if (submit.hasAttribute("disabled")) {
        submit.removeAttribute("disabled");
        submit.style.color = "white";
        submit.textContent = "Solve";
        userAnswer.value = "";
        userAnswer.style.backgroundColor = "aquamarine";
        userAnswer.style.color = "rebeccapurple";
        reset.setAttribute("disabled");
    }
    reset.setAttribute("disabled", "disabled");
    
    // Return an array containing the randomly generated items
    return numbers = [num1, num2, chosenSign.id];
}

function newEquation() {
    if (!submit.hasAttribute("disabled")) {
        solve();
    }
    submit.textContent = "Solve";
    submit.style.color = "white";
    tally++;
    userAnswer.style.backgroundColor = "aquamarine";
    userAnswer.style.color = "rebeccapurple";
    userAnswer.value = "";
    userAnswer.focus();
    submit.removeAttribute("disabled");
    init();
}

function increaseProgressWidth() {
    if (numRightDiv.style.width != "0px") {
        var currentWidth = Number(numRightDiv.style.width.slice(0,2));
        currentWidth += 10;
        numRightDiv.style.width = currentWidth + "%";
        if (numRightDiv.style.width == "100%") {
                    document.body.innerHTML = "<h1>Great job</h1><p>You solved 10 math problems!</p><a href='javascript:history.go(0);'>Again</a>";
        }
    } else {
        numRightDiv.style.width = "10%";
    }
}

// Display answer on page
function solve() {
    switch (numbers[2]) {
        case "add":
            solution = numbers[0] + numbers[1];
            break;
        case "subtract":
            solution = numbers[0] - numbers[1];
            break;
        case "multiply":
            solution = numbers[0] * numbers[1];
            break;
        case "divide":
            solution = numbers[0] / numbers[1];
            break;
    }
    if (userAnswer.value == solution) {
        userAnswer.style.backgroundColor = "white";
        userAnswer.style.color = "green";
        this.textContent = "Correct";
        this.style.color = "green";
        runningTotal++;
        increaseProgressWidth();
    } else {
        userAnswer.style.backgroundColor = "crimson";
        userAnswer.style.color = "white";
        userAnswer.value = solution;
        this.textContent = "Wrong";
        this.style.color = "crimson";
    }
    submit.setAttribute("disabled", "disabled");
    reset.removeAttribute("disabled");
    return solution;
}

init();