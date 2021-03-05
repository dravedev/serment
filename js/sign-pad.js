let ifModalPop = true;

const btnSignPopup = document.getElementById('btn-sign-popup');
const inputName = document.querySelector('.input-name');
const inputEmail = document.querySelector('.input-email');
const inputCity = document.querySelector('.input-city');

let resultObj = {};

btnSignPopup.addEventListener('click', function(e) {
    const name = $.trim(inputName.value);
    const email = $.trim(inputEmail.value);
    const city = $.trim(inputCity.value);

    const checkNameResult = visualizeValidation('name', name, inputName);
    const checkEmailResult = visualizeValidation('email', email, inputEmail);
    const checkCityResult = visualizeValidation('city', city, inputCity);

    if (checkNameResult != 1 || checkEmailResult != 1 || checkCityResult != 1) {
        ifModalPop = false;
    } else {
        ifModalPop = true;
        resultObj.name = name
        resultObj.email = email
        resultObj.city =city
    }

    // console.log(resultObj);
});

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
    // console.log(canvas.width, canvas.height)
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

// console.log(canvas.width, canvas.height)

var signaturePad = new SignaturePad(canvas);

document.getElementById('clear').addEventListener('click', function () {
    document.getElementById('hint-sign').classList.add('hidden');
    signaturePad.clear();
});

document.getElementById('sign').addEventListener('click', function (e) {
    const data = signaturePad.toData();
    if (data.length === 0) {    // no signature
        document.getElementById('hint-sign').classList.remove('hidden');
        e.preventDefault();
    } else {
        document.getElementById('hint-sign').classList.add('hidden');
    }
    console.log(data, resultObj);
});


$('.serment-sign-modal').on('shown.bs.modal', function (e) {
    resizeCanvas();
    // console.log(canvas.width, canvas.height)
})

$('.serment-sign-modal').on('hide.bs.modal', function (e) {
    signaturePad.clear();
    document.getElementById('hint-sign').classList.add('hidden');
    // console.log(signaturePad.toData());
})

$('.serment-sign-modal').on('show.bs.modal', function (e) {
    // console.log(ifModalPop)
    if (!ifModalPop) {
        return e.preventDefault(); 
    }
})
