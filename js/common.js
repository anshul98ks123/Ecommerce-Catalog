/**
 * Created by anshul on 30/6/17.
 */

let catalog  = [];
let catalogtemp = [];
let cart = {};

function getCatalog(done) {
    $.getJSON('js/package.json', function (item) {
        catalogtemp = item;
        saveCatalog2();
        if(localStorage.getItem('catalog')){
            fetchCatalog();
        }
        else{
            catalog = item;
        }
        done();
    });
}

function removeItemfromCart(id) {
    if(cart[id] <= 1){
        delete cart[id];
    }
    else{
        cart[id]--;
    }
    saveCart();
    saveCatalog();
}

function addItemToCart(id) {
    if(cart[id]){
        cart[id]++;
    }
    else{
        cart[id] = 1;
    }
    saveCart();
    saveCatalog();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function fetchCart() {
    let savedItems = localStorage.getItem('cart');
    if(savedItems){
        cart = JSON.parse(savedItems);
    }
}

function saveCatalog() {
    localStorage.setItem('catalog', JSON.stringify(catalog));
}

function saveCatalog2() {
    localStorage.setItem('catalogtemp', JSON.stringify(catalogtemp));
}

function fetchCatalog2() {
    let savedItems = localStorage.getItem('catalogtemp');
    if(savedItems){
        catalogtemp = JSON.parse(savedItems);
    }
}

function fetchCatalog() {
    let savedItems = localStorage.getItem('catalog');
    if(savedItems){
        catalog = JSON.parse(savedItems);
    }
}


