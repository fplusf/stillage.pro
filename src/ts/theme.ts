const searchForm = document.getElementById('searchForm'),
    searchInput = document.getElementById('search-input'),
    searchBtn = document.querySelector('.top-bar__search-btn'),
    searchClose = document.querySelector('.search-box__close'),
    cartButton = document.querySelector('.top-bar__cart_button'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartOverlay = document.querySelector('.cart-overlay');

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
