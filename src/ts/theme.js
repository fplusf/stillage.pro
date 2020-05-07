const searchForm = document.getElementById('searchForm'),
    searchFormMobile = document.getElementById('searchFormMobile'),
    searchInput = document.getElementById('search-input'),
    mobileSearchInput = document.getElementById('mobile-search-input'),
    searchBtn = document.querySelector('.top-bar__search-btn'),
    mobileSearchBtn = document.querySelector('.mobile__search-btn'),
    mobileSearchClose = document.querySelector('.mobile__search-box__close'),
    searchClose = document.querySelector('.search-box__close'),
    cartButton = document.querySelectorAll('.top-bar__cart_button'),
    cartWrapper = document.querySelector('.top-bar__cart'),
    cartOverlay = document.querySelector('.cart-overlay'),
    priceLink = document.querySelector('.price-link'),
    priceFormClose = document.querySelector('.price-form__close-btn'),
    priceForm = document.querySelector('.price-form'),
    priceFormInputs = document.querySelectorAll('.price-form__input'),
    tileViewMode = document.getElementById('actionTileViewMode'),
    listViewMode = document.getElementById('actionListViewMode'),
    tileViewModeBtn = document.getElementsByClassName('tile-view-btn')[0],
    listViewModeBtn = document.getElementsByClassName('list-view-btn')[0],
    headerLinks = document.querySelectorAll('.site-header__nav-link'),
    visitedLinks = document.querySelectorAll('.active-link'),
    /// Information sections
    delivery = document.querySelector('.collapse-one'),
    instruction = document.querySelector('.instruction'),
    certificates = document.querySelector('.certificates'),
    warranty = document.querySelector('.warranty'),
    //// Information section toggle buttons
    deliveryBtn = document.querySelector('.delivery-btn'),
    warrantyBtn = document.querySelector('.warranty-btn'),
    certificatesBtn = document.querySelector('.certificates-btn'),
    instructionBtn = document.querySelector('.instruction-btn'),
    about = document.querySelector('.information-about'),
    mobileCart = document.querySelector('.mobile-cart'),
    mobileCartBtn = document.querySelector('.mobile-cart-button'),
    //////// Mobile menu  /////
    mobileMenu = document.getElementById('mobileMenu'),
    mobileMenuBtn = document.querySelector('.top-bar__hamburger-menu'),
    mobileMenuClose = document.querySelector('.drawer-menu-close');

/******************* Owl carousel setup. *****************/

$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
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
        if ($('.owl-carousel').children().length !== 3 && $('.owl-carousel').children().length !== 6) {
            $('.owl-carousel').append('<span class="slide-count white position-absolute"></span>');
        }

        if (!event.namespace) {
            return;
        }

        let slides = event.relatedTarget;

        $('.slide-count').text(slides.relative(slides.current()) + 1 + '/' + slides.items().length);
    }
});

/******************* Manipulate search box. *****************/

!mobileSearchBtn
    ? null
    : mobileSearchBtn.addEventListener('click', () => {
          searchFormMobile.classList.add('mobile__search-box_show');
          mobileSearchInput.focus();
      });

searchBtn.addEventListener('click', () => {
    searchForm.classList.add('top-bar__search-box_show');
    searchInput.focus();
});

searchClose.addEventListener('click', () => {
    searchForm.classList.remove('top-bar__search-box_show');
});

!mobileSearchClose
    ? null
    : mobileSearchClose.addEventListener('click', () => {
          searchFormMobile.classList.remove('mobile__search-box_show');
      });

/******************* Manipulate cart *****************/

!cartButton
    ? null
    : cartButton.forEach((btn) => {
          btn.addEventListener('click', () => {
              cartWrapper.classList.toggle('d-block');
              cartOverlay.classList.toggle('show-cart-overlay');
              searchForm.classList.remove('top-bar__search-box_show');
              cartOverlay.classList.remove('price-overlay');
          });
      });

cartOverlay.addEventListener('click', () => {
    cartWrapper.classList.remove('d-block');
    cartOverlay.classList.remove('show-cart-overlay');
    priceForm.classList.remove('price-form__visible');
});

/******************* Change Price Form input view depending on values. *****************/

priceFormInputs.forEach((input) => {
    input.addEventListener('input', (event) => {
        if (event.target.value.length > 0) {
            input.classList.add('input-poluted');
        } else {
            input.classList.remove('input-poluted');
        }
    });
});

/******************* Action page toggle view mode *****************/

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

/******************* Price Form *****************/
// Set cliced link value to localStorage
// further to add active class
headerLinks.forEach((activeLink) => {
    activeLink.addEventListener('click', () => {
        localStorage.setItem('activeLink', activeLink.id);
    });
});

// Add active class to the current header link
// after page reload from localStorage
if (performance.navigation) {
    let activatedLinkId = document.getElementById(localStorage.getItem('activeLink'));
    if (activatedLinkId != 0) {
        activatedLinkId.classList.add('active-link');
    }
}

/******************* INFORMATION PAGE COLLAPSING *****************/

!deliveryBtn
    ? null
    : deliveryBtn.addEventListener('click', () => {
          toggleInfoSections(delivery);
          toggleInfoBtnIcons(deliveryBtn);
      });

!warrantyBtn
    ? null
    : warrantyBtn.addEventListener('click', () => {
          toggleInfoSections(warranty);
          toggleInfoBtnIcons(warrantyBtn);
      });

!certificatesBtn
    ? null
    : certificatesBtn.addEventListener('click', () => {
          toggleInfoSections(certificates);
          toggleInfoBtnIcons(certificatesBtn);
      });

!instructionBtn
    ? null
    : instructionBtn.addEventListener('click', () => {
          toggleInfoSections(instruction);
          toggleInfoBtnIcons(instructionBtn);
      });

/******************* Toggle information buttons satate. *****************/

function toggleInfoBtnIcons(sectionBtn) {
    let allButtons = [deliveryBtn, instructionBtn, certificatesBtn, warrantyBtn];

    if (sectionBtn.children[1].className.includes('fa fa-plus 3x')) {
        sectionBtn.children[1].className = sectionBtn.children[1].className.replace('fa fa-plus 3x', 'fa fa-times 3x');

        sectionBtn.classList.add('information-button-active');

        allButtons.forEach((btn) => {
            if (btn !== sectionBtn) {
                btn.children[1].className = btn.children[1].className.replace('fa fa-times 3x', 'fa fa-plus 3x');
                btn.classList.remove('information-button-active');
            }
        });
    } else {
        sectionBtn.children[1].className = sectionBtn.children[1].className.replace('fa fa-times 3x', 'fa fa-plus 3x');
        sectionBtn.classList.remove('information-button-active');
    }
}

/******************* Toggle information section. *****************/

function toggleInfoSections(sectionToShow) {
    sectionToShow.classList.toggle('d-block');

    let allSections = [delivery, instruction, certificates, warranty, about];

    allSections.forEach((section) => {
        if (section !== sectionToShow) {
            section.classList.remove('d-block');
            if (section === allSections[4]) {
                // section.classList.add('d-none');
            }
        }
    });
}

/******************* Mobile Hamburger menu manipulation *****************/

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('top-bar__mobile-menu_visible');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('top-bar__mobile-menu_visible');
});

!mobileCartBtn
    ? null
    : mobileCartBtn.addEventListener('click', () => {
          cartWrapper.classList.toggle('cart-wrapper_visible');
      });

/******************* Range slider *****************/

$(function () {
    $('#slider-range').slider({
        range: true,
        min: 0,
        max: 40000,
        values: [6000, 29000],
        slide: function (event, ui) {
            $('.price-range__value-low').text(ui.values[0]) + $('.price-range__value-up').text(ui.values[1]);
        },
    });
    $('#amount').val('$' + $('#amount').slider('values', 0) + $('#amount').slider('values', 1));

    $('#slider-range span')
        .first()
        .prepend('<div class="price-range__value-low mr-3 price-value position-absolute">0</div>');

    $('#slider-range span')
        .last()
        .prepend('<div class="price-range__value-up mr-3 price-value position-absolute">33</div>');
});

/******************* Actions Filter Accordion *****************/
$('.d-accordion').on('show.bs.collapse', function (n) {
    $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-right fa-chevron-up');
});
$('.d-accordion').on('hide.bs.collapse', function (n) {
    $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-right fa-chevron-up');
});

/******************* Magnific Popup setup *****************/

$(document).ready(function () {
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function () {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }

                mobileMenu.classList.remove('top-bar__mobile-menu_visible');
            },
        },
        
    });
});
