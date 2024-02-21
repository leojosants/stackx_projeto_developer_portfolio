(function () {
    const htmlElements = {
        formElement: document.querySelector('form'),
        userName: document.querySelector('[js_data_name]'),
        userEmail: document.querySelector('[js_data_email]'),
        userMessage: document.querySelector('[js_data_message]'),
        buttonForm: document.querySelector('[js_data_form_button]'),
    };

    const adresses = {
        api: 'https://api.sheetmonkey.io/form/nSQ3FU9Kaomuj8BHtUQncR',
        errorPage: 'https://leojosants.github.io/stackx_projeto_developer_portfolio/error_page.html',
        successPage: 'https://leojosants.github.io/stackx_projeto_developer_portfolio/success_page.html',
    };

    const renderButton = {
        image: '<img class="c-section-contact__button--animation" src="./assets/images/loading.png" alt="Loading">',
        message: 'SEND MESSAGE'
    };

    const addLoad = () => {
        htmlElements.buttonForm.innerHTML = renderButton.image;
    };

    const removedLoad = () => {
        htmlElements.buttonForm.innerHTML = renderButton.message;
    };

    const delaySuccess = () => {
        setTimeout(() => {
            window.location.href = adresses.successPage;
            removedLoad();
        }, 1000);
    }

    const delayError = () => {
        setTimeout(() => {
            window.location.href = adresses.errorPage;
            removedLoad();
        }, 1000);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addLoad();

        const userNameValue = htmlElements.userName.value;
        const userEmailValue = htmlElements.userEmail.value;
        const userMessageValue = htmlElements.userMessage.value;

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
                    }
                ),
            },
        )
            .then(() => delaySuccess())
            .catch(() => delayError());
    };

    htmlElements.formElement.addEventListener('submit', handleSubmit);
})();