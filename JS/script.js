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

$('.tg').on('submit', function (event) {

    event.stopPropagation();
    event.preventDefault();

    let form = this,
        submit = $('.submit', form),
        data = new FormData(),
        files = $('input[type=file]')


    $('.submit', form).val('Отправка...');
    $('input, textarea', form).attr('disabled','');

    data.append( 'name', 		$('[name="name"]', form).val() );
    data.append( 'phone', 		$('[name="phone"]', form).val() );
    data.append( 'message', 	$('[name="message"]', form).val() );
  

    files.each(function (key, file) {
        let cont = file.files;
        if ( cont ) {
            $.each( cont, function( key, value ) {
                data.append( key, value );
            });
        }
    });
    
    $.ajax({
        url: 'tg.php',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        xhr: function() {
            let myXhr = $.ajaxSettings.xhr();

            if ( myXhr.upload ) {
                myXhr.upload.addEventListener( 'progress', function(e) {
                    if ( e.lengthComputable ) {
                        let percentage = ( e.loaded / e.total ) * 100;
                            percentage = percentage.toFixed(0);
                        $('.submit', form)
                            .html( percentage + '%' );
                    }
                }, false );
            }

            return myXhr;
        },
        error: function( jqXHR, textStatus ) {
            console.log('error')
            // Тут выводим ошибку
        },
        complete: function() {
            // Тут можем что-то делать ПОСЛЕ успешной отправки формы
            console.log('Complete')
            form.reset() 
        }
    });

    return false;
});