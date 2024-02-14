import { tabs } from "./modules/tabs";
import { timer } from "./modules/timer";
import { modal } from "./modules/modal";
import { cards } from "./modules/cards";
import { forms } from "./modules/forms";



window.addEventListener('DOMContentLoaded', () => {

    const cardData = [
        {
            imgSrc: 'img/tabs/vegy.jpg',
            alt: 'vegy',
            menuName: 'Фитнес',
            description: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
            price: 229 
        },
        {
            imgSrc: 'img/tabs/elite.jpg',
            alt: 'elite',
            menuName: 'Премиум',
            description: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
            price: 550  
        },
        {
            imgSrc: 'img/tabs/post.jpg',
            alt: 'post',
            menuName: 'Постное',
            description: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
            price: 430 
        }
    ]


    tabs();
    timer('2024-01-30T14:31:00.000');
    modal();
    
    cards(cardData);
    forms();
})

