/**
 *
 *
 *
Riprendiamo l'esercizio carosello e rifacciamolo, questa volta usando gli oggetti, prendendo come riferimento il codice scritto oggi insieme a lezione, che troverete direttamente nella mia repository di github a questo link: [link github]

Modifichiamo il codice dell'esercizio per renderlo funzionante con un array di oggetti al posto dei tre array separati, con una sola regola: non è possibile modificare l'HTML ma solamente JS e CSS.
Ricordiamo sempre l'importanza dell'integrità del dato.

Bonus 1:
Sperimentiamo attraverso l'uso delle timing functions anche una funzionalità di scorrimento al nostro carosello:
al click di un bottone o già dall'inizio possiamo far partire, ad intervalli di tempo a piacere, lo scorrimento delle immagini disponibili nel carosello stesso.

Bonus 2:
E se volessi un bottone per invertire la "direzione" del carosello?

 *
 */

const items = [
    'img/01.jpg',
    'img/02.jpg',
    'img/03.jpg',
    'img/04.jpg',
    'img/05.jpg'
];

const title = [
    'Svezia',
    'Svizzera',
    'Gran Bretagna',
    'Germania',
    'Paradise'
];

const text = [
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam, cumque provident totam omnis, magnam dolores dolorum corporis.',
    'Lorem ipsum',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
    'Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam,',
];

const arrayOfCarouselObjects =[];

for (let i = 0; i < title.length; i++){
    const carouselObject = {
        //img:'',
        //title:'',
        //text:'',
    }
    carouselObject.img = items[i];
    carouselObject.title = title[i];
    carouselObject.text = text[i];
    arrayOfCarouselObjects.push(carouselObject);
}
console.log(arrayOfCarouselObjects);
let result = Array.isArray(arrayOfCarouselObjects);
console.log(result);
result = Array.isArray(arrayOfCarouselObjects[0]);
console.log(result);


for (let i = 0; i < arrayOfCarouselObjects.length; i++ ){
    createCarouselImages("div.my-carousel-images", arrayOfCarouselObjects[i]['img'], arrayOfCarouselObjects[i]['title'], arrayOfCarouselObjects[i]['text']);
    createCarouselThumbnail("div.my-thumbnails" , arrayOfCarouselObjects[i]['img'])
}
let activeElement = 1;
let activeCarouselImage = document.getElementsByClassName('my-image-wrapper');
activeCarouselImage[activeElement].classList.add('active');
let activeCarouselThumb = document.getElementsByClassName('my-thumbnail-container');
activeCarouselThumb[activeElement].classList.add('active');


document.querySelector('div.my-next').addEventListener('click', function(){
    let oldElement = activeElement;
    if (activeElement == arrayOfCarouselObjects.length - 1){
        activeElement = 0;
    } else {
        activeElement++;
    }
    hideAndShow(activeCarouselImage, activeCarouselThumb, activeElement, oldElement)
})
document.querySelector('div.my-previous').addEventListener('click', function(){
    let oldElement = activeElement;
    if (activeElement == 0){
        activeElement = arrayOfCarouselObjects.length - 1;
    } else {
        activeElement--;
    }
    hideAndShow(activeCarouselImage, activeCarouselThumb, activeElement, oldElement)
})
setInterval (function(){
    if(scrollRight){
        document.querySelector('div.my-next').click();
    } else {
        document.querySelector('div.my-previous').click();
    }
}, 3000)

document.getElementById('my-after-carousel').innerHTML = `<button class="btn btn-primary" id="inversion-button">Inverti</button>`
let scrollRight = true;
document.getElementById('inversion-button').addEventListener('click', function(){
    scrollRight = !scrollRight;
})
function hideAndShow(imageItem, thumbnailItem, activeElement, inactiveElement){
    imageItem[inactiveElement].classList.remove('active');
    thumbnailItem[inactiveElement].classList.remove('active');

    imageItem[activeElement].classList.add('active');
    thumbnailItem[activeElement].classList.add('active');
}

function createCarouselImages(parentByClass, imageKey, titleKey, textKey){
    let imageContainer = document.createElement('div');
    imageContainer.classList.add('position-relative', 'my-image-wrapper');
    imageContainer.innerHTML = `<img src="${imageKey}" alt="random image" class="w-100"></img>`;
    let carouselTextContainer = document.createElement('div');
    carouselTextContainer.classList.add('carousel-text');
    let carouselTitle = document.createElement('h2');
    carouselTitle.innerHTML = titleKey;
    let carouselText = document.createElement('p');
    carouselText.innerHTML = textKey;
    carouselTextContainer.appendChild(carouselTitle);
    carouselTextContainer.appendChild(carouselText);
    imageContainer.appendChild(carouselTextContainer);
    document.querySelector(parentByClass).appendChild(imageContainer);
    return imageContainer;
}
function createCarouselThumbnail (parentByClass, imageKey){
    let thumbnailContainer = document.createElement('div');
    thumbnailContainer.classList.add('my-thumbnail-container');
    thumbnailContainer.innerHTML = `<img src="${imageKey}" alt="random image" class="w-100"></img>`;
    document.querySelector(parentByClass).appendChild(thumbnailContainer);
    return thumbnailContainer;
}




