const answer = document.getElementById("answer");
answer.innerText = "0";
let display = "";
let secondNumber = null;
let nextNumber = false;
let isDecimal = false;
let nextFunc = "";
let currentOpaque = null;
let history = [];
let historyIndex = 0;
history[0] = [answer.innerText, display, secondNumber, nextNumber, isDecimal, nextFunc, currentOpaque];

document.getElementById("clear").addEventListener('click', () => {
    clear();
});

function clear() {
    answer.innerText = "0";
    display = "";
    secondNumber = null;
    nextNumber = false;
    isDecimal = false;
    nextFunc = "";
    opaque(equals);
    history = [];
    historyIndex = 0;
    history[0] = [answer.innerText, display, secondNumber, nextNumber, isDecimal, nextFunc, currentOpaque];
}

document.getElementById("grid-container").addEventListener('click', (e) => {
    if(e.target.id == "undo" || e.target.id == "redo" || e.target.id == "clear" || e.target.id == "grid-container") {
        return;
    }
    recordHistory(e);
});

function recordHistory() {
    if(history[historyIndex].toString() === [answer.innerText, display, secondNumber, nextNumber, isDecimal, nextFunc, currentOpaque].toString()) {
        return;
    }
    if(history.length - 1 != historyIndex) {
        history.splice(historyIndex+1);
    }
    historyIndex++;
    history[historyIndex] = [answer.innerText, display, secondNumber, nextNumber, isDecimal, nextFunc, currentOpaque];
    console.clear();
    console.table(history);
    console.log(history.length);
    console.log(historyIndex);
}

document.getElementById("undo").addEventListener('click', () => {
    if(historyIndex == 0) {
        return;
    }
    historyIndex -= 1;
    undoOrRedo(history[historyIndex]);
})
document.getElementById("redo").addEventListener('click', () =>{
    if(history.length - 1 <= historyIndex) {
        return;
    }
    historyIndex += 1;
    undoOrRedo(history[historyIndex]);
})
function undoOrRedo(snapshot) {
    if(snapshot === undefined) {
        return;
    }
    answer.innerText = snapshot[0];
    display = snapshot[1];
    secondNumber = snapshot[2];
    nextNumber = snapshot[3];
    isDecimal = snapshot[4];
    nextFunc = snapshot[5];
    opaque(snapshot[6]);
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
numbers.forEach(function(numberButton) {
    numberButton.addEventListener('click', () => {
        addNumberListener(numbers.indexOf(numberButton))
    });
});

function addNumberListener(num) {
        if(nextNumber == false) {
            display += num+"";
            answer.innerText = display;
            tooLong();
        }
        else {
            secondNumber = parseFloat(display);
            display = num;
            answer.innerText = display;
            nextNumber = false;
        }
}

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

let didKeyPressedMatter = true;
document.addEventListener('keydown', (e) => {
    console.log(e.key);
    didKeyPressedMatter = true;
    switch(e.key) {
        case "ArrowLeft":
            if(historyIndex == 0) {
                return;
            }
            historyIndex -= 1;
            undoOrRedo(history[historyIndex]);
            didKeyPressedMatter = false;
        break;
        case "ArrowRight":
            if(history.length - 1 <= historyIndex) {
                return;
            }
            historyIndex += 1;
            undoOrRedo(history[historyIndex]);
            didKeyPressedMatter = false;
        break;
        case "c":
        case "escape":
            clear();
            didKeyPressedMatter = false;
        break;
        case "1": addNumberListener(1); break;
        case "2": addNumberListener(2); break;
        case "3": addNumberListener(3); break;
        case "4": addNumberListener(4); break;
        case "5": addNumberListener(5); break;
        case "6": addNumberListener(6); break;
        case "7": addNumberListener(7); break;
        case "8": addNumberListener(8); break;
        case "9": addNumberListener(9); break;
        case "0": addNumberListener(0); break;
        case "%":
            display *= .01;
            answer.innerText = display;
        break;
        case "+":
            evaluate(plus.id);
            opaque(plus);
        break;
        case "-":
            evaluate(minus.id);
            opaque(minus);
        break;
        case "*":
            evaluate(multiply.id);
            opaque(multiply);
        break;
        case "/":
            evaluate(divide.id);
            opaque(divide);
        break;
        case "=":
        case "Enter":
            evaluate(equals.id);
            opaque(equals);
        break;
        case ".": addDecimal(); break;
        default: didKeyPressedMatter = false; break;
    }
    if(didKeyPressedMatter) {
        recordHistory();
    }
})

squareRoot.addEventListener('click', () => {      
    if(parseFloat(display) >= 0) {
        display = Math.sqrt(parseFloat(display));
        answer.innerText = display;
        opaque(equals);
        secondNumber = null;
        currentFunc = "";
        tooLong();
        return;
    } else {
            display = "):";
            answer.innerText = display;
    }
});
percent.addEventListener('click', () => {  
    display *= .01;
    answer.innerText = display;
});
sign.addEventListener('click', () => {
    display *= -1;
    answer.innerText = display;
});
plus.addEventListener('click', () => {
    evaluate(plus.id);
    opaque(plus);
});
minus.addEventListener('click', () => {
    evaluate(minus.id);
    opaque(minus);
});
multiply.addEventListener('click', () => {
    evaluate(multiply.id);
    opaque(multiply);
});
divide.addEventListener('click', () => {
    evaluate(divide.id);
    opaque(divide);
});
equals.addEventListener('click', () => {
    evaluate(equals.id);
    opaque(equals);
});
decimal.addEventListener('click', () => {
    addDecimal();
});

function addDecimal() {
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
    isDecimal = true;
}

function evaluate(currentFunc) {
    if(secondNumber != null) {
        switch (nextFunc) {
            case "plus":
                display = secondNumber + parseFloat(display);
            break;
            case "minus":
                display = secondNumber - parseFloat(display);
            break;
            case "multiply":
                display = secondNumber * parseFloat(display);
            break;
            case "divide":
                if(parseFloat(display) != 0) {
                    display = secondNumber / parseFloat(display);
                } else {
                    display = "):";
                }
            break;
        }
        answer.innerText = display;
    } 
    tooLong();
    if(display == "") {
        display = 0;
    }
    nextNumber = true;
    nextFunc = currentFunc;
    isDecimal = false;
    if(isNaN(secondNumber) || isNaN(display)) {
        display = "):";
        answer.innerText = display;
    }
    secondNumber = null;
}

function opaque(div) {
    if(div === null) {
        if(currentOpaque != null) {
            currentOpaque.style.cssText = "opacity:1;";
        }
        return;
    }
    if(currentOpaque === null) {
        currentOpaque = div;
    }
    if(div === equals) {
        currentOpaque.style.cssText = "opacity:1;";
        currentOpaque = div;
        return;
    }
    currentOpaque.style.cssText = "opacity:1;";
    currentOpaque = div;
    currentOpaque.style.cssText = "opacity:.5;";
} 