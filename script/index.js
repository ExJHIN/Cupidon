const apiUrl = 'https://intrust.inboxsuite.com/?apikey=5sj44xkbovgkn3ef&email=%7Bemail%7D&ip=%7Bip%7D&regdate=%7Bregdate%7D&sourceurl=%7Bsourceurl%7D&fname=%7Bfname%7D&lname=%7Blname%7D&eid=%7Bemailid%7D&status=%7Bsbscstatus%7D&refid=%7Bsiterefid%7D&token=%7Bsitetoken%7D&utmmedium=%7Bsiteutmmedium%7D&utmsource=%7Bsiteutmsource%7D&ers=%7Bemailrunstamp%7D&sb=%7Bsb%7D&sb_source=%7Bsb_source%7D&sb_ts=%7Bsb_ts%7D';

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

async function sendData(body) {
    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body,
        });
    } catch (e) {}
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = getFormData(event.target);
    const encodedFormData = convertDataToXWWWFormUrlencodedFormat(formData);

    await sendData(encodedFormData);

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
