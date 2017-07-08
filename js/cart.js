/**
 * Created by anshul on 3/7/17.
 */
/**
 * Created by anshul on 30/6/17.
 */

function addToCart1(i) {
    fetchCatalog2();
    let index = i;
    let category;
    if(i>=0 && i<=8){
        category = 'mobileAndComputer';
    }
    else if(i>=9 && i<= 17){
        category = 'electronics';
        index -= 9;
    }
    else if(i>=18 && i<=26){
        category = 'furniture';
        index -= 18;
    }
    else{
        category = 'fashion';
        index -= 27;
    }
    if(!cart.hasOwnProperty(i) || cart[i] < catalogtemp[category][index].quantity){
        addItemToCart(i);
        saveCatalog();
    }
    else{
        Materialize.toast(`${catalogtemp[category][index].product} is out of stock`, 1500 );
    }
    buildCart();
}

function removeToCart1(i) {
    fetchCatalog2();
    removeItemfromCart(i);
    saveCatalog();
    buildCart();
}

function buildCart() {
    let table = $('#table');
    let total = 0;
    fetchCatalog();
    fetchCart();
    table.empty();
    for(idx in cart){
        if(cart.hasOwnProperty(idx)){
            let i = idx;
            let category;
            if(idx>=0 && idx<=8){
                category = 'mobileAndComputer';
            }
            else if(idx>=9 && idx<= 17){
                category = 'electronics';
                i -= 9;
            }
            else if(idx>=18 && idx<=26){
                category = 'furniture';
                i -= 18;
            }
            else{
                category = 'fashion';
                i -= 27;
            }
            table.append(
                `<tr>
                <td>${idx}</td>
                <td>${catalogtemp[category][i].product}</td>
                <td>${category}</td>
                <td>${catalogtemp[category][i].price}</td>
                <td>
                    <i onclick="removeToCart1(${idx})" class="fa fa-minus" aria-hidden="true"></i>&nbsp;
                    ${cart[idx]}
                    &nbsp;<i onclick="addToCart1(${idx})" class="fa fa-plus" aria-hidden="true"></i>
                </td>
                <td>${cart[idx]*catalogtemp[category][i].price}</td>   
             </tr>`
            );
            total += (cart[idx]*catalogtemp[category][i].price);
        }
    }
    table.append(
        `<tr>
                <td>Total</td>
                <td colspan="4"></td>
                <td>&#8377; ${total}</td>
             </tr>`
    );
}

$(function () {
    $(".button-collapse").sideNav();

    getCatalog(function () {
        fetchCatalog2();
        fetchCart();
        fetchCatalog();
        buildCart();
    });

    $('#but').click(function () {
        cart = {};
        saveCart();
        buildCart();
        Materialize.toast(' Thanks for Placing Order', 3000);
    });
});