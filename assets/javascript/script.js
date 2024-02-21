const formElement = document.querySelector('form');
const buttonForm = document.querySelector('[js_data_form_button]');

const addLoad = () => {
    buttonForm.innerHTML = `<img class="c-section-contact__button" src="./assets/images/loading.png" alt="Loading">`;
};

const removedLoad = () => {
    buttonForm.innerHTML = 'SEND MESSAGE';
};

const delaySuccess = () => {
    setTimeout(() => {
        window.location.href = 'https://leojosants.github.io/stackx_projeto_developer_portfolio/success_page.html';
        removedLoad();
    }, 1000);
}

const delayError = () => {
    setTimeout(() => {
        window.location.href = 'https://leojosants.github.io/stackx_projeto_developer_portfolio/error_page.html';
        removedLoad();
    }, 1000);
}

const handleSubmit = (event) => {
    event.preventDefault();
    addLoad();

    const userName = document.querySelector('[js_data_name]').value;
    const userEmail = document.querySelector('[js_data_email]').value;
    const userMessage = document.querySelector('[js_data_message]').value;

    fetch('ghttps://api.sheetmonkey.io/form/nSQ3FU9Kaomuj8BHtUQncR',
        {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                message: userMessage,
            })
        },
    )
        .then(() => delaySuccess())
        .catch(() => delayError());
};


formElement.addEventListener('submit', handleSubmit);