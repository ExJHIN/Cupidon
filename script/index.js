function regDate() {
    let date = new Date().toISOString();
    let dateTimeZone = date.match(/\.?[^.]+$/)[0];
    let newDate = date.replace(dateTimeZone, '');

    return newDate;
}

function getFormData(formNode) {
    const fname = formNode.querySelector('[name="fname"]').value;
    const lname = formNode.querySelector('[name="lname"]').value;
    const email = formNode.querySelector('[name="email"]').value;

    return {
        fname,
        lname,
        email,
    };
}

function convertDataToXWWWFormUrlencodedFormat(obj) {
    return Object.keys(obj).reduce((data, key) => {
        if (!!data) {
            data += '&';
        }

        return `${data}${key}=${encodeURIComponent(obj[key])}`;
    }, '');
}

async function sendData(body, apiUrl) {
    try {
        await fetch(apiUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body,
        });
    } catch (e) {}
}



async function handleFormSubmit(event,formNode) {
    event.preventDefault();
    let sourceurl = document.location.protocol + '//' + document.location.host + document.location.pathname;
    const formData = getFormData(event.target);
    const encodedFormData = convertDataToXWWWFormUrlencodedFormat(formData);
    const apiUrl = `https://intrust.inboxsuite.com/?apikey=5sj44xkbovgkn3ef&email=${formData.email}&ip=${ip}&regdate=${regDate()}&sourceurl=${sourceurl}&fname=${formData.fname}&lname=${formData.lname}`;
    await sendData(encodedFormData, apiUrl);
    onSuccess(event.target);
}



function onSuccess(formNode) {
    alert('Your application has been sent!');
    formNode.classList.toggle('hidden');
}

function validate() {
    var form = document.getElementById('form');
    var email = document.getElementById('email').value;
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.match(pattern)) {
        form.classList.add('valid');
        form.classList.remove('invalid');
    } else {
        form.classList.remove('valid');
        form.classList.add('invalid');
    }
    if (email == '') {
        form.classList.remove('valid');
        form.classList.remove('invalid');
    }
}

function checkValidity(event) {
    const formNode = event.target.form;
    const isValid = formNode.checkValidity();

    formNode.querySelector('button').disabled = !isValid;
}

const applicantForm = document.getElementById('form');

applicantForm.addEventListener('submit', handleFormSubmit);
applicantForm.addEventListener('input', checkValidity);
