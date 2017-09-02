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
    const entry = {
        'date': date,
        'picture': `./lib/pictures/${date}.jpg`,
        'explanation': result.replace(/\n|Explanation:/g, ' ')
    };
    fs.readFile('./lib/explanations/explanations.json', 'utf8', (error, data) => {
        if (error) throw error;
        let jsonData = JSON.parse(data);
        // let elements = jsonData.elements
        jsonData.elements.push(entry);
        fs.writeFile('./lib/explanations/explanations.json', JSON.stringify(jsonData, null, 4), (error) => {
            if (error) throw error;
            console.log('The file has been saved');
        });
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
