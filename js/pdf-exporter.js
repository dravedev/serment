function exportPDF(result, data) {

}

const pdfLinkEL = document.getElementById('pdf-url');

// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

// draw some text
doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

// some vector graphics
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

doc.circle(280, 200, 50).fill('#6600FF');

// an SVG path
doc
  .scale(0.6)
  .translate(470, 130)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum interdum augue quis semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus in quam euismod dolor maximus sollicitudin. Vestibulum et vehicula orci, vel placerat magna. Nullam pharetra velit in nunc feugiat tempus. Etiam vel tortor ac sapien luctus tempor quis et mi. Duis ex magna, aliquet in arcu eget, congue scelerisque risus. Vestibulum mattis dui vel dui varius, sed lacinia felis semper. Donec eget neque vel est interdum vestibulum at vitae orci. Praesent fermentum metus non urna volutpat luctus. Suspendisse at ex ac erat auctor euismod. Vestibulum ac vehicula quam. Phasellus pharetra sit amet mi vitae scelerisque.\nAliquam ultrices facilisis posuere. Suspendisse quis hendrerit orci, id tincidunt turpis. Nam vestibulum odio consequat congue maximus. Nulla finibus vehicula lorem nec suscipit. Ut scelerisque pharetra ex ac lobortis. Vivamus vestibulum risus eu magna luctus blandit. Nam ac libero volutpat, fringilla elit a, cursus magna. Sed a ex a leo fringilla varius. Etiam vulputate maximus tempus. Nam tempor lorem nisl, at pellentesque felis vehicula eu. Fusce a odio leo. Morbi viverra quis justo vel tincidunt. Etiam odio ligula, ultrices in ornare quis, finibus ac mauris. Donec nec nibh quis libero rhoncus tincidunt non sit amet enim.";

// and some justified text wrapped into columns
doc
  .text('And here is some wrapped text...', 100, 300)
  .font('Times-Roman', 13)
  .moveDown()
  .text(lorem, {
    width: 412,
    align: 'justify',
    indent: 30,
    columns: 2,
    height: 300,
    ellipsis: true
  });

// end and display the document in the iframe to the right
doc.end();
stream.on('finish', function() {
    const url = stream.toBlobURL('output/pdf');
    pdfLinkEL.setAttribute('href', url);
});