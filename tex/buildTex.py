from pylatex import Document, Section, StandAloneGraphic, NewPage
from pylatex.utils import bold
import json

dataPath = '../lib/explanations/explanations.json'

with open(dataPath) as data_file:
    data = json.load(data_file)

def fill_document():
    doc = Document()
    for object in data['elements']:
        date = object['date']
        explanation = object['explanation']
        picturePath = '.' + object['picture']

        splitDate = date.split('-')

        if splitDate[0] == '1':
            month = 'January'
        elif splitDate[0] == '2':
            month = 'February'
        elif splitDate[0] == '3':
            month = 'March'
        elif splitDate[0] == '4':
            month = 'April'
        elif splitDate[0] == '5':
            month = 'May'
        elif splitDate[0] == '6':
            month = 'June'
        elif splitDate[0] == '7':
            month = 'July'
        elif splitDate[0] == '8':
            month = 'August'
        elif splitDate[0] == '9':
            month = 'September'
        elif splitDate[0] == '10':
            month = 'October'
        elif splitDate[0] == '11':
            month = 'November'
        elif splitDate[0] == '12':
            month = 'December'

        with doc.create(Section(month + ' ' + splitDate[1] + ', ' + splitDate[2], numbering=False)):
            doc.append(StandAloneGraphic(image_options='width=350px', filename=picturePath))
            doc.append(bold('\n\nExplanation:\n'))
            doc.append(explanation)
            doc.append(NewPage())

    doc.generate_pdf('astronomy-picture-of-the-day', clean_tex=False)

fill_document()
