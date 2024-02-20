export const slider = () => {
    const _offerSliderCounter = document.querySelector('.offer__slider-counter'),
        _nextBtn = _offerSliderCounter.querySelector('.offer__slider-next'),
        _prevBtn = _offerSliderCounter.querySelector('.offer__slider-prev'),
        _current = _offerSliderCounter.querySelector('#current'),
        _total = _offerSliderCounter.querySelector('#total');

    const sliderWrapper = document.querySelector('.offer__slider-wrapper');
    const totalSlidesNum = document.querySelectorAll('.offer__slide').length - 1;
    let currentSlideNum = 0;

    _total.textContent = getZiro(totalSlidesNum + 1);

    function showSlideNumber(n) {
        sliderWrapper.style.transform = `translateY(-${n * 390}px)`;
        _current.textContent = getZiro(currentSlideNum + 1);
    }

    _nextBtn.addEventListener('click', () => {
        if (currentSlideNum === totalSlidesNum) {
            currentSlideNum = 0;
            showSlideNumber(currentSlideNum);
        } else {
            currentSlideNum += 1;
            showSlideNumber(currentSlideNum)
        }
    })

    _prevBtn.addEventListener('click', () => {
        if (currentSlideNum === 0) {
            currentSlideNum = totalSlidesNum;
            showSlideNumber(currentSlideNum)
        } else {
            currentSlideNum -= 1;
            showSlideNumber(currentSlideNum)
        }        
    })

    showSlideNumber(0)

}




function getZiro(num) {
    if (num < 10) {
        return `0${num}`
    } else {
        return num
    }
}