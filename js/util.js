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