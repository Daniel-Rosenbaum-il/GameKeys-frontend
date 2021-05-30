
export const utilService = {
    delay,
    getRandomInt,
    makeId,
    getDateFormat
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
function getDateFormat(date) {
    console.log(date);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currDate = new Date(date)
    const year = currDate.getFullYear();
    const month = months[currDate.getMonth() - 1]
    const day = currDate.getDay();
    let dateStr = (day < 10) ? `0${day}` : `${day}`
    dateStr += ` ${month}, ${year}`
    console.log('Datestr', dateStr);
    return dateStr
}