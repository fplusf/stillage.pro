const searchForm = document.getElementById('searchForm'),
    searchBtn = document.querySelector('.top-bar__search-btn'),
    searchClose = document.querySelector('.search-box__close'),
    cartButton = document.querySelector('.top-bar__cart_button'),
    cartWrapper = document.querySelector('.cart-wrapper');

/**
 * Manipulate search box.
 */
searchBtn.addEventListener('click', function () {
    searchForm.classList.add('top-bar__search-box_show');
});

searchClose.addEventListener('click', () => {
    searchForm.classList.remove('top-bar__search-box_show');
});

/**
 * Manipulate cart.
 */
cartButton.addEventListener('click', () => {
    cartWrapper.classList.toggle('cart-wrapper_visible');
});
