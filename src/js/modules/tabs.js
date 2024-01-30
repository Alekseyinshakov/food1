const tabs = () => {
    const tabBtns = document.querySelectorAll('.tabheader__item');
    function showTabNumber(n) {
        const tabs = document.querySelectorAll('.tabcontent');
        tabs.forEach(element => {
            element.classList.remove('active');
            element.classList.remove('animate__bounceIn');
        });
        tabs[n].classList.add('active');
        tabs[n].classList.add('animate__bounceIn');

               
        tabBtns.forEach(element => {
            element.classList.remove('tabheader__item_active');
        });
        tabBtns[n].classList.add('tabheader__item_active');

    }

    tabBtns.forEach((item, i) => {
        item.addEventListener('click', () => {
            showTabNumber(i)
        })
    });


    showTabNumber(2);


};

export {tabs};