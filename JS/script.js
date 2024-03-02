$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    })
});

$(function() {
    $('.slider').each(function() {    
        let $th = $(this);
        $th.attr('data-pos', 1);
        let slide = $th.find('.slider-slide');
        let num = $th.find('.slider-slide').length;
        let dots = $th.find('.slider-dots');
        dots.prepend('<span class="slider-indicator"></span>');
        for( let i = 1; i <= num; i++ ){ 
            dots.append('<span style="width:' + 100 / num + '%" class="slider-dot" data-pos="'+ i +'"></span>');    
        }
        $th.find('.slider-slides').css('width', 100 * num + '%');
        slide.css('width', 100 / num + '%');
        $th.find('.slider-dot').on('click', function(){
            let currentPos = $th.attr('data-pos');
            let newPos = $(this).attr('data-pos');
            let newDirection = (newPos > currentPos ? 'right' : 'left');
            let currentDirection = (newPos < currentPos ? 'right' : 'left');
            $th.find('.slider-indicator').removeClass('slider-indicator-' + currentDirection);
            $th.find('.slider-indicator').addClass('slider-indicator-' + newDirection);        
            $th.attr('data-pos', newPos);    
            $th.find('.slider-slides').css('transform', 'translateX(-' + 100 / num * (newPos - 1) + '%)');            
            $th.find('.slider-indicator').css({'left': 100 / num * (newPos - 1) + '%','right':100 - (100 / num) - 100 / num * (newPos - 1) + '%'});
        });        
        $th.find('.slider-indicator').css({'left': 0,'right': 100 - (100 / num) + '%'});
    });
});


/* ОТПРАВКА ФОРМЫ В TELEGRAM КАНАЛ */
const TOKEN = "7032058840:AAGu6w9NsRbOxyxShidqqz1zWwNnc_vY8hY";
const CHAT_ID = "-1002022748567";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.getElementById('tg').addEventListener('submit', function(e) {
    e.preventDefault();

    let message = `<b>Заявка с сайта:</b>\n`;
    message += `<b>Имя: </b> ${ this.name.value }\n`;
    message += `<b>Номер телефона: </b> ${ this.phone.value }\n`;
    message += `<b>Дополнительная информация: </b> ${ this.message.value }\n`;

    axios.post(URI_API,{
        chat_id: CHAT_ID,
        parse_mode: `html`,
        text: message
    })
    .then(response => {
        console.log('Отзыв успешно отправлен:', response.data);
        alert('Отзыв успешно отправлен!'); 
        this.reset();
    })
    .catch(error => {
        console.error('Ошибка при отправке отзыва:', error);
        alert('Ошибка при отправке отзыва!'); 
    });
});