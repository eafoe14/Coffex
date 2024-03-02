const TOKEN__reviews = "7017182988:AAF4dn-0-qM-w4QTMfU4OYMIBYRWsfL5_Iw";
const CHAT_ID__reviews = "-1002082544719";
const URI_API_reviews = `https://api.telegram.org/bot${TOKEN__reviews}/sendMessage`;

document.getElementById('tg2').addEventListener('submit', function(e) {
    e.preventDefault();

    let message2 = `<b>Отзыв с сайта:</b>\n`;
    message2 += `<b>Имя: </b> ${ this.namef.value }\n`;
    message2 += `<b>Отзыв: </b> ${ this.review.value }\n`;

    axios.post(URI_API_reviews, {
        chat_id: CHAT_ID__reviews,
        parse_mode: 'html',
        text: message2
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