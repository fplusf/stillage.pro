const searchForm = document.getElementById('searchForm'),
    searchBtn = document.querySelector('.top-bar__search-btn'),
    searchClose = document.querySelector('.search-box__close');

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
 * Manipulate search box.
 */
