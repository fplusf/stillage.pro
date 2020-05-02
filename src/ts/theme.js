const searchForm = document.getElementById('searchForm'),
    searchInput = document.getElementById('search-input'),
    searchBtn = document.querySelector('.top-bar__search-btn'),
    searchClose = document.querySelector('.search-box__close'),
    cartButton = document.querySelector('.top-bar__cart_button'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartOverlay = document.querySelector('.cart-overlay'),
    priceLink = document.querySelector('.price-link'),
    priceFormClose = document.querySelector('.price-form__close-btn'),
    priceForm = document.querySelector('.price-form'),
    priceFormInputs = document.querySelectorAll('.price-form__input'),
    tileViewMode = document.getElementById('actionTileViewMode'),
    listViewMode = document.getElementById('actionListViewMode');

const tileViewModeBtn = document.getElementsByClassName('tile-view-btn')[0],
    listViewModeBtn = document.getElementsByClassName('list-view-btn')[0];

/**
 * Owl carousel setup.
 */
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        onInitialized: counter,
        onChanged: counter,
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

    function counter(event) {
        if ($('.owl-carousel').children().length < 4) {
            $('.owl-carousel').append('<span class="slide-count white position-absolute"></span>');
        }

        if (!event.namespace) {
            return;
        }
        let slides = event.relatedTarget;

        $('.slide-count').text(slides.relative(slides.current()) + 1 + '/' + slides.items().length);
    }
});

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
priceFormClose.addEventListener('click', () => {
    priceForm.classList.remove('price-form__visible');
    cartOverlay.classList.remove('show-cart-overlay');
});

priceLink.addEventListener('click', () => {
    priceForm.classList.toggle('price-form__visible');
    cartOverlay.classList.toggle('show-cart-overlay');
});

// Change Price Form input view depending on values.
priceFormInputs.forEach((input) => {
    input.addEventListener('input', (event) => {
        if (event.target.value.length > 0) {
            input.classList.add('input-poluted');
        } else {
            input.classList.remove('input-poluted');
        }
    });
});

////// Action page toggle view mode /////

!tileViewModeBtn
    ? null
    : tileViewModeBtn.addEventListener('click', () => {
          if (tileViewMode.classList.contains('hidden')) {
              tileViewMode.classList.remove('hidden');
          }
          listViewMode.classList.add('hidden');
          tileViewModeBtn.classList.add('active');
          listViewModeBtn.classList.remove('active');
      });

!listViewModeBtn
    ? null
    : listViewModeBtn.addEventListener('click', () => {
          if (listViewMode.classList.contains('hidden')) {
              listViewMode.classList.remove('hidden');
          }
          tileViewMode.classList.add('hidden');
          listViewModeBtn.classList.add('active');
          tileViewModeBtn.classList.remove('active');
      });
