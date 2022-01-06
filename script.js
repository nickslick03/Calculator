const answer = document.getElementById("answer");
answer.innerText = "0";
let display = "";
let secondNumber = null;
let nextNumber = false;
let isDecimal = false;
let nextFunc = "";
let history = [];
let historyIndex = 1;

document.getElementById("clear").addEventListener('click', () => {
    answer.innerText = "0";
    display = "";
    secondNumber = null;
    nextNumber = false;
    isDecimal = false;
    nextFunc = "";
    history = [];
    historyIndex = 0;
});

history[0] = [answer.innerText, display, secondNumber, nextNumber, isDecimal, nextFunc];
document.getElementById("grid-container").addEventListener('click', function(e) {
    if(e.target.id == "undo") {
        return;
    }
    historyIndex++;
    history[historyIndex] = [answer.innerText, display, secondNumber, nextNumber, isDecimal, nextFunc];
    console.table(history);
});

document.getElementById("undo").addEventListener('click', () => {
    historyIndex-=1;
    undo(history[historyIndex]);
})
function undo(snapshot) {
    if(snapshot === undefined) {
        return;
    }
    answer.innerText = snapshot[0];
    display = snapshot[1];
    secondNumber = snapshot[2];
    nextNumber = snapshot[3];
    isDecimal = snapshot[4];
    nextFunc = snapshot[5];
}

const numbers = [
    document.getElementById("zero"),
    document.getElementById("one"),
    document.getElementById("two"),
    document.getElementById("three"),
    document.getElementById("four"),
    document.getElementById("five"),
    document.getElementById("six"),
    document.getElementById("seven"),
    document.getElementById("eight"),
    document.getElementById("nine"),
];
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if(nextNumber == false) {
            display += numbers.indexOf(number)+"";
            answer.innerText = display;
            tooLong();
        }
        else {
            secondNumber = parseFloat(display);
            display = numbers.indexOf(number);
            answer.innerText = display;
            nextNumber = false;
        }
    })
});

function tooLong() {
    if ((display + "").length > 13) {
        display = (display + "").substring(0, 13);
        answer.innerText = display;
    }
}

const squareRoot = document.getElementById("square-root");
const percent = document.getElementById("percent");
const sign = document.getElementById("sign");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const equals = document.getElementById("equals");
const decimal = document.getElementById("decimal");

squareRoot.addEventListener('click', () => {
    evaluate("sqrt");
});
percent.addEventListener('click', () => {
    evaluate("%");
});
sign.addEventListener('click', () => {
    evaluate("sign");
});
plus.addEventListener('click', () => {
    evaluate("+");
});
minus.addEventListener('click', () => {
    evaluate("-");
});
multiply.addEventListener('click', () => {
    evaluate("*");
});
divide.addEventListener('click', () => {
    evaluate("/");
});
equals.addEventListener('click', () => {
    evaluate("");
});
decimal.addEventListener('click', () => {
    if(!isDecimal) {
        if(nextNumber == true) {
            secondNumber = parseFloat(display);
            display = ".";
            answer.innerText = display;
            nextNumber = false;
        } else {
            display += ".";
        answer.innerText = display;
        isDecimal = true;  
        }
    }
});

function evaluate(currentFunc) {
    if(currentFunc == "sqrt") {
        if(parseFloat(display) >= 0) {
            display = Math.sqrt(parseFloat(display));
            answer.innerText = display;  
        } else {
            display = "):";
            answer.innerText = display;
        }
    } else if(currentFunc == "%") {
        display *= .01;
        answer.innerText = display;
    } else if(currentFunc == "sign") {
        display *= -1;
        answer.innerText = display;
    }
    if(secondNumber != null) {
        if(nextFunc === "+") {
            display = secondNumber + parseFloat(display);
            answer.innerText = display;
        } else if(nextFunc === "-") {
            display = secondNumber - parseFloat(display);
            answer.innerText = display;
        } else if(nextFunc === "*") {
            display = secondNumber * parseFloat(display);
            answer.innerText = display;
        } else if(nextFunc === "/") {
            if(parseFloat(display) != 0) {
                display = secondNumber / parseFloat(display);
                answer.innerText = display;
            } else {
                display = "):";
                answer.innerText = display;
            }
        }
        secondNumber = null;
    } if(display == "") {
        display = 0;
    }
    tooLong();
    nextNumber = true;
    nextFunc = currentFunc;
    isDecimal = false;
}
