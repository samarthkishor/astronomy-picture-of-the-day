const Nightmare = require('nightmare');
const nightmare = Nightmare();
const fs = require('fs');


// format the current date in mm-dd-yyyy
const today = new Date();
let month = '';
if (today.getMonth() + 1 < 10) {
    const intMonth = today.getMonth() + 1
    month = '0' + intMonth.toString();
}
else {
    month = today.getMonth() + 1;
}
let day = ''
if (today.getDate() < 10) {
    const intDay = today.getDate()
    day = '0' + intDay.toString();
}
else {
    month = today.getDate();
}
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
        todaysData = jsonData.elements[jsonData.elements.length - 1];
        // only add the data if the file is not updated
        if (todaysData.date !== date) {
            jsonData.elements.push(entry);
            fs.writeFile('./lib/explanations/explanations.json', JSON.stringify(jsonData, null, 4), (error) => {
                if (error) throw error;
                console.log('The explanation has been saved.');
            });
        }
        else {
            console.log('The data already exists.');
        }
    });

    return nightmare
        .click('body > center:nth-child(1) > p:nth-child(3) > a > img')
        .wait(5000)
        .screenshot(`./lib/pictures/${date}.jpg`)
        .then(() => {
            console.log('The picture has been saved.')
            return nightmare.end();
        });
})
.catch((error) => {
    console.error(error);
});
