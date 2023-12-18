
function preCalculation(tokens) {
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
    let output = [];
    let operatorStack = [];

    tokens.forEach(token => {
        if (isNumeric(token)) {
            output.push(token);
        } else if (token in precedence) {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(' && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                output.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack[operatorStack.length - 1] !== '(') {
                output.push(operatorStack.pop());
            }
            operatorStack.pop(); // Remove '(' from the stack
        }
    });

    while (operatorStack.length > 0) {
        output.push(operatorStack.pop());
    }

    return output;
}

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}
function calculate(postfixTokens) {
    let stack = [];

    postfixTokens.forEach(token => {
        if (isNumeric(token)) {
            stack.push(parseFloat(token));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            switch(token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
            }
        }
    });

    return stack.pop();
}
function termCalculator(expression) {
    let tokens = tokenize(expression);
    let postfixTokens = preCalculation(tokens);
    return calculate(postfixTokens);
}
function tokenize(expression) {
    return expression.match(/\d+|\+|\-|\*|\/|\(|\)/g);
}
