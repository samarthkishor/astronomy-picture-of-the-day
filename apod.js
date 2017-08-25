const Nightmare = require('nightmare');
const nightmare = Nightmare();
const fs = require('fs');


// format the current date
const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const date = `${month}-${day}-${year}`;


// start the web scraper
nightmare
.goto('https://apod.nasa.gov/apod/')
.wait('body > p')
.evaluate(function () {
    return document.querySelector('body > p').textContent.trim();
})
.then(function (result) {
    fs.appendFile('explanations.txt', date + ', ' + result + '\n\n');
    return nightmare
        .click('body > center:nth-child(1) > p:nth-child(3) > a > img')
        .wait(5000)
        .screenshot(`./lib/${date}.jpg`)
        .then(function () {
            return nightmare.end();
        });
})
.catch(function (error) {
    console.error(error);
});