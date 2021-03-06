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
    priceModal = document.getElementById('priceModal'),
    priceLinks = document.querySelectorAll('.price-link'),
    priceModalClose = document.querySelector('.price-form__close-btn'),
    priceFormInputs = document.querySelectorAll('.price-form__input'),
    /// Safe Quick view Modal
    safeLinks = document.querySelectorAll('.safe-view-btn'),
    safeModal = document.getElementById('safeModal'),
    safeModalClose = document.querySelector('.safe-modal__close-btn'),
    safeFormInputs = document.querySelectorAll('.safe-form__input'),
    /// Stillage Quick view Modal
    stillageLinks = document.querySelectorAll('.stillage-view-btn'),
    stillageModal = document.getElementById('stillageModal'),
    stillageModalClose = document.querySelector('.stillage-modal__close-btn'),
    /// Action Cards view mode
    tileViewMode = document.getElementById('actionTileViewMode'),
    listViewMode = document.getElementById('actionListViewMode'),
    tileViewModeBtn = document.querySelectorAll('.tile-view-btn'),
    listViewModeBtn = document.querySelectorAll('.list-view-btn'),
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
    about = document.querySelector('.information-about'),
    mobileCart = document.querySelector('.mobile-cart'),
    mobileCartBtn = document.querySelector('.mobile-cart-button'),
    //////// Mobile menu  /////
    mobileMenuBtn = document.querySelector('.top-bar__hamburger-menu'),
    mobileMenu = document.querySelector('.mobile-menu-modal'),
    mobileMenuOverlay = document.querySelector('.mobile-menu-overlay'),
    mobileMenuClose = document.querySelector('.drawer-menu__close'),
    ////////// Comparasion page //////////
    infoContent = document.querySelector('.info-content'),
    differenceContent = document.querySelector('.difference-content'),
    topBarPhoneNumber = document.querySelector('.top-bar__phone-number-mobile'),
    recieveMethodCard = document.querySelectorAll('.recieve-method__card'),
    reciveMethodWrapper = document.querySelector('.receive-wrapper'),
    ////////// Checkout additional comment //////////
    additionalCommentText = document.querySelector('.addition-comment-box'),
    additionalCommentClean = document.querySelector('.addition-comment-close'),
    discountModalBtn = document.querySelectorAll('.discount__btn'),
    clientsLogos = document.querySelectorAll('.client-logo');

/************  Gloabal Tab and Button state Switcher Class ********/
class TabContentAccordion {
    constructor(allButtons, allSections) {
        this.allButtons = allButtons;
        this.allSections = allSections;
    }
    /* Toggle button states from arguments.*/
    toggleButtonState(currentBtn) {
        this.allButtons.forEach((innerTab) => {
            if (innerTab.id != currentBtn.id) {
                if (innerTab.classList.contains('accordion-tab_active')) {
                    innerTab.classList.replace('accordion-tab_active', 'accordion-tab');
                }
            }
        });

        if (currentBtn.classList.contains('accordion-tab')) {
            currentBtn.classList.replace('accordion-tab', 'accordion-tab_active');
        } else {
            currentBtn.classList.replace('accordion-tab_active', 'accordion-tab');
        }
    }

    /* Toggle section content from arguments. */
    toggleSections(sectionToShow) {
        sectionToShow.classList.toggle('d-block');

        this.allSections.forEach((section) => {
            if (section !== sectionToShow) {
                section.classList.remove('d-block');
            }
        });
    }
}

/******************* Modal Dialogs Manipulation *****************/
class ModalDialog {
    constructor(modal, inputs) {
        this.modal = modal;
        this.inputs = inputs;
    }

    showModal() {
        this.inputs && this.inputs[0].focus();
        /* Modal and overlay classes always should come first in classlist. */
        this.modal.classList.add(`${this.modal.classList[0]}_active`);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

    closeModal() {
        /* Modal and overlay classes always should come first in classlist. */
        this.modal.classList.remove(`${this.modal.classList[0]}_active`);
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

    modalFormInputState() {
        /* Modal Form Input state classes always should come first in classlist. */
        this.inputs.forEach((input) => {
            input.addEventListener('input', (event) => {
                if (event.target.value.length > 0) {
                    input.classList.add(`${input.classList[0]}_poluted`);
                } else {
                    input.classList.remove(`${input.classList[0]}_poluted`);
                }
            });
        });
    }
}

/********  Price Modal Dialog Setup ********/
let priceModalDialog = new ModalDialog(priceModal, priceFormInputs);

priceLinks.forEach((link) => {
    link.addEventListener('click', () => {
        priceModalDialog.showModal();
    });
});

priceModalClose.addEventListener('click', () => {
    priceModalDialog.closeModal();
});

window.addEventListener('click', (e) => {
    if (e.target == priceModal) priceModalDialog.closeModal();
});

priceFormInputs.forEach((input) => {
    input.addEventListener('click', () => {
        priceModalDialog.modalFormInputState();
    });
});

/********  Safe quick view Modal Dialog Setup ********/

let safeModalDialog = new ModalDialog(safeModal);

safeLinks.forEach((link) => {
    link.addEventListener('click', () => {
        safeModalDialog.showModal();
    });
});

safeModalClose &&
    safeModalClose.addEventListener('click', () => {
        safeModalDialog.closeModal();
    });

window.addEventListener('click', (e) => {
    if (e.target == safeModal) safeModalDialog.closeModal();
});

/********  Stillage quick view Modal Dialog Setup ********/

let stillageModalDialog = new ModalDialog(stillageModal);

stillageLinks.forEach((link) => {
    link.addEventListener('click', () => {
        stillageModalDialog.showModal();
    });
});

stillageModalClose &&
    stillageModalClose.addEventListener('click', () => {
        stillageModalDialog.closeModal();
    });

window.addEventListener('click', (e) => {
    if (e.target == stillageModal) stillageModalDialog.closeModal();
});

/*******   Discount modal calls *****/
let discountModal = document.getElementById('discountModal'),
    discountCloseBtn = document.querySelector('.discount-form__close-btn'),
    discountInputs = document.querySelectorAll('.discount-form__input'),
    discountLink = document.querySelectorAll('.discount__btn');

let discountModalDialog = new ModalDialog(discountModal, discountInputs);

discountLink.forEach((link) => {
    link.addEventListener('click', () => {
        discountModalDialog.showModal();
    });
});

window.addEventListener('click', (e) => {
    if (e.target == discountModal) discountModalDialog.closeModal();
});

discountInputs.forEach((input) => {
    input.addEventListener('click', () => {
        discountModalDialog.modalFormInputState();
    });
});

discountCloseBtn &&
    discountCloseBtn.addEventListener('click', () => {
        discountModalDialog.closeModal();
    });

/******************* Hide navbar on scroll down. *****************/
let navbar = document.getElementById('navbar'),
    mobileNavbar = document.getElementById('mobileNavbar');

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = '0';
        mobileNavbar.style.bottom = '-100px';
    } else {
        navbar.style.top = '-150px';
        mobileNavbar.style.bottom = '0';
    }
    prevScrollpos = currentScrollPos;
};

/******************* Manipulate search box. *****************/

mobileSearchBtn &&
    mobileSearchBtn.addEventListener('click', () => {
        searchFormMobile.classList.add('mobile__search-box_show');
        mobileSearchInput.focus();
        mobileSearchBtn.classList.add('black');
        mobileSearchBtn.children[0].children[0].attributes[1].value = '#26323F';
    });

mobileSearchClose &&
    mobileSearchClose.addEventListener('click', () => {
        searchFormMobile.classList.remove('mobile__search-box_show');
        mobileSearchBtn.classList.remove('black');
        mobileSearchBtn.children[0].children[0].attributes[1].value = '#B6C0CB';
    });

searchBtn &&
    searchBtn.addEventListener('click', () => {
        searchForm.classList.add('top-bar__search-box_show');
        searchInput.focus();
    });

searchClose &&
    searchClose.addEventListener('click', () => {
        searchForm.classList.remove('top-bar__search-box_show');
    });

/******************* Manipulate cart *****************/
cartButton &&
    cartButton.forEach((btn) => {
        btn.addEventListener('click', () => {
            cartWrapper.classList.toggle('d-block');
            cartOverlay.classList.toggle('show-cart-overlay');
            searchForm.classList.remove('top-bar__search-box_show');
            cartOverlay.classList.remove('overlay');
        });
    });

cartOverlay &&
    cartOverlay.addEventListener('click', () => {
        cartWrapper.classList.remove('d-block');
        cartOverlay.classList.remove('show-cart-overlay');
        priceModal.classList.remove('price-form__visible');
    });

/******************* Action page toggle view mode *****************/

/* Switch product cards view modes. */
function switchViewMode(newView, newViewBtn, activeView, activeViewBtn) {
    if (newView.classList.contains('hidden')) {
        newView.classList.remove('hidden');
    }
    activeView.classList.add('hidden');
    activeViewBtn.classList.remove('active');
    newViewBtn.classList.add('active');
}

/* Switch to Tile View */
tileViewModeBtn &&
    tileViewModeBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switchViewMode(tileViewMode, btn, listViewMode, listViewModeBtn[index]);
        });
    });

/* Switch to List View */
listViewModeBtn &&
    listViewModeBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switchViewMode(listViewMode, btn, tileViewMode, tileViewModeBtn[index]);
        });
    });

/******************* Metal Stillage catalog toggle view modes *****************/
/*Switch to Tile View */
catalogTileViewModeBtn &&
    catalogTileViewModeBtn.addEventListener('click', () => {
        switchViewMode(catalogTileViewMode, catalogTileViewModeBtn, catalogListViewMode, catalogListViewModeBtn);
    });

/* Switch to List View */
catalogListViewModeBtn &&
    catalogListViewModeBtn.addEventListener('click', () => {
        switchViewMode(catalogListViewMode, catalogListViewModeBtn, catalogTileViewMode, catalogTileViewModeBtn);
    });

/******************* INFORMATION PAGE COLLAPSING *****************/
/*List of all Buttons and Sections to switch */
let allInfoPageBtns = document.querySelectorAll('.information-tab');
let allInfoPageSections = [delivery, instruction, certificates, warranty, about];

/* New insctance of Tab swither Class */
let informationPageTabs = new TabContentAccordion(allInfoPageBtns, allInfoPageSections);

/* Calling switch methods on click event */
allInfoPageBtns.forEach((currentBtn, index) => {
    currentBtn.addEventListener('click', () => {
        informationPageTabs.toggleButtonState(currentBtn);
        informationPageTabs.toggleSections(allInfoPageSections[index]);
    });
});

/************** Comparision Page Toggle Buttons and Content **********/

/* List of all Buttons and Sections to switch */
let allComparisionPageBtns = document.querySelectorAll('.comparision-tab'),
    allComparisionPageSections = [infoContent, differenceContent];

///New insctance of Tab swither Class
let comparisionPageTabs = new TabContentAccordion(allComparisionPageBtns, allComparisionPageSections);

allComparisionPageBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        comparisionPageTabs.toggleButtonState(btn);
        comparisionPageTabs.toggleSections(allComparisionPageSections[index]);
    });
});

/******************* Mobile Hamburger menu manipulation *****************/
let socialMediaOpenBtn = document.querySelector('.drawer-menu__social-media'),
    burgerCatalogBtn = document.querySelector('.drawer-menu__product-catalog'),
    burgerCatalogPage = document.querySelector('.burger-catalog'),
    socialMediaPage = document.querySelector('.burger__social-networks'),
    burgerBackBtn = document.querySelectorAll('.burger-top-bar__back-btn'),
    burgerCloseBtn = document.querySelectorAll('.burger-top-bar__close-btn');

socialMediaOpenBtn.addEventListener('click', () => {
    socialMediaPage.classList.add('burger__social-networks_active');
});

burgerBackBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        socialMediaPage.classList.remove('burger__social-networks_active');
        burgerCatalogPage.classList.remove('burger-catalog_active');
    });
});

burgerCloseBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        socialMediaPage.classList.remove('burger__social-networks_active');
        burgerCatalogPage.classList.remove('burger-catalog_active');
        mobileMenu.classList.remove('mobile-menu-modal_active');
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
        mobileMenuOverlay.classList.remove('mobile-menu-overlay_active');
    });
});

burgerCatalogBtn.addEventListener('click', () => {
    burgerCatalogPage.classList.add('burger-catalog_active');
});

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu-modal_active');
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    mobileMenuOverlay.classList.toggle('mobile-menu-overlay_active');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('mobile-menu-modal_active');
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
    mobileMenuOverlay.classList.remove('mobile-menu-overlay_active');
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

/*********  Top Bar Phone number on small size ************/
topBarPhoneNumber.addEventListener('click', () => {
    topBarPhoneNumber.textContent = '8 (812) 565 03 59';
    topBarPhoneNumber.classList.add('black');
});

/*********  Sorting & Filtering mobile version  *************/
let sortingBtns = document.querySelectorAll('.sorting-button'),
    filterBtns = document.querySelectorAll('.filter-button'),
    sortingBottomSheet = document.getElementById('sortingBottomSheet'),
    productFilter = document.getElementById('mobileProductFilter'),
    closeMobileFilter = document.getElementById('closeMobileFilter'),
    topBarFilterState = document.querySelector('.top-bar__mobile-filter');

sortingBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        sortingBottomSheet.classList.toggle('sorting-bottomsheet_active');
    });
});

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        productFilter.classList.add('d-block');
        topBarFilterState.classList.add('d-block');
    });
});

closeMobileFilter &&
    closeMobileFilter.addEventListener('click', () => {
        productFilter.classList.remove('d-block');
        topBarFilterState.classList.remove('d-block');
    });

/************  Recieve method card ***/
recieveMethodCard &&
    recieveMethodCard.forEach((card) => {
        card.addEventListener('click', () => {
            recieveMethodCard.forEach((innerCard) => {
                if (innerCard !== card) innerCard.classList.remove('recieve-method__card_active');
            });

            if (card === recieveMethodCard[0]) {
                reciveMethodWrapper.classList.remove('receive-wrapper__optional_active');
            }

            if (card === recieveMethodCard[1]) {
                reciveMethodWrapper.classList.add('receive-wrapper__optional_active');
            }

            card.classList.add('recieve-method__card_active');
        });
    });

/***********  Checkout additional comment component ****/
additionalCommentClean &&
    additionalCommentClean.addEventListener('click', () => {
        additionalCommentText.value = '';
    });

/**************** Customized Select *******************/

let select, selElmnt, selectedEl, hiddenEl, c;
/*look for any elements with the class "stillage-custom-select":*/
select = document.getElementsByClassName('stillage-custom-select');
for (let i = 0; i < select.length; i++) {
    selElmnt = select[i].getElementsByTagName('select')[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    selectedEl = document.createElement('DIV');
    selectedEl.setAttribute('class', 'select-selected');
    selectedEl.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    select[i].appendChild(selectedEl);
    /*for each element, create a new DIV that will contain the option list:*/
    hiddenEl = document.createElement('DIV');
    hiddenEl.setAttribute('class', 'select-items select-hide');
    for (let j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
        c = document.createElement('DIV');
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener('click', function () {
            /*when an item is clicked, update the original select box,
        and the selected item:*/
            let y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName('select')[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName('same-as-selected');
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute('class');
                    }
                    this.setAttribute('class', 'same-as-selected');
                    break;
                }
            }
            h.click();
        });
        hiddenEl.appendChild(c);
    }
    select[i].appendChild(hiddenEl);
    selectedEl.addEventListener('click', function (e) {
        /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        select[i].classList.toggle('select-arrow-active');
    });
}

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
  except the current select box:*/
    let x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
    x = document.getElementsByClassName('select-items');
    y = document.getElementsByClassName('stillage-custom-select');
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i);
        } else {
            y[i].classList.remove('select-arrow-active');
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add('select-hide');
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener('click', closeAllSelect);

/************ Buyer form expender *********/
/************ On navigation Variables & Events will be created *********/
if (window.location.pathname === '/bucket/checkout/checkout.html') {
    let formWrapper = document.querySelector('.buyer-form-wrapper'),
        formIndividual = document.querySelector('.buyer-form__individual'),
        formEntity = document.querySelector('.buyer-form__legal-entity'),
        buyerTypeSelect = document.querySelector('.buyer-form__type-select'),
        selectedType = buyerTypeSelect.querySelector('.select-selected'),
        selectList = buyerTypeSelect.querySelector('.select-items');

    buyerTypeSelect.addEventListener('click', () => {
        if (selectedType.textContent !== selectList.firstChild.textContent) {
            formIndividual.classList.add('d-none');
            formEntity.classList = 'buyer-form__legal-entity_active';
            formWrapper.classList.add('buyer-form-wrapper__entity_active');
        } else {
            formEntity.classList = 'buyer-form__legal-entity';
            formIndividual.classList.remove('d-none');
            formWrapper.classList.remove('buyer-form-wrapper__entity_active');
        }
    });
}

/******************* Product Detail Card Accordtion Setup *****************/
let detailTFabButton = document.querySelectorAll('.detail-tab'),
    allDetailPageSections = [delivery, instruction, certificates, warranty],
    productDetailAccordion = new TabContentAccordion(detailTFabButton, allDetailPageSections);

detailTFabButton.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        productDetailAccordion.toggleButtonState(tab);
        productDetailAccordion.toggleSections(allDetailPageSections[index]);
    });
});

/**
 * @decription Change logo picture on hover 
 *  Pictures name for hover should have '-hover' text.
*/
let oldPath;

clientsLogos.forEach((logo) => {
    logo.addEventListener('mouseover', () => {
        oldPath = logo.getAttribute('src');

        let oldPathName = logo.getAttribute('src').split(/[^.]+$/)[0];

        let oldPathExt = logo.getAttribute('src').split('.').pop();

        logo.setAttribute('src', `${oldPathName.substring(0, oldPathName.length - 1)}-hover.${oldPathExt}`);
    });

    logo.addEventListener('mouseout', () => {
        logo.setAttribute('src', oldPath);
    });
});