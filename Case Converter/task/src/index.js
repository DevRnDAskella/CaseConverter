const btnUpper = document.querySelector('#upper-case');
const btnLower = document.querySelector('#lower-case');
const btnProper = document.querySelector('#proper-case');
const btnSentence = document.querySelector('#sentence-case');
const btnSave = document.querySelector('#save-text-file');
const fieldInput = document.querySelector('.data-input');

document.addEventListener('click', (e) => {
    if (e.target === btnUpper) {
        fieldInput.value = convertDataToUpperCase(fieldInput);
    }

    if (e.target === btnLower) {
        fieldInput.value = convertDataToLowerCase(fieldInput);
    }

    if (e.target === btnProper) {
        fieldInput.value = convertDataToProperCase(fieldInput);
    }

    if (e.target === btnSentence) {
        fieldInput.value = convertDataToSentenceCase(fieldInput);
    }

    if (e.target === btnSave) {
        download(fieldInput.value, 'text', 'txt');
    }
});

function convertDataToUpperCase(field) {
    let data = field.value;

    return data.toUpperCase();
}

function convertDataToLowerCase(field) {
    let data = field.value;

    return data.toLowerCase();
}

function convertDataToProperCase(field) {
    let data = field.value;

    return data.replace(/\w\S*/g, (el) => {
        return el.charAt(0).toUpperCase() + el.substr(1).toLowerCase();
    });
}

function convertDataToSentenceCase(field) {
    let data = field.value;

    return data.replace(/[^\.!\?]+[\.!\?]+["']?|.+$/g, el => {
        return el[0] === ' ' ? el.charAt(0) + el.charAt(1).toUpperCase() + el.slice(2).toLowerCase() : el.charAt(0).toUpperCase() + el.slice(1).toLowerCase();
    });
}

function download(data, filename, type) {
    const file = new Blob([data], {type});
    const element = document.createElement('a');
    const url = URL.createObjectURL(file);

    element.setAttribute('href', url);
    element.setAttribute('download', `${filename}`);

    btnSave.appendChild(element);
    element.click();

    setTimeout(() => {
        btnSave.removeChild(element);
        window.URL.revokeObjectURL(url);
    }, 0);
}