const Nightmare = require('nightmare');
const nightmare = Nightmare();
const fs = require('fs');


// format the current date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const date = `${month}-${day}-${year}`;


// start the web scraper
nightmare
.goto('https://apod.nasa.gov/apod/')
.wait('body > p')
.evaluate(() => {
    return document.querySelector('body > p').textContent.trim();
})
.then((result) => {
    const entry = JSON.stringify({
        'date': date,
        'explanation': result.replace(/\n|Explanation:/g, ' ')
    }, null, 4);

    fs.writeFile('./lib/explanations/todaysExplanation.json', entry, (err) => {
        if (err) throw err;
        console.log('The file has been saved');
    });

    return nightmare
        .click('body > center:nth-child(1) > p:nth-child(3) > a > img')
        .wait(5000)
        .screenshot(`./lib/pictures/${date}.jpg`)
        .then(() => {
            return nightmare.end();
        });
})
.catch((error) => {
    console.error(error);
});
