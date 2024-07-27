import {getData} from './data.js';

let desc = true;

function init() {
    const data = getData();

    summery(data);
    review(data);
    srtRating(data);
}

function summery(data) {
    const flatData = data.flat();
    const totalProducts = data.length;
    const totalReview = flatData.length;
    const totalRating = flatData.reduce((acc,item) => {
        return acc + item.rating;
    }, 0);
    const avgRating = (totalRating/totalReview).toFixed(2);

    const product = document.getElementById('products');
    product.innerText = totalProducts;

    const review = document.getElementById('review');
    review.innerText = totalReview;

    const avarage = document.getElementById('avarage');
    avarage.innerText = avgRating;
}

function review(data) {
    const flatData = data.flat();
    const sorted = flatData.toSorted((a,b) => b.on - a.on);
    const reviewData = document.querySelector('#review-data ul');

    displayItem(sorted, reviewData);

    
}

function srtRating(data) {
    const srtRatingBtn = document.getElementById('sortByRating');
    const grouping = document.getElementById('grouping');

    grouping.addEventListener('click', () => {
        srtGrp(data);
    })

    srtRatingBtn.addEventListener('click',() => {
        ratingSort(data);
    })
}

function ratingSort(data) {
    const reviewData = document.querySelector('#review-data ul');
    removeNode(reviewData);
    const flatData = data.flat();

    desc = !desc;

    const sorting = desc 
    ? flatData.toSorted((a,b) => b.rating - a.rating)
    : flatData.toSorted((a,b) => a.rating - b.rating);

    displayItem(sorting, reviewData);
}

function removeNode(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function srtGrp(data) {
    const flatData = data.flat();
    const group = Object.groupBy(flatData, ({product}) => product);

    const title = Reflect.ownKeys(group);
    const reviewData = document.querySelector('#review-data ul');
    removeNode(reviewData);

    title.forEach((title) => {
        const li = document.createElement('li');
        li.classList.add('li-style');

        const h3 = document.createElement('h3');
        h3.innerText = title;
        
        li.appendChild(h3);
        reviewData.appendChild(li);
    })
}



function displayItem(info, elem) {
    info.map((item) => {

        const li = document.createElement('li');
        const p = document.createElement('p');
        const h3 = document.createElement('h3');
        const h5 = document.createElement('h5');


        li.classList.add('li-style');
        p.style.marginBottom = '10px';

        h3.innerText = `${item.name} - ${item.rating}`;
        p.innerText = `${item.review}`;
        h5.innerText = `${new Intl.DateTimeFormat('en-BD').format(item.on)}`;

        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(h5);
        elem.appendChild(li);
    })
}

init();