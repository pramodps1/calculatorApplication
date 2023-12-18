function lastAscendingNumber(n) {
    let digits = Array.from(String(n), Number);
    for (let i = digits.length - 2; i >= 0; i--) {
        if (digits[i] > digits[i + 1]) {
            digits[i]--;
            for (let j = i + 1; j < digits.length; j++) {
                digits[j] = 9;
            }
        }
    }    if (digits[0] === 0) {
        digits.shift();
    }

    return parseInt(digits.join(''), 10);
}