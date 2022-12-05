const btnNode = document.querySelector('.btn-confirm');
const resultNode = document.querySelector('.j-result');
const clearNode = document.querySelector('.btn-clear');


function getURL(numPage,numLimit) {
    const url = `https://picsum.photos/v2/list?page=${numPage}&limit=${numLimit}`;
    console.log(url);
    return url;
};

const fetchRequest = (url) => {
    return fetch(url).then((response) => {
        console.log('RESPONSE',response);
        const result = response.json();
        console.log('RESULT',result);
        return result;
    }).catch('Error');
};

function faultPage(resultNode) {
    faultResult = `<div class="fault-result">
    <p>Номер страницы вне диапозона от 1 до 10</p>
    </div>`;
    resultNode.innerHTML = faultResult;
};

function faultLimit(resultNode) {
    faultResult = `<div class="fault-result">
    <p>Лимит вне диапозона от 1 до 10</p>
    </div>`;
    resultNode.innerHTML = faultResult;
};

function faultBoth(resultNode) {
    faultResult = `<div class="fault-result">
    <p>Номер страницы и лимит вне диапозона от 1 до 10</p>
    </div>`;
    resultNode.innerHTML = faultResult;
};

function displayResult(apiData) {
    let cards = ``;

    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
        <img 
        
        src="${item.download_url}"
        class="card-image"/>`;
        cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
};


if (localStorage.getItem('myJSON')) {
    const myJSON = localStorage.getItem('myJSON');
    console.log('myJSON',myJSON);
    console.log('parse',JSON.parse(myJSON));
    const parseJSON = JSON.parse(myJSON);
    displayResult(parseJSON);
};

btnNode.addEventListener('click',() => {
    const numPage = document.querySelector('.num-page').value;
    const numLimit = document.querySelector('.num-limit').value;
    if (Number(numPage)>=1 && Number(numPage)<=10 && Number(numLimit)>=1 && Number(numLimit)<=10) {
        const url =  getURL(numPage,numLimit);
        localStorage.setItem('myURL',url);
        fetchRequest(url).then(r => {
            console.log(r);
            localStorage.setItem('myJSON',JSON.stringify(r));
            displayResult(r);
        });
    } else if ((Number(numPage)<1 || Number(numPage)>10) && (Number(numLimit)>=1 && Number(numLimit)<=10)) {
        faultPage(resultNode);
    } else if ((Number(numPage)>=1 && Number(numPage)<=10) && ((Number(numLimit)<1 || Number(numLimit)>10))) {
        faultLimit(resultNode);
    } else if (((Number(numPage)<1 || Number(numPage)>10)) && ((Number(numLimit)<1 || Number(numLimit)>10))) {
        faultBoth(resultNode);
    };
});

clearNode.addEventListener('click',() => {
    localStorage.removeItem('myJSON');
});