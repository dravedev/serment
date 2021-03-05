const pdfLinkEL = document.getElementById('pdf-url');
// console.log(JSON.stringify(sermentTxt))

// create a document and pipe to a blob
const doc = new PDFDocument();
const stream = doc.pipe(blobStream());

function exportPDF(userObj, signatureData) {
    doc.info.Title = sermentTxt.title;
    doc.info.Author = 'Drave Développement';
    doc.info.Subject = 'Contract de membre pour Drave Développement';

    doc.fontSize(18)
        .font('Helvetica-Bold')  // TODO: customize font
        .text(sermentTxt.title, 76, 76);

    for (var [index, para] of Object.entries(sermentTxt.text)) {
        console.log(para);
        
        if (para.indexOf('<') !== -1) {
            if (para.indexOf('<q>') !== -1) {
                doc.moveDown()
                    .font('Courier-Oblique')
                    .list(['« ' + para.slice(3, -1).trim() + '» '], {
                        align: 'justify',
                        bulletRadius: 0.1,
                        bulletIndent: 2,
                        textIndent: 68,
                        lineGap: 12,

                    });
            } else if (para.indexOf('<li>') !== -1) {
                
            }
        } else {  
            if (para.indexOf('%NAME%') > 0) {
                para = para.replace('%NAME%', userObj.name);
            }
            doc.moveDown()
                .fontSize(12)
                .font('Helvetica')
                .text(para.trim(), {
                    align: 'justify',
                    lineGap: 12,
                    // paragraphGap: 15,
                });
        }
    }
        



    doc.save();

    // end and display the document in the iframe to the right
    doc.end();
}

/*
doc.info.Title = sermentTxt.title;
doc.info.Author = 'Drave Développement';
doc.info.Subject = 'Contract de membre pour Drave Développement';

doc.fontSize(18)
    .font('Helvetica-Bold')  // TODO: customize font
    .text(sermentTxt.title, 76, 76);

for (const [index, para] of Object.entries(sermentTxt.text)) {
    console.log(para);
    
    if (para.indexOf('<') !== -1) {
        if (para.indexOf('<q>') !== -1) {
            doc.moveDown()
                .font('Courier-Oblique')
                .list(['« ' + para.slice(3, -1).trim() + '» '], {
                    align: 'justify',
                    bulletRadius: 0.1,
                    bulletIndent: 2,
                    textIndent: 68,
                    lineGap: 12,

                });
        } else if (para.indexOf('<li>') !== -1) {
            
        }
    } else {  
        doc.moveDown()
            .fontSize(12)
            .font('Helvetica')
            .text(para.trim(), {
                align: 'justify',
                lineGap: 12,
                // paragraphGap: 15,
            });
    }
}
      

doc.font('Helvetica')
    .moveDown()
    .text();
*/

    // draw some text
// doc.fontSize(25).text('Here is some vector graphics...', 100, 80);


// and some justified text wrapped into columns
// doc
//   .text('And here is some wrapped text...', 100, 300)
//   .font('Times-Roman', 13)
//   .moveDown()
//   .text(sermentTxt.text.join('\n'), {
//     width: 412,
//     align: 'justify',
//     indent: 30,
//     columns: 2,
//     height: 300,
//     ellipsis: true
//   });

// end and display the document in the iframe to the right
// doc.end();
stream.on('finish', function() {
    const url = stream.toBlobURL('application/pdf');
    pdfLinkEL.setAttribute('href', url);
});