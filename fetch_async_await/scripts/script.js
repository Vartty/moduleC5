
const fetchRequest = (url) => {
    return fetch(url).then((response) => {
        console.log('TEST1',response);
        return response.url;
    }).then((imgURL) => {
        console.log('TEST2',imgURL);
        return imgURL;
    });
};


function getValue(fFirsrValue,fSecondValue,resultNode) {
    if ((Number(fFirsrValue) >= 100) && (Number(fFirsrValue) <= 300)) {
        if ((Number(fSecondValue) >= 100) && (Number(fSecondValue) <= 300)) {
            const url = `https://picsum.photos/${fFirsrValue}/${fSecondValue}`;
            return url;
        }
        else {
            faultResult = `
            <div class='result-fault'>
            <p>Введены значения вне диапозона 100 - 300
            </p>
            </div>`;
            resultNode.innerHTML = faultResult;
        };
    } else {
        faultResult = `
            <div class='result-fault'>
            <p>Введены значения вне диапозона 100 - 300
            </p>
            </div>`;
        resultNode.innerHTML = faultResult;
    };
};


const resultNode = document.querySelector('.f-result');
const resultImgNode = document.querySelector('.f-result-img');
const btnNode = document.querySelector('.btn');



btnNode.addEventListener('click', () => {
    const fFirsrValue = document.querySelector('.first-value').value;
    const fSecondValue = document.querySelector('.second-value').value;
    const url = getValue(fFirsrValue,fSecondValue,resultNode);
    if(typeof url !== "undefined"){
        fetchRequest(url).then((r) => {
            resultImgNode.src = r;
        })
    };
});
// fetchRequest(url).then((r) => {
//     console.log('GOVNO2',r);
// })
///let imageBlobURL = fetchRequest(url,options);
///resultNode.src = fetchRequest();