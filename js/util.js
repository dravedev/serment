function checkInput(value, type) {
    switch (type) {
        case 'email':
            if(/\S+@\S+\.\S+/.test(value)) {
                return 1;    // format OK
            } else {
                return 0;    // format wrong
            }
        default:    // check if the input empty
            if(!value) {
                return -1;    // empty
            } else {
                return 1;     // not empty
            }
    }
}

function visualizeValidation(name, value, inputEl) {
    const warningHintEl = inputEl.nextElementSibling;

    switch (checkInput(value, name)) {
        case 1:
            inputEl.parentElement.classList.add('has-success');
            inputEl.parentElement.classList.remove('has-error');
            warningHintEl.classList.add('hidden');

            return 1
        case 0:
            inputEl.parentElement.classList.add('has-error');
            inputEl.parentElement.classList.remove('has-success');
            warningHintEl.classList.remove('hidden');

            return 0;
        case -1:
            inputEl.parentElement.classList.add('has-error');            
            inputEl.parentElement.classList.remove('has-success');            
            warningHintEl.classList.remove('hidden');

            return -1;
    }
}

function getImgBuffer(canvas) {
    ctxData = canvas.toDataURL('image/png').slice('data:image/png;base64,'.length);
    ctxData = atob(ctxData);  // decrypt
    
    var buffer = [];
    for (var i = 0, l = ctxData.length; i < l; i++) {
        buffer.push(ctxData.charCodeAt(i));
        buffer._isBuffer = true;
        buffer.readUInt16BE = function (offset, noAssert) {
            var len = this.length;
            if (offset >= len) return;

            var val = this[offset] << 8;
            if (offset + 1 < len)
                val |= this[offset + 1];
            return val;
        }
    }

}

function formatDate2YYMMDD(date) {
    return date.getFullYear() + '-' + oneDigits2Two(date.getMonth()) + '-' + oneDigits2Two(date.getDate());
}

function oneDigits2Two(number) {
    return ("0" + number).slice(-2);
}