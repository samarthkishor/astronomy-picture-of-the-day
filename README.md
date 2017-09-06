# astronomy-picture-of-the-day

A program that scrapes NASA's Astronomy Picture of the Day website and automatically creates a pdf with the picture and explanation.

## Installation
> Note: Make sure you have LaTeX, Node.js, and Python 3 installed before proceeding. The program uses Node for the web scraper and Python for creating and compiling the LaTeX file into a pdf.

First clone the repository and run

    npm install nightmare

and

    pip3 install pylatex

to install the required dependencies.

## Setup

Create a folder called `lib` and within that folder create a folder called `explanations` and another called `pictures`.

Within the `explanations` folder, create a file called `explanations.json` with the collowing content:

```[json]
{
    "elements": [

    ]
}
```

The file structure should now look like this:

    .
    ├── apod.js
    ├── lib
    |   ├── explanations
    |   |   └── explanations.json
    |   └── pictures
    ├── node_modules
    ├── package.json
    ├── README.md
    ├── script.sh
    ├── tex
    |   └── buildTex.py

Next, open `script.sh` in a text editor and replace the sample path on line 4 with the path to the repository directory.

Open `apod.js` and comment out lines 47, 53, 54, 55, and 56 to ensure that the program runs successfully the first time.

## Implementation

To run the program, simply run

    bash script.sh

and the resulting pdf should be located in `/tex/astronomy-picture-of-the-day.pdf`

After the first successful execution of the program, uncomment the lines in `apod.js` that were commented before.

## Notes

- See the [PyLaTeX](https://jeltef.github.io/PyLaTeX/latest/index.html) and [Nightmare](https://github.com/segmentio/nightmare#api) documentation for additional information.