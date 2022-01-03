const answer = document.getElementById("answer");
answer.innerText = "0";
let display = "";
let secondNumber = null;
let nextNumber = false;

const clear = document.getElementById("clear");
clear.addEventListener('click', () => {
    location.reload();
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

plus.addEventListener('click', () => {
    evaluate("+");
});
minus.addEventListener('click', () => {
    evaluate("-");
})
multiply.addEventListener('click', () => {
    evaluate("*");
})
divide.addEventListener('click', () => {
    evaluate("/");
})
equals.addEventListener('click', () =>{
    evaluate("");
})

let nextFunc = "";
function evaluate(currentFunc) {
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
                display = 0;
            }
        }
        secondNumber = null;
    }
    nextNumber = true;
    nextFunc = currentFunc;
}