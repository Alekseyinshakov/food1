export const cards = (data) => {
    const parrentBlock = document.querySelector('.menu__field .container');
    parrentBlock.innerHTML = '';
    

    data.then((data) => {
        
        data.data.forEach(card => {
        parrentBlock.innerHTML += `<div class="menu__item">
    <img src="${card.imgSrc}" alt="${card.alt}">
    <h3 class="menu__item-subtitle">Меню.... "${card.menuName}"</h3>
    <div class="menu__item-descr">${card.description}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${card.price}</span> грн/день</div>
    </div>
    </div>`
    })
    
    });
}

