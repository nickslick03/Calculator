const answer = document.getElementById("answer");
answer.innerText = "0";
let display = "";
let secondNumber = null;
let nextNumber = false;
let nextFunc = "";

const clear = document.getElementById("clear");
clear.addEventListener('click', () => {
    answer.innerText = "0";
    display = "";
    secondNumber = null;
    nextNumber = false;
    nextFunc = "";
});

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
        }
        else{
            secondNumber = parseFloat(display);
            display = numbers.indexOf(number);
            answer.innerText = display;
            nextNumber = false;
        }
    })
});

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const squareRoot = document.getElementById("square-root");
const percent = document.getElementById("percent");
const sign = document.getElementById("sign");
const equals = document.getElementById("equals");


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
squareRoot.addEventListener('click', () => {
    evaluate("sqrt");
});
percent.addEventListener('click', () => {
    evaluate("%");
});
sign.addEventListener('click', () => {
    evaluate("sign");
});
equals.addEventListener('click', () =>{
    evaluate("");
});


function evaluate(currentFunc) {
    if(currentFunc == "sqrt") {
        display = Math.sqrt(parseFloat(display));
        answer.innerText = display;
    }
    else if(currentFunc == "%") {
        display *= .01;
        answer.innerText = display;
    }
    else if(currentFunc == "sign") {
        display *= -1;
        answer.innerText = display;
    }
    if(secondNumber != null) {
        if(nextFunc === "+") {
            display = secondNumber + parseFloat(display);
            answer.innerText = display;
        }
        else if(nextFunc === "-") {
            display = secondNumber - parseFloat(display);
            answer.innerText = display;
        }
        else if(nextFunc === "*") {
            display = secondNumber * parseFloat(display);
            answer.innerText = display;
        }
        else if(nextFunc === "/") {
            if(parseFloat(display) != 0) {
                display = secondNumber / parseFloat(display);
                answer.innerText = display;
            } else {
                display = "):";
                answer.innerText = display;
            }
        }
        secondNumber = null;
    }
    if(display == "") {
        display = 0;
    }
    nextNumber = true;
    nextFunc = currentFunc;
}