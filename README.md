# astronomy-picture-of-the-day

A program that scrapes NASA's Astronomy Picture of the Day website and automatically creates a pdf with the picture and explanation.

## Installation
> Note: Make sure you have LaTeX, Node.js, and Python 3 installed before proceeding. The program was created and tested on a computer running macOS but it should also work on Linux. It uses Node for the web scraper and Python for creating and compiling the LaTeX file into a pdf.

First clone the repository and run

    bash setup.sh

to install the required dependencies and run the program for the first time.


## Let's Try It Out

To run the program the day after `setup.sh` has successfully created the pdf, simply run

    bash script.sh

and the resulting pdf should be located in `/tex/astronomy-picture-of-the-day.pdf`


## Notes

- Check out [the sample pdf](https://github.com/samarthkishor/astronomy-picture-of-the-day/blob/master/sample-apod.pdf) (`sample-apod.pdf`) to see what this program can do.
- See the [PyLaTeX](https://jeltef.github.io/PyLaTeX/latest/index.html) and [Nightmare](https://github.com/segmentio/nightmare#api) documentation for additional information. This program wouldn't exist without these excellent projects.
- Sometimes the Astronomy Picture of the Day website will have an embedded video instead of a picture. If that is the case, the scraper will take a screenshot of the fullscreen video (usually either YouTube or Vimeo).
