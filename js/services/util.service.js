export const utilService = {
    getRandom,
    makeLorem,
    makeId,
    getFormattedNowDate,
    createWord
}

//The maximum is exclusive and the minimum is inclusive
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

function makeId(length = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
// Returns a lorem with 'length' chars.
function makeLorem(length) {
    var randStr = '';
    while (randStr.length < length) {
        var wordLength = getRandom(3, 6);
        var word = createWord(wordLength);

        if (Math.random() > 0.9) word += ',';

        randStr += word + ' ';
    }
    randStr = randStr.substring(0, length);
    randStr = randStr[0].toUpperCase() + randStr.substr(1)

    return randStr;
}

function getFormattedNowDate() {
    const date = new Date();
    const year = date.getFullYear().toString()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    if (month < 10) month = '0' + month
    if (day < 10) month = '0' + day
    return year + '-' + month + '-' + day
}

function createWord(length) {
    var word = '';
    while (word.length < length) {
        var randChar = _getRandChar();
        word += randChar;
    }
    return word;
}

//Private

function _getRandChar() {
    var LETTERS = 'abcdefghijklmnopqrstuvwxyz';
    var randIndex = parseInt(Math.random() * LETTERS.length)
    return LETTERS.charAt(randIndex);
}
