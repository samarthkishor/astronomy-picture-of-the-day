from pylatex import Document, Section, StandAloneGraphic
from pylatex.utils import bold
import json

dataPath = '../lib/explanations/todaysExplanation.json'

with open(dataPath) as data_file:
    data = json.load(data_file)

date = data['date']
explanation = data['explanation']

def fill_document(doc):
    with doc.create(Section(date)):
        doc.append(StandAloneGraphic(image_options='width=350px', filename='../lib/pictures/' + date + '.jpg'))
        doc.append(bold('\n\nExplanation:\n'))
        doc.append(explanation)

if __name__ == '__main__':
    doc = Document()

    fill_document(doc)

    doc.generate_pdf('astronomy_picture_of_the_day', clean_tex=False)
    doc.generate_tex()
