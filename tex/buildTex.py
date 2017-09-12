from pylatex import Document, Section, StandAloneGraphic, NewPage
from pylatex.utils import bold
import json

dataPath = '../lib/explanations/explanations.json'

with open(dataPath) as data_file:
    data = json.load(data_file)


def fill_document():
    doc = Document()
    for element in data['elements']:
        date = element['date']
        explanation = element['explanation']
        picture_path = '.' + element['picture']

        split_date = date.split('-')

        if split_date[0] == '01':
            month = 'January'
        elif split_date[0] == '02':
            month = 'February'
        elif split_date[0] == '03':
            month = 'March'
        elif split_date[0] == '04':
            month = 'April'
        elif split_date[0] == '05':
            month = 'May'
        elif split_date[0] == '06':
            month = 'June'
        elif split_date[0] == '07':
            month = 'July'
        elif split_date[0] == '08':
            month = 'August'
        elif split_date[0] == '09':
            month = 'September'
        elif split_date[0] == '10':
            month = 'October'
        elif split_date[0] == '11':
            month = 'November'
        elif split_date[0] == '12':
            month = 'December'
        else:
            month = 'Invalid month'

        if int(split_date[1]) < 10:
            date = str(split_date[1])[1:]
        else:
            date = split_date[1]

        with doc.create(Section(month + ' ' + date + ', ' + split_date[2], numbering=False)):
            doc.append(StandAloneGraphic(image_options=r'width=\textwidth', filename=picture_path))
            doc.append(bold('\n\nExplanation:\n'))
            doc.append(explanation)
            doc.append(NewPage())

    doc.generate_pdf('astronomy-picture-of-the-day', clean_tex=False)


fill_document()
print('The pdf has been generated.')
