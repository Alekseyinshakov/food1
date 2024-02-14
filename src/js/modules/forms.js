
import { closeModal } from "./modal";
import { openModal } from "./modal";



export const forms = () => {
    const $forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Успешно!',
        failure: 'что-то пошло не так...',
    }

    $forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 'display: block; margin: 0 auto;';
            form.append(statusMessage);

            const formData = new FormData(form);

            fetch('server.php', {
                method: "POST",
                // headers: {'Content-type': 'multipart/form-data;'},
                body: formData
            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success)
                form.reset();
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
            // r.setRequestHeader('Content-type', 'multipart/form-data;');

        });
    });

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.style.display = 'none';
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close="" class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>`;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            closeModal();
            prevModalDialog.style.display = 'block';
        }, 3000)

    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
    fetch('http://localhost:3000/requests')
        .then(data => data.json())
        .then(res => console.log(res));
    // showThanksModal();
}