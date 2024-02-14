let closeModal;
let openModal;
const modal = () => {
    const $modal = document.querySelector('.modal');
    const $openModalButtons = document.querySelectorAll('[data-modal]');
    

    closeModal = function () {
        $modal.style.display = '';
        document.body.style.overflow = ''
    }

    openModal = function() {
        $modal.style.display = 'block';
        document.body.style.overflow = 'hidden'
        clearTimeout(modalTimerId)
    }

    $openModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
        })
    })


    $modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    })

    

    

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
        
    }

    const modalTimerId = setTimeout(openModal, 500000);

    window.addEventListener('scroll', showModalByScroll)
    return {
        closeModal: closeModal,
    }
}



export { modal, closeModal, openModal }