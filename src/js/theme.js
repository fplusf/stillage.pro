const searchForm = document.getElementById('searchForm'),
    searchFormMobile = document.getElementById('searchFormMobile'),
    searchInput = document.getElementById('search-input'),
    mobileSearchInput = document.getElementById('mobile-search-input'),
    searchBtn = document.querySelector('.top-bar__search-btn'),
    mobileSearchBtn = document.querySelector('.mobile__search-btn'),
    mobileSearchClose = document.querySelector('.mobile__search-box__close'),
    searchClose = document.querySelector('.search-box__close'),
    cartButton = document.querySelectorAll('.top-bar__cart-button'),
    cartWrapper = document.querySelector('.top-bar__cart'),
    cartOverlay = document.querySelector('.cart-overlay'),
    /// Price Modal view
    priceOverlay = document.querySelector('.form-overlay'),
    priceLink = document.querySelectorAll('.price-link'),
    priceFormClose = document.querySelector('.close-btn'),
    priceForm = document.querySelector('.price-form'),
    priceFormInputs = document.querySelectorAll('.price-form__input'),
    /// Action Cards view mode
    tileViewMode = document.getElementById('actionTileViewMode'),
    listViewMode = document.getElementById('actionListViewMode'),
    tileViewModeBtn = document.getElementsByClassName('tile-view-btn')[0],
    listViewModeBtn = document.getElementsByClassName('list-view-btn')[0],
    /// Toggle header Links
    headerLinks = document.querySelectorAll('.site-header__nav-link'),
    visitedLinks = document.querySelectorAll('.active-link'),
    /// Metal stillage catalog Cards view mode
    catalogTileViewMode = document.getElementById('catalogTileView'),
    catalogListViewMode = document.getElementById('catalogListViewMode'),
    catalogTileViewModeBtn = document.getElementsByClassName('catalog-tile-view-btn')[0],
    catalogListViewModeBtn = document.getElementsByClassName('catalog-list-view-btn')[0],
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
    mobileMenuClose = document.querySelector('.drawer-menu-close'),
    ////////// Comparasion page //////////
    infoBtn = document.getElementsByClassName('info-btn')[0],
    differenceBtn = document.getElementsByClassName('difference-btn')[0],
    infoContent = document.getElementsByClassName('info-content')[0],
    differenceContent = document.getElementsByClassName('difference-content')[0];

/************  Gloabal Tab and Button state Switcher Class ********/
class TabContentSwitch {
    /// Toggle button states from arguments.
    toggleButtonIcons(currentBtn, allButtons) {
        if (currentBtn.children[1].className.includes('open active')) {
            currentBtn.children[1].className = 'open';

            currentBtn.children[2].className = 'close active';

            currentBtn.classList.add('information-button-active');

            allButtons.forEach((btn) => {
                if (btn !== currentBtn) {
                    btn.children[1].className = 'open active';
                    btn.children[2].className = 'close';
                    btn.classList.remove('information-button-active');
                }
            });
        } else {
            currentBtn.children[1].className = 'open active';
            currentBtn.children[2].className = 'close';
            currentBtn.classList.remove('information-button-active');
        }
    }

    /// Toggle section content from arguments.
    toggleSections(sectionToShow, allSections) {
        sectionToShow.classList.toggle('d-block');

        // let allSections = [delivery, instruction, certificates, warranty, about];

        allSections.forEach((section) => {
            if (section !== sectionToShow) {
                section.classList.remove('d-block');
            }
        });
    }
}

/******************* Hide navbar on scroll down. *****************/

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById('navbar').style.top = '0';
        document.getElementById('mobileNavbar').style.bottom = '-100px';
    } else {
        document.getElementById('navbar').style.top = '-150px';
        document.getElementById('mobileNavbar').style.bottom = '0';
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

/******************* Price Form Modal *****************/
priceLink.forEach((link) => {
    link.addEventListener('click', () => {
        priceOverlay.classList.add('active');
        priceForm.classList.add('active');
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    });
});

priceFormClose.addEventListener('click', () => {
    priceOverlay.classList.remove('active');
    priceForm.classList.remove('active');
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
});

priceOverlay.addEventListener('click', () => {
    priceOverlay.classList.remove('active');
    priceForm.classList.remove('active');
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
});

priceFormInputs.forEach((input) => {
    input.addEventListener('input', (event) => {
        if (event.target.value.length > 0) {
            input.classList.add('price-form-input_poluted');
        } else {
            input.classList.remove('price-form-input_poluted');
        }
    });
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

/******************* Action page toggle view mode *****************/

// Switch product cards view modes.
function switchViewMode(newView, newViewBtn, activeView, activeViewBtn) {
    if (newView.classList.contains('hidden')) {
        newView.classList.remove('hidden');
    }
    activeView.classList.add('hidden');
    activeViewBtn.classList.remove('active');
    newViewBtn.classList.add('active');
}

// Switch to Tile View
tileViewModeBtn &&
    tileViewModeBtn.addEventListener('click', () => {
        switchViewMode(tileViewMode, tileViewModeBtn, listViewMode, listViewModeBtn);
    });

// Switch to List View
listViewModeBtn &&
    listViewModeBtn.addEventListener('click', () => {
        switchViewMode(listViewMode, listViewModeBtn, tileViewMode, tileViewModeBtn);
    });

/******************* Metal Stillage catalog toggle view modes *****************/
// Switch to Tile View
catalogTileViewModeBtn &&
    catalogTileViewModeBtn.addEventListener('click', () => {
        switchViewMode(catalogTileViewMode, catalogTileViewModeBtn, catalogListViewMode, catalogListViewModeBtn);
    });

// Switch to List View
catalogListViewModeBtn &&
    catalogListViewModeBtn.addEventListener('click', () => {
        switchViewMode(catalogListViewMode, catalogListViewModeBtn, catalogTileViewMode, catalogTileViewModeBtn);
    });

/******************* INFORMATION PAGE COLLAPSING *****************/
///// New insctance of Tab swither Class /////
let informationPageTabs = new TabContentSwitch();

///// List of all Buttons and Sections to switch /////
let allInfoPageBtns = [deliveryBtn, instructionBtn, certificatesBtn, warrantyBtn];
let allInfoPageSections = [delivery, instruction, certificates, warranty, about];

////// Calling switch methods on click event //////
deliveryBtn &&
    deliveryBtn.addEventListener('click', () => {
        informationPageTabs.toggleSections(delivery, allInfoPageSections);
        informationPageTabs.toggleButtonIcons(deliveryBtn, allInfoPageBtns);
    });

warrantyBtn &&
    warrantyBtn.addEventListener('click', () => {
        informationPageTabs.toggleSections(warranty, allInfoPageSections);
        informationPageTabs.toggleButtonIcons(warrantyBtn, allInfoPageBtns);
    });

certificatesBtn &&
    certificatesBtn.addEventListener('click', () => {
        informationPageTabs.toggleSections(certificates, allInfoPageSections);
        informationPageTabs.toggleButtonIcons(certificatesBtn, allInfoPageBtns);
    });

instructionBtn &&
    instructionBtn.addEventListener('click', () => {
        informationPageTabs.toggleSections(instruction, allInfoPageSections);
        informationPageTabs.toggleButtonIcons(instructionBtn, allInfoPageBtns);
    });

/************** Comparision Page Toggle Buttons and Content **********/
///// New insctance of Tab swither Class /////
let comparisionPageTabs = new TabContentSwitch();

///// List of all Buttons and Sections to switch /////
let allComparisionPageBtns = [infoBtn, differenceBtn];
let allComparisionPageSections = [infoContent, differenceContent];

infoBtn &&
    infoBtn.addEventListener('click', () => {
        comparisionPageTabs.toggleButtonIcons(infoBtn, allComparisionPageBtns);
        comparisionPageTabs.toggleSections(infoContent, allComparisionPageSections);
    });

differenceBtn &&
    differenceBtn.addEventListener('click', () => {
        comparisionPageTabs.toggleButtonIcons(differenceBtn, allComparisionPageBtns);
        comparisionPageTabs.toggleSections(differenceContent, allComparisionPageSections);
    });

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

/*********** Comparasion page Toggle Page State ****************/
let comparisionResetList = document.querySelector('.comparision__reset-list'),
    comparisionCompareBtn = document.querySelector('.comparision__compare'),
    comparisionProcessSection = document.querySelector('.comparision-process'),
    comparisionDefaultSection = document.querySelector('.comparision-default-state');

comparisionResetList &&
    comparisionResetList.addEventListener('click', () => {
        comparisionResetList.classList.add('d-none');
        comparisionCompareBtn.classList.remove('d-none');
        comparisionProcessSection.classList.add('d-none');
        comparisionDefaultSection.classList.remove('d-none');
    });

comparisionCompareBtn &&
    comparisionCompareBtn.addEventListener('click', () => {
        comparisionResetList.classList.remove('d-none');
        comparisionCompareBtn.classList.add('d-none');
        comparisionProcessSection.classList.remove('d-none');
        comparisionDefaultSection.classList.add('d-none');
    });
