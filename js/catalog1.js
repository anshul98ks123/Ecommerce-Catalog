/**
 * Created by anshul on 30/6/17.
 */

function buildCatalog() {
    let list = $('#list');
    list.empty();
    for(let i in catalog.mobileAndComputer){
        addItemToCatalog(i, list);
    }
}

function addToCart1(i) {
    fetchCatalog2();
    console.log(i);
    console.log(catalogtemp);
    if(!cart.hasOwnProperty(i) || cart[i] < catalogtemp.mobileAndComputer[i].quantity){
        addItemToCart(i);
        saveCatalog();
        if($('#test8').prop('checked') && $('#test7').prop('checked')){
            stockAndCod();
        }
        else if($('#test8').prop('checked')){
            stock();
        }
        else if($('#test7').prop('checked')){
            cod();
        }
        else{
            buildCatalog();
        }
    }
    else{
        Materialize.toast(`${catalogtemp.mobileAndComputer[i].product} is out of stock`, 1500 );
    }
}

function addItemToCatalog(i, l) {
    let list = l;
    let content = `<div class="col s12 m6 l6 xl4">
                <div class="card">
                    <div class="card-image">
                        <img height="250px" width="200px" src="${catalog.mobileAndComputer[i].img}">
                        <a class="btn-floating halfway-fab waves-effect waves-light red" title="add to cart">
                        <i onclick="addToCart1(${catalog.mobileAndComputer[i].id})" class="fa fa-cart-plus" aria-hidden="true"></i></a>
                    </div>
                    <div class="card-content">
                        <span class="card-title">${catalog.mobileAndComputer[i].product}</span>
                        <p> &#8377; ${catalog.mobileAndComputer[i].price}</p>
                        <p> Sold by ${catalog.mobileAndComputer[i].seller}</p>`;

    let current = catalog.mobileAndComputer[i].quantity;
    let sold = cart[catalog.mobileAndComputer[i].id]||0;
    if(sold >= current){
        content += `<br><span class="center materialize-red-text" style="text-transform: uppercase"><br> OUT OF STOCK</span><br>`
    }
    else{
        let left = current - sold;
        content += `<span class="left-align"><br>${left} units left</span>
                        <span class="right-align"><br>${cart[catalog.mobileAndComputer[i].id]||'0'} in cart</span>`
    }

    content += `</div>
                </div>
            </div>`;

    list.append(content);
}

function saveCatalog() {
    localStorage.setItem('catalog', JSON.stringify(catalog));
}

function cod() {
    let list = $('#list');
    list.empty();
    for(let i in catalog.mobileAndComputer){
        if(catalog.mobileAndComputer[i].cod === 'true'){
            addItemToCatalog(i, list);
        }
    }
}

function stockAndCod() {
    let list = $('#list');
    list.empty();
    for(let i in catalog.mobileAndComputer){
        let current = catalog.mobileAndComputer[i].quantity;
        let sold = cart[catalog.mobileAndComputer[i].id]||0;
        if(current != sold && catalog.mobileAndComputer[i].cod === 'true'){
            addItemToCatalog(i, list);
        }
    }
}

function stock() {
    let list = $('#list');
    list.empty();
    for(let i in catalog.mobileAndComputer){
        let current = catalog.mobileAndComputer[i].quantity;
        let sold = cart[catalog.mobileAndComputer[i].id]||0;
        if(current != sold){
            addItemToCatalog(i, list);
        }
    }
}

function sort1() {
    let list = $('#list');
    list.empty();
    catalog.mobileAndComputer = catalog.mobileAndComputer.sort(function (a,b) {
        let first = parseInt(a.price);
        let second = parseInt(b.price);
        if(first <= second){
            return 1;
        }
        else{
            return -1;
        }
    });
    for(let i in catalog.mobileAndComputer){
        addItemToCatalog(i, list);
    }
}

function sort2() {
    let list = $('#list');
    list.empty();
    catalog.mobileAndComputer = catalog.mobileAndComputer.sort(function (a,b) {
        let first = parseInt(a.price);
        let second = parseInt(b.price);
        if(first >= second){
            return 1;
        }
        else{
            return -1;
        }
    });
    for(let i in catalog.mobileAndComputer){
        addItemToCatalog(i, list);
    }
}

$(function () {
    $(".button-collapse").sideNav();
    getCatalog(function () {
        console.log(catalogtemp);
        fetchCart();
        buildCatalog();
        saveCatalog();
    });

    $('#test7').change(function (e) {
        fetchCatalog2();
        if($('#test7').prop('checked')){
            if($('#test8').prop('checked')){
                stockAndCod();
            }
            else{
                cod();
            }
        }
        else if($('#test8').prop('checked')){
            stock();
        }
        else{
            buildCatalog();
        }
    });

    $('#test8').change(function (e) {
        fetchCatalog2();
        if($('#test8').prop('checked')){
            if($('#test7').prop('checked')){
                stockAndCod();
            }
            else{
                stock();
            }
        }
        else if($('#test7').prop('checked')){
            cod();
        }
        else{
            buildCatalog();
        }
    });

    $('#sort1').change(function () {
        fetchCatalog2();
        if($('#sort1').prop('checked')){
            sort1();
            if($('#test8').prop('checked') && $('#test7').prop('checked')){
                stockAndCod();
            }
            else if($('#test8').prop('checked')){
                stock();
            }
            else if($('#test7').prop('checked')){
                cod();
            }
        }
        else{
            buildCatalog();
        }
    });

    $('#sort2').change(function () {
        fetchCatalog2();
        if($('#sort2').prop('checked')){
            sort2();
            if($('#test8').prop('checked') && $('#test7').prop('checked')){
                stockAndCod();
            }
            else if($('#test8').prop('checked')){
                stock();
            }
            else if($('#test7').prop('checked')){
                cod();
            }
        }
        else{
            buildCatalog();
        }
    });
});

