function useRequest(URL, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',URL, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        }
        else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
};

const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');
var valueLimit = document.querySelector('.limit-count');

function displayResult(apiData) {
    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
        <img 
        
        src="${item.download_url}" 
         class="card-image"/>
         <p>${item.author}</p>
         </div>`;
        cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
}

function displayFault(){
    let faultCard = `
    <div class="fault-card">
    <p>Введенное значение не в диапозоне от 1 до 10</p>
    </div>`;
    resultNode.innerHTML = faultCard;
}

btnNode.addEventListener('click', () => {

    if  ((Number(valueLimit.value)) >= 1 && (Number(valueLimit.value)) <= 10) {
        useRequest('https://picsum.photos/v2/list/?limit='+valueLimit.value,displayResult)
    }
    else {
        displayFault();
    }
});