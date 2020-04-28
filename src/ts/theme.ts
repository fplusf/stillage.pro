const searchForm = document.getElementById('searchForm'),
    searchInput = document.getElementById('search-input'),
    searchBtn = document.querySelector('.top-bar__search-btn'),
    searchClose = document.querySelector('.search-box__close'),
    cartButton = document.querySelector('.top-bar__cart_button'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartOverlay = document.querySelector('.cart-overlay'),
    priceLink = document.querySelector('.price-link'),
    priceForm = document.querySelector('.price-form'),
    priceFormInputs = document.querySelectorAll('.price-form__input');

/**
 * Manipulate search box.
 */
searchBtn.addEventListener('click', function () {
    searchForm.classList.add('top-bar__search-box_show');
    searchInput.focus();
});

searchClose.addEventListener('click', () => {
    searchForm.classList.remove('top-bar__search-box_show');
});

/**
 * Manipulate cart.
 */
cartButton.addEventListener('click', () => {
    cartWrapper.classList.toggle('cart-wrapper_visible');
    cartOverlay.classList.toggle('show-cart-overlay');
    searchForm.classList.remove('top-bar__search-box_show');
});

cartOverlay.addEventListener('click', () => {
    cartWrapper.classList.remove('cart-wrapper_visible');
    cartOverlay.classList.remove('show-cart-overlay');
    priceForm.classList.remove('price-form__visible');
});

/**
 * Manipulate price.
 */
priceLink.addEventListener('click', () => {
    priceForm.classList.toggle('price-form__visible');
    cartOverlay.classList.toggle('show-cart-overlay');
});

// Change Price Form input view depending on values.
priceFormInputs.forEach((input) => {
    input.addEventListener('input', (event) => {
        if ((<HTMLInputElement>event.target).value.length > 0) {
            input.classList.add('input-poluted');
        } else {
            input.classList.remove('input-poluted');
        }
    });
});


/**
 * Owl carousel setup.
 */
$(document).ready(function () {
    (<any>$('.owl-carousel')).owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });
});
