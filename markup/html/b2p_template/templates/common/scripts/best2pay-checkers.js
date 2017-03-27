// function
function checkDigits(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    //if the key isn't the backspace key (which we should allow)
    if ((unicode < 48 || unicode > 57) && (unicode !== 8) && (unicode !== 9) && (unicode !== 37) && (unicode !== 39)) //if not a number
        return false; //disable key press
}

function checkPhone(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if ((unicode < 48 || unicode > 57) && (unicode !== 8) && (unicode !== 46) && (unicode !== 9) && (unicode !== 37) && (unicode !== 39)) //if not a number
    {
        var ch = String.fromCharCode(unicode);
        var s = "0123456789+-() ";
        return (s.indexOf(ch.toLowerCase()) >= 0);
    }
}

function checkLetters(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode !== 8 && (unicode !== 9) && (unicode !== 37) && (unicode !== 39)) { //if the key isn't the backspace key (which we should allow)
        var ch = String.fromCharCode(unicode);
        var s = "abcdefjhigklmnopqrstuvwyxyz-. ";
        return (s.indexOf(ch.toLowerCase()) >= 0);
    }
}
function checkCardNumber(e, el) {
    var value = el.value || '';
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (checkDigits(e) === false){
        return false;
    }
    if (unicode === 8){
        return;
    }
    if (/^\d{4}$/.test(value)){
        el.value = value + ' ';
        return;
    }
    if (/^\d{4}\s\d{4}$/.test(value)){
        el.value = value + ' ';
        return;
    }
    if (/^\d{4}\s\d{4}\s\d{4}$/.test(value)){
        el.value = value + ' ';
        return;
    }
}

//function checkCardNumber(e, el) {
//    var value = el.value || '';
//    if (checkDigits(e) === false) {
//        return false;
//    }
//    if (/^\d{4}$/.test(value)) {
//        el.value = value + ' ';
//        return;
//    }
//    if (/^\d{4}\s\d{4}$/.test(value)) {
//        el.value = value + ' ';
//        return;
//    }
//    if (/^\d{4}\s\d{4}\s\d{4}$/.test(value)) {
//        el.value = value + ' ';
//        return;
//    }
//}

function CardNumberFormat(e) {
    var el = e.target;
    var match = /^(\d{4})[^\d]*(\d{4})[^\d]*(\d{4})[^\d]*(\d+)$/.exec(el.value);
    if (match) {
        var groups = match.slice(1);
        el.value = groups.join(' ');
    }
}

function checkPrice(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    var el = e.target;
    var valueOld = el.value || '';
    //if the key isn't the backspace key (which we should allow)
    if ((unicode === 37) || (unicode === 39) || (unicode === 8) || (unicode == 9)) {
        return true;
    }
    if ((unicode < 48 || unicode > 57) && (unicode !== 46) && (unicode !== 44)) //if not a number
        return false; //disable key press
    var ch = String.fromCharCode(unicode);
    var pos = el.selectionStart;
    var value = [valueOld.slice(0, pos), ch, valueOld.slice(pos)].join('');
    if (value === '') {
        return;
    }
    if (/^\d+$/.test(value)) {
        return;
    }
    if (/^\d+(\.|,)$/.test(value)) {
        return;
    }
    if (/^\d+(\.|,)\d{0,2}$/.test(value)) {
        return;
    }
    return false;
}

function isValidEmail(email) {
    var validRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return validRegExp.test(email);
}

function isValidMonth(month) {
    if (checkDigits(e) === false) {
        return false;
    } else {
        return true;
    }
}

function checkEmail(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    var el = e.target;
    var valueOld = el.value || '';
    //if the key isn't the backspace key (which we should allow)
    if ((unicode === 37) || (unicode === 39) || (unicode === 8) || (unicode == 9)) {
        return true;
    }
    var ch = String.fromCharCode(unicode);
    var pos = el.selectionStart;
    var value = [valueOld.slice(0, pos), ch, valueOld.slice(pos)].join('');
    if (value === '') {
        return;
    }
    if (/^[a-zA-Z0-9._-]+$/.test(value)) {
        return;
    }
    if (/^[a-zA-Z0-9._-]+@$/.test(value)) {
        return;
    }
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(value)) {
        return;
    }
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
        return;
    }
    return false;
}

function checkLettersUnicode(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);
        return isValidChars(ch);
    }
}

function checkLettersUnicodeRus(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);
        
        return /^[-АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ абвгдеёжзийклмнопрстуфхцчшщъыьэюя]+$/i.test(ch);
    }
}

function checkNumber(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);
        return /^[0-9]+$/i.test(ch);
    }
}

function checkContractNumber(e) {
    if (checkDigits(e) !== false) {
        return;
    }
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 45 && (unicode != 61) && (unicode != 47) && (unicode != 92) && (unicode != 8470) && (unicode != 35)) {
        if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
            var ch = String.fromCharCode(unicode);
            return /^[a-zа-я]+$/i.test(ch);
        }
    }
}

//function to check valid email address
function isValidEmail(email) {
    var validRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return validRegExp.test(email);
}

//function to check valid phone address
function isValidPhone(phone) {
    var validRegExp = /^[0-9+\- \(\)]+$/;
    return validRegExp.test(phone);
}

function isValidChars(str) {
    var notValidRegExp = /^[^0-9]+$/;
    var validRegExp = /^.{1,70}$/;
    if (notValidRegExp.test(str)) {
        return validRegExp.test(str);
    } else {
        return false;
    }
}

function isValidCVC(cvc) {
    var validRegExp = /^[0-9]{3}$/;
    return validRegExp.test(cvc);
}


function Calculate(Luhn) {
    var sum = 0;
    for (i = 0; i < Luhn.length; i++) {
        sum += parseInt(Luhn.substring(i, i + 1));
    }
    var delta = new Array(0, 1, 2, 3, 4, -4, -3, -2, -1, 0);
    for (i = Luhn.length - 1; i >= 0; i -= 2) {
        var deltaIndex = parseInt(Luhn.substring(i, i + 1));
        var deltaValue = delta[deltaIndex];
        sum += deltaValue;
    }
    var mod10 = sum % 10;
    mod10 = 10 - mod10;
    if (mod10 == 10) {
        mod10 = 0;
    }
    return mod10;
}

function louna(card_number) {
    var arr = [],
            card_number = card_number.toString();
    for (var i = 0; i < card_number.length; i++) {
        if (i % 2 === 0) {
            var m = parseInt(card_number[i]) * 2;
            if (m > 9) {
                arr.push(m - 9);
            } else {
                arr.push(m);
            }
        } else {
            var n = parseInt(card_number[i]);
            arr.push(n)
        }
    }
//console.log(arr);
    var summ = arr.reduce(function (a, b) {
        return a + b;
    });
    return Boolean(!(summ % 10));

}