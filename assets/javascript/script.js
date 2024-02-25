const htmlElements = {
    formElement: document.querySelector('form'),
    formUserName: document.querySelector('[js_data_name]'),
    formUserEmail: document.querySelector('[js_data_email]'),
    formUserMessage: document.querySelector('[js_data_message]'),
    formButton: document.querySelector('[js_data_form_button]'),
    popupContainer: document.querySelector('[js_data_popup_container]'),
    popupMessage: document.querySelector('[js_data_popup_message]'),
    popupButon: document.querySelector('[js_data_popup_button]'),
};

const adresses = {
    api: 'https://api.sheetmonkey.io/form/nSQ3FU9Kaomuj8BHtUQncR',
    errorPage: 'https://leojosants.github.io/stackx_projeto_developer_portfolio/error_page.html',
    successPage: 'https://leojosants.github.io/stackx_projeto_developer_portfolio/success_page.html',
};

const renderButton = {
    image: `
        <img
            class="c-section-contact__button--animation"
            src="./assets/images/loading.png"
            alt="Loading"
        />
    `,
    message: 'SUCCESS'
};

const displayPopup = (message) => {
    htmlElements.popupContainer.style.display = 'block';
    htmlElements.popupMessage.innerHTML = message;
    htmlElements.popupButon.addEventListener('click', () => { htmlElements.popupContainer.style.display = 'none'; });
};

const addLoadImage = () => {
    htmlElements.formButton.innerHTML = renderButton.image;
};

const clearFormAndDisableButton = () => {
    htmlElements.formButton.style.pointerEvents = 'none';
    setTimeout(() => { htmlElements.formUserName.value = ''; }, 700);
    setTimeout(() => { htmlElements.formUserEmail.value = ''; }, 900);
    setTimeout(() => { htmlElements.formUserMessage.value = ''; }, 1100);
};

const removedLoadImage = () => {
    htmlElements.formButton.innerHTML = renderButton.message;
};

const delaySuccess = () => {
    setTimeout(() => {
        window.location.href = adresses.successPage;
        removedLoadImage();
    }, 1000);
};

const emailSendingData = {
    secureToken: '69043c1d-efc8-40c1-af8b-e9109b98fd08',
    toCC: 'leojoosantss@gmail.com',
    from: 'leonardojosantos@gmail.com',
    subject: 'about Developer Portfolio Project',
    bodyHeaderMessage: 'Data received! Thank you for contacting us, I will get back to you soon!',
}

const sendEmail = (userNameValue, userEmailValue, userMessageValue, dateTime) => {
    Email.send(
        {
            SecureToken: emailSendingData.secureToken,
            To: `${userEmailValue}, ${emailSendingData.toCC}`,
            From: emailSendingData.from,
            Subject: `${userNameValue} - ${emailSendingData.subject}`,
            Body: `${emailSendingData.bodyHeaderMessage} Email: ${userEmailValue} Message: ${userMessageValue} Datetime: ${dateTime}`,
        }
    )
        .then(() => {
            console.log('Mensagem enviada!');
        })
        .catch((error) => {
            // console.log(error);
        });
};

const delayError = () => {
    setTimeout(() => {
        window.location.href = adresses.errorPage;
        removedLoadImage();
    }, 1000);
};

const handleSubmit = (event) => {
    event.preventDefault();

    const userNameValue = htmlElements.formUserName.value;
    const userEmailValue = htmlElements.formUserEmail.value;
    const userMessageValue = htmlElements.formUserMessage.value;
    const dateTime = new Date().toLocaleString();

    if (!userNameValue) {
        displayPopup('NAME field is empty!');
        return;
    }

    if (!userEmailValue) {
        displayPopup('EMAIL field is empty!');
        return;
    }

    if (!userMessageValue) {
        displayPopup('MESSAGE field is empty!');
        return;
    }

    addLoadImage();

    clearFormAndDisableButton();

    fetch(adresses.api,
        {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    name: userNameValue,
                    email: userEmailValue,
                    message: userMessageValue,
                    dateTime: dateTime,
                }
            ),
        },
    )
        .then(() => delaySuccess(), sendEmail(userNameValue, userEmailValue, userMessageValue, dateTime))
        .catch(() => delayError());
};

htmlElements.formElement.addEventListener('submit', handleSubmit);