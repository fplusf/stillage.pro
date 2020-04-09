const searchForm = document.getElementById('searchForm'),
    searchBtn = document.querySelector('.top-bar__search-btn'),
    searchClose = document.querySelector('.search-box__close');

searchBtn.addEventListener('click', function () {
    searchForm.style.maxWidth = '79%';
    searchForm.style.display = 'flex';
});

searchClose.addEventListener('click', () => {
    searchForm.style.maxWidth = '0';
    searchForm.style.display = 'none';
});
