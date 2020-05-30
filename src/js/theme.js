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
    priceOverlay = document.querySelector('.price-overlay'),
    priceModal = document.querySelector('.price-modal'),
    priceLinks = document.querySelectorAll('.price-link'),
    priceModalClose = document.querySelectorAll('.close-modal'),
    priceFormInputs = document.querySelectorAll('.price-form__input'),
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
    //// Information section toggle buttons
    deliveryBtn = document.querySelector('.delivery-btn'),
    warrantyBtn = document.querySelector('.warranty-btn'),
    certificatesBtn = document.querySelector('.certificates-btn'),
    instructionBtn = document.querySelector('.instruction-btn'),
    about = document.querySelector('.information-about'),
    mobileCart = document.querySelector('.mobile-cart'),
    mobileCartBtn = document.querySelector('.mobile-cart-button'),
    //////// Mobile menu  /////
    mobileMenuBtn = document.querySelector('.top-bar__hamburger-menu'),
    mobileMenu = document.querySelector('.mobile-menu-modal'),
    mobileMenuOverlay = document.querySelector('.mobile-menu-overlay'),
    mobileMenuClose = document.querySelector('.drawer-menu__close'),
    ////////// Comparasion page //////////
    infoBtn = document.getElementsByClassName('info-btn')[0],
    differenceBtn = document.getElementsByClassName('difference-btn')[0],
    infoContent = document.getElementsByClassName('info-content')[0],
    differenceContent = document.getElementsByClassName('difference-content')[0],
    topBarPhoneNumber = document.querySelector('.top-bar__phone-number-mobile'),
    recieveMethodCard = document.querySelectorAll('.recieve-method__card'),
    reciveMethodWrapper = document.querySelector('.receive-wrapper'),
    ////////// Checkout additional comment //////////
    additionalCommentText = document.querySelector('.addition-comment-box'),
    additionalCommentClean = document.querySelector('.addition-comment-close');

/************  Gloabal Tab and Button state Switcher Class ********/
class TabContentAccordion {
    constructor(allButtons, allSections) {
        this.allButtons = allButtons;
        this.allSections = allSections;
    }
    /* Toggle button states from arguments.*/
    toggleButtonIcons(currentBtn) {
        if (currentBtn.children[1].className.includes('open active')) {
            currentBtn.children[1].className = 'open';

            currentBtn.children[2].className = 'close active';

            currentBtn.classList.add('information-button-active');

            this.allButtons.forEach((btn) => {
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
    constructor(overlay, modal, inputs) {
        this.overlay = overlay;
        this.modal = modal;
        this.inputs = inputs;
    }

    showModal() {
        this.inputs[0].focus();
        /* Modal and overlay classes always should come first in classlist. */
        this.overlay.classList.add(`${this.overlay.classList[0]}_active`);
        this.modal.classList.add(`${this.modal.classList[0]}_active`);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

    closeModal() {
        /* Modal and overlay classes always should come first in classlist. */
        this.overlay.classList.remove(`${this.overlay.classList[0]}_active`);
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
let priceModalDialog = new ModalDialog(priceOverlay, priceModal, priceFormInputs);

priceLinks.forEach((link) => {
    link.addEventListener('click', () => {
        priceModalDialog.showModal();
    });
});

priceModalClose.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
        priceModalDialog.closeModal();
    });
});

priceFormInputs.forEach((input) => {
    input.addEventListener('click', () => {
        priceModalDialog.modalFormInputState();
    });
});

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
        mobileSearchBtn.classList.add('black');
        mobileSearchBtn.children[0].children[0].attributes[1].value = '#26323F';
    });

mobileSearchClose &&
    mobileSearchClose.addEventListener('click', () => {
        searchFormMobile.classList.remove('mobile__search-box_show');
        mobileSearchBtn.classList.remove('black');
        mobileSearchBtn.children[0].children[0].attributes[1].value = '#B6C0CB';
    });

searchBtn.addEventListener('click', () => {
    searchForm.classList.add('top-bar__search-box_show');
    searchInput.focus();
});

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
            cartOverlay.classList.remove('price-overlay');
        });
    });

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
let allInfoPageBtns = [deliveryBtn, instructionBtn, certificatesBtn, warrantyBtn];
let allInfoPageSections = [delivery, instruction, certificates, warranty, about];

/* New insctance of Tab swither Class */
let informationPageTabs = new TabContentAccordion(allInfoPageBtns, allInfoPageSections);

/* Calling switch methods on click event */
deliveryBtn &&
    deliveryBtn.addEventListener('click', () => {
        informationPageTabs.toggleSections(delivery);
        informationPageTabs.toggleButtonIcons(deliveryBtn);
    });

warrantyBtn &&
    warrantyBtn.addEventListener('click', () => {
        informationPageTabs.toggleSections(warranty);
        informationPageTabs.toggleButtonIcons(warrantyBtn);
    });

certificatesBtn &&
    certificatesBtn.addEventListener('click', () => {
        informationPageTabs.toggleSections(certificates);
        informationPageTabs.toggleButtonIcons(certificatesBtn);
    });

instructionBtn &&
    instructionBtn.addEventListener('click', () => {
        informationPageTabs.toggleSections(instruction);
        informationPageTabs.toggleButtonIcons(instructionBtn);
    });

/************** Comparision Page Toggle Buttons and Content **********/

/* List of all Buttons and Sections to switch */
let allComparisionPageBtns = [infoBtn, differenceBtn];
let allComparisionPageSections = [infoContent, differenceContent];

/* New insctance of Tab swither Class */
let comparisionPageTabs = new TabContentAccordion(allComparisionPageBtns, allComparisionPageSections);

infoBtn &&
    infoBtn.addEventListener('click', () => {
        comparisionPageTabs.toggleButtonIcons(infoBtn);
        comparisionPageTabs.toggleSections(infoContent);
    });

differenceBtn &&
    differenceBtn.addEventListener('click', () => {
        comparisionPageTabs.toggleButtonIcons(differenceBtn);
        comparisionPageTabs.toggleSections(differenceContent);
    });

/******************* Mobile Hamburger menu manipulation *****************/

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu-modal_active');
    mobileMenuOverlay.classList.toggle('mobile-menu-overlay_active');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('mobile-menu-modal_active');
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

            if (card === recieveMethodCard[1]) {
                reciveMethodWrapper.classList.add('receive-wrapper__optional_active');

                document.querySelector('.optional-payment-form-wrapper').classList =
                    'optional-payment-form-wrapper_active';
                document.querySelector('.payment-form-wrapper_active').classList = 'payment-form-wrapper';

                document.querySelector('.optional-assembly').classList = 'row optional-assembly_active';
            } else {
                reciveMethodWrapper.classList.remove('receive-wrapper__optional_active');

                document.querySelector('.optional-payment-form-wrapper_active').classList =
                    'optional-payment-form-wrapper';
                document.querySelector('.payment-form-wrapper').classList = 'payment-form-wrapper_active';

                document.querySelector('.optional-assembly_active').classList = 'row optional-assembly';
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
/*look for any elements with the class "custom-select":*/
select = document.getElementsByClassName('custom-select');
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
    y = document.getElementsByClassName('custom-select');
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
