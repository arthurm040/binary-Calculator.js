let view, operations, numbers;

function setup() {
    view = document.createElement("div");
    view.id = "res";
    let buttons = document.createElement("div");
    buttons.id = "btns";
    document.body.appendChild(view);
    document.body.appendChild(buttons);

    let btn0 = document.createElement("button");
    btn0.id = "btn0";
    btn0.innerHTML = "0";
    buttons.appendChild(btn0);

    let btn1 = document.createElement("button");
    btn1.id = "btn1";
    btn1.innerHTML = "1";
    buttons.appendChild(btn1);

    let btnClr = document.createElement("button");
    btnClr.id = "btnClr";
    btnClr.innerHTML = "C";
    buttons.appendChild(btnClr);

    let btnEql = document.createElement("button");
    btnEql.id = "btnEql";
    btnEql.innerHTML = "=";
    buttons.appendChild(btnEql);

    let btnSum = document.createElement("button");
    btnSum.id = "btnSum";
    btnSum.innerHTML = "+";
    buttons.appendChild(btnSum);

    let btnSub = document.createElement("button");
    btnSub.id = "btnSub";
    btnSub.innerHTML = "-";
    buttons.appendChild(btnSub);

    let btnMul = document.createElement("button");
    btnMul.id = "btnMul";
    btnMul.innerHTML = "*";
    buttons.appendChild(btnMul);

    let btnDiv = document.createElement("button");
    btnDiv.id = "btnDiv";
    btnDiv.innerHTML = "/";
    buttons.appendChild(btnDiv);

    buttons.addEventListener("click", calculate);

    operations = [btnEql, btnClr, btnSum, btnSub, btnMul, btnDiv];
    numbers = [btn0, btn1];

    blocking(operations, true, "0.5");
}

function blocking(operations, bool, opacity)
{
    for (let i = 0; i < operations.length; i++)
    {
        operations[i].disabled = bool;
        operations[i].style.opacity = opacity;
    }

}

setup();

let pressed;
let display = "";
let currentValue = "";
let sign = ["+"];
let values = [];
function calculate(e){
    pressed = e.target.innerHTML;
    switch (pressed)
    {
        case "0":
            if (operations[0].disabled === true)
                blocking(operations, false, "1");

            display += pressed;
            currentValue += pressed;
            view.innerText = display;
            break;
        case "1":
            if (operations[0].disabled === true)
                blocking(operations, false, "1");

            display += pressed;
            currentValue += pressed
            view.innerText = display;
            break;
        case "C":
            if (numbers[0].disabled === true)
                blocking(numbers, false, "1");

            display = "";
            sign = ["+"];
            currentValue = "";
            values = [];
            view.innerText = display;
            //console.log(sign, currentValue, values);
            break;
        case "=":
            if (numbers[0].disabled === true)
                blocking(numbers, false, "1");
            if (currentValue !== "")
                values.push(currentValue);

            //console.log(values);
            //console.log(sign);
            solve(values,sign);
            break;
        case "+":
            if (numbers[0].disabled === true)
                blocking(numbers, false, "1");

            if (currentValue !== "")
                values.push(currentValue);

            currentValue = "";
            sign.push(pressed);
            display += pressed;
            view.innerText = display;
            break;
        case "-":
            if (numbers[0].disabled === true)
                blocking(numbers, false, "1");

            if (currentValue !== "")
                values.push(currentValue);

            currentValue = "";
            sign.push(pressed);
            display += pressed;
            view.innerText = display;
            break;
        case "*":
            if (numbers[0].disabled === true)
                blocking(numbers, false, "1");

            if (currentValue !== "")
                values.push(currentValue);

            currentValue = "";
            sign.push(pressed);
            display += pressed;
            view.innerText = display;
            break;
        case "/":
            if (numbers[0].disabled === true)
                blocking(numbers, false, "1");

            if (currentValue !== "")
                values.push(currentValue);

            currentValue = "";
            sign.push(pressed);
            display += pressed;
            view.innerText = display;
            break;
        default:
            break;
    }
}

function solve(array, signs)
{
    let values2 = binaryToDecimal(array);
    let result = 0;
    for (let i = 0; i < signs.length; i++)
    {
        if (signs[i] === "+")
            result += values2[i];
        else
        {
            if (signs[i] === "-")
                result -= values2[i];
            else
            {
                if (signs[i] === "*")
                    result *= values2[i];
                else
                    result /= values2[i];
            }
        }
    }

    let newResult = decimalToBinary(result);
    view.innerText = newResult;
    values = [newResult];
    sign = ["+"];
    currentValue = "";

    //console.log(values);
    blocking(numbers, true, "0.5");

}

function binaryToDecimal(array)
{
    let result = 0;
    let value;
    let power = 1;
    let array2 = [];

    for (let i = 0; i < array.length; i++)
    {
        value = array[i];
        for (let j = value.length - 1; j >= 0; j--)
        {
            if (value.charAt(j) === '1')
                result += power;

            power *= 2;
        }
        array2[i] = result;
        result = 0;
        power = 1;
    }
    return array2;
}


function decimalToBinary(decimal)
{
    let power  = 1;
    let result = "";
    let powers = []

    while(power <= decimal)
    {
        powers.unshift(power);
        power *= 2;
    }

    for (let i = 0; i < powers.length; i++)
    {
        if (Math.floor(decimal/powers[i]) === 1)
        {
            decimal -= powers[i];
            result += "1";
        }
        else
            result += "0";
    }

    return result;
}