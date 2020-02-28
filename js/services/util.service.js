export const utilService = {
    getRandom,
    makeLorem,
    makeId,
    createWord,
    getFormattedDate,
    getFormattedHour
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

function getFormattedHour(timestamp) {
    const time = new Date(timestamp)
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = (hours >= 12) ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeStr = hours + ':' + minutes + ' ' + ampm;
    return timeStr
}

function getFormattedDate(timestamp) {
    const time = new Date(timestamp)
    // Replace '.' with '/'
    return time.toLocaleString().split(',')[0].replace(/\./g, '/');
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
