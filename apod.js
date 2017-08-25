const Nightmare = require('nightmare');
const nightmare = Nightmare();

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
    return document.querySelector('body > p').textContent;
})
.then(function (result) {
    console.log(result);
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