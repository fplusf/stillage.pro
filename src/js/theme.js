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

/******************* Hide navbar on scroll down. *****************/

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById('navbar').style.top = '0';
    } else {
        document.getElementById('navbar').style.top = '-60px';
    }
    prevScrollpos = currentScrollPos;
};

/******************* Manipulate search box. *****************/

mobileSearchBtn &&
    mobileSearchBtn.addEventListener('click', () => {
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

mobileSearchClose &&
    mobileSearchClose.addEventListener('click', () => {
        searchFormMobile.classList.remove('mobile__search-box_show');
    });

/******************* Manipulate cart *****************/

cartButton &&
    cartButton.forEach((btn) => {
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

tileViewModeBtn &&
    tileViewModeBtn.addEventListener('click', () => {
        if (tileViewMode.classList.contains('hidden')) {
            tileViewMode.classList.remove('hidden');
        }
        listViewMode.classList.add('hidden');
        tileViewModeBtn.classList.add('active');
        listViewModeBtn.classList.remove('active');
    });

listViewModeBtn &&
    listViewModeBtn.addEventListener('click', () => {
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

deliveryBtn &&
    deliveryBtn.addEventListener('click', () => {
        toggleInfoSections(delivery);
        toggleInfoBtnIcons(deliveryBtn);
    });

warrantyBtn &&
    warrantyBtn.addEventListener('click', () => {
        toggleInfoSections(warranty);
        toggleInfoBtnIcons(warrantyBtn);
    });

certificatesBtn &&
    certificatesBtn.addEventListener('click', () => {
        toggleInfoSections(certificates);
        toggleInfoBtnIcons(certificatesBtn);
    });

instructionBtn &&
    instructionBtn.addEventListener('click', () => {
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

mobileCartBtn &&
    mobileCartBtn.addEventListener('click', () => {
        cartWrapper.classList.toggle('cart-wrapper_visible');
    });
