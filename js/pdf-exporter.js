const pdfLinkEL = document.getElementById('pdf-url');
// console.log(JSON.stringify(sermentTxt))

let doc = new PDFDocument();
let stream = doc.pipe(blobStream());

function exportPDF(userObj, signPng) {
    // create a document and pipe to a blob

    doc = new PDFDocument();
    stream = doc.pipe(blobStream());

    doc.info.Title = sermentTxt.title;
    doc.info.Author = 'Drave Développement';
    doc.info.Subject = 'Contract de membre pour Drave Développement';

    doc.fontSize(18)
        .font('Helvetica-Bold')
        .text(sermentTxt.title, 74, 50);

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
                doc.moveDown()
                    .font('Helvetica')
                    .list([para.slice(4, -1).trim()], {
                        align: 'justify',
                        bulletRadius: 2,
                        bulletIndent: 10,
                        textIndent: 10,
                        // lineGap: 12,
                    });
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

    doc.moveDown()
        .font('Helvetica-Bold')
        .text('Signé en ce ', 76, doc.y + 40, {
            continued: true,
        })
        .text('  ' + formatDate2YYMMDD(new Date()) + '  ', {
            underline: true,
            continued: true,
        })
        .text(', à ', {
            underline: false,            
            continued: true,
        })
        .text('  ' + userObj.city + '  ', {
            underline: true,
            continued: true,
        })
        .text('. ', {
            underline: false, 
        })
        .text(userObj.name + ' (' + userObj.email + ')');

    var xhr = new XMLHttpRequest;
    xhr.onload = function() {
        // set the font using the arraybuffer returned from the xhr
        doc.moveDown()
            .image(xhr.response, {scale: 0.10})
            .moveDown()
            .font('Helvetica-Bold')
            .text('Signature');
        doc.end();
    };

    xhr.responseType = 'arraybuffer';
    xhr.open('GET', signPng, true);
    xhr.send();

    // doc.moveDown()
    //     .image(signatureBuffer)
    //     .text('Signature', 0, 0);
        

    doc.save();

    // end and display the document in the iframe to the right

    // stream.on('finish', function() {
    //     const url = stream.toBlobURL('application/pdf');
    //     pdfLinkEL.setAttribute('href', url);
    // });
    stream.on('finish', function() {
        const url = stream.toBlobURL('application/pdf');
        pdfLinkEL.setAttribute('href', url);
    });
}

// stream.on('finish', function() {
//     const url = stream.toBlobURL('application/pdf');
//     pdfLinkEL.setAttribute('href', url);
// });