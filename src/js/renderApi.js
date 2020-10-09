import apiService from './apiService.js';
import refs from './refs.js';
import template from '../templates/template.hbs';
import debounce from "lodash.debounce";
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import "@babel/polyfill";



const loadMoreBtn = document.createElement('button');
const clearLocalBtn = document.createElement('button');
const modalImg = document.querySelector('.js-modal-img');
// const modalDiv = document.querySelector('.modal');
const keysArrays = (Math.round(Math.random() * 100) + 1);
const valueArrays = [];



refs.form.addEventListener('input', debounce(e => {
    e.preventDefault();

    apiService.query = e.target.value;
    renderApi();

    refs.galleryList.innerHTML = '';
    valueArrays.push(apiService.query);
    localStorage.setItem(keysArrays, JSON.stringify(valueArrays));
    refs.input.value = '';
}, 1000));
refs.galleryList.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.nodeName == 'IMG') {
        const instance = basicLightbox.create(`
    <div class="modal">

    <img src="${e.target.dataset.src}" alt="${e.target.alt}" class="js-modal-img">

    </div>
`)
        instance.show()
    }
})

loadMoreBtn.addEventListener('click', loadMore);
clearLocalBtn.addEventListener('click', clearLocal);

function renderApi() {
    apiService.fetchImages().then((data) => renderImage(data));

}

refs.body.prepend(clearLocalBtn);
clearLocalBtn.textContent = 'Clear: Local-Storage';
clearLocalBtn.classList.add('clear-btn');
function clearLocal() {
    if (localStorage.getItem(keysArrays)) {
        localStorage.clear();
    }
}

function renderImage(data) {
    const items = template(data);
    refs.galleryList.insertAdjacentHTML('beforeend', items);
    loadMoreBtn.textContent = 'Load mere...';
    loadMoreBtn.classList.add('loadMore-btn');

    if (refs.galleryList != '') {
        refs.body.insertAdjacentElement('beforeend', loadMoreBtn);
        loadMoreBtn.classList.remove('hidden');
    } else {
        loadMoreBtn.classList.add('hidden');
    }
}
function loadMore() {
    apiService.setPage();
    apiService.fetchImages().then((data) => renderImage(data));
    // renderImage(apiService.getResponse)
    setTimeout(() => {
        // window.scrollTo(0, 100);
        window.scrollTo({
            top: document.documentElement.offsetHeight - 1500,
            behavior: 'smooth'
        });
    }, 500);
}

