//*********    REMOVE ITEMS FROM  CART    **********/

var removeCartItemButtons = document.getElementsByClassName('btn-danger')
//add event listener to the btn-remove elements
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove() //removing the entire div containing the cart item
        updateCartTotal()
    })
}

//To update the cart total after removing an item
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row') //get all the elements with this class name inside the cart-items container
    var total = 0 //will be used to update the total amount of cart items
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0] //get the price of that item       
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //get the quantity of that item
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100 //round the amount to 2 decimal - to avoid infinite decimal places
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total
}

//To ensure that only valid quantity can be entered into the shopping cart
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) { //if they enter a negative number or something else, set quantity to 1
        input.value = 1
    }
    updateCartTotal()
}

//*********    ADD TO CART    **********/

var addToCartbuttons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < addToCartbuttons.length; i++) {
    var button = addToCartbuttons[i]
    button.addEventListener('click', addToCartClicked)
}
//This function selects the item attributes - title, price and image
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement //to select the entire div containing the shop item
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
//This function pushes the item into the cart
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div') //create a new row in the cart 
    cartRow.classList.add('cart-row') //to apply the correct style to the new div
    var cartItems = document.getElementsByClassName('cart-items')[0]
    //checking that no item is added more than once to the cart
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return //to stop the next code to execute
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    //The following code remove the newly added item to cart 
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function (event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
    })
    //To update the quantity of the newly added items
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    updateCartTotal();
}

//*********    PURCHASE    **********/

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
function purchaseClicked() {
    alert('Thank You For Your Purchase')

}