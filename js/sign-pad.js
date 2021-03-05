const canvas = document.querySelector('canvas');
var parentWidth = $(canvas).parent().outerWidth();
canvas.setAttribute("width", parentWidth);

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    console.log(canvas.width, canvas.height)
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

// console.log(canvas.width, canvas.height)

var signaturePad = new SignaturePad(canvas);

document.getElementById('clear').addEventListener('click', function () {
    signaturePad.clear();
});

document.getElementById('sign').addEventListener('click', function () {
    const data = signaturePad.toData();
    // console.log(data);
});


$('.serment-sign-modal').on('shown.bs.modal', function (e) {
    resizeCanvas();
    // console.log(canvas.width, canvas.height)
})

$('.serment-sign-modal').on('hide.bs.modal', function (e) {
    signaturePad.clear();
    // console.log(signaturePad.toData());
})

