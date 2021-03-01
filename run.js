const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument;

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('serment.pdf'));

const content = fs.readFileSync('serment.txt')

doc.info.Title = 'Le Serment du Draveur / de la Draveuse'
doc.info.Author = 'Drave Développement'
doc.info.Subject = 'Contract de membre pour Drave Développement'

// Embed a font, set the font size, and render some text
doc.font('Times-Roman')
   .fontSize(12)
   .text(content, 100, 100);

doc.moveDown(2)

// https://github.com/foliojs/pdfkit/blob/master/docs/forms.md
doc.initForm();

height = doc.currentLineHeight()
doc.text('Nom')
doc.formText('who', doc.x + doc.widthOfString('Nom '), doc.y - height, 200, height)
doc.moveDown()

doc.text('Lieu')
doc.formText('where', doc.x + doc.widthOfString('Lieu '), doc.y - height, 200, height)
doc.moveDown()

doc.text('Date')
doc.formText('when', doc.x + doc.widthOfString('Date '), doc.y - height, 200, height, {
  align: 'right',
  format: {
    type: 'date',
    params: 'yyyy/mm/dd'
  }
});

doc.moveDown(3)

// Add some text with annotations
doc.fillColor("blue")
   .text('drave.dev', {'link':'https://drave.dev'})

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('images/L-Homme-Riviere2-1-ConvertImage.jpg', {
   fit: [250, 300],
   align: 'center',
   valign: 'center'
});


// Finalize PDF file
doc.end();
