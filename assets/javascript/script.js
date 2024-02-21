const formElement = document.querySelector('form');
const buttonForm = document.querySelector('[js_data_form_button]');

const addLoad = () => {
    buttonForm.innerHTML = `<img class="c-section-contact__button" src="./assets/images/loading.png" alt="Loading">`;
};

const removedLoad = () => {
    buttonForm.innerHTML = 'SEND MESSAGE';
};

const delay = () => {
    setTimeout(() => {
        window.location.href = '../../success_page.html';
        removedLoad();
    }, 1000);
}

const handleSubmit = (event) => {
    event.preventDefault();
    addLoad();

    const userName = document.querySelector('[js_data_name]').value;
    const userEmail = document.querySelector('[js_data_email]').value;
    const userMessage = document.querySelector('[js_data_message]').value;

    fetch('https://api.sheetmonkey.io/form/nSQ3FU9Kaomuj8BHtUQncR',
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
    ).then(() => delay());
};


formElement.addEventListener('submit', handleSubmit);