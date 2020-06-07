/******************* Owl carousel setup. *****************/

$(document).ready(function () {
    function counter(event) {
        if (!event.namespace) {
            return;
        }

        let slides = event.relatedTarget;

        $('.slide-count').text(slides.relative(slides.current()) + 1 + '/' + slides.items().length);
    }

    $('.owl-index').owlCarousel({
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

    /////////////////////////////////////////////////////////

    $('.owl-action').owlCarousel({
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

    ///////////

    $('.owl-stillage-modal').owlCarousel({
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

    ///////////

    $('.owl-safe-modal').owlCarousel({
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

    /////////// Product Detail

    $('.owl-product-detail').owlCarousel({
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

/********** Date picker **********/
$('#datetimepicker').flatpickr({
    dateFormat: 'l, j F',
    time: 'false',
    locale: 'ru',
    disableMobile: 'true',
});



/********** Setting up all Price range sliders **********/
let sliders = document.querySelectorAll('.slider');

for (let i = 0; i < sliders.length; i++) {
    noUiSlider.create(sliders[i], {
        start: [60, 800],
        connect: true,
        range: {
            min: 0,
            max: 1000,
        },
        orientation: 'horizontal',
    });

    sliders[i].noUiSlider.on('slide', addValues);
}

function addValues() {
    let allValues = [];

    for (let i = 0; i < sliders.length; i++) {
        allValues.push(sliders[i].noUiSlider.get());
    }

    for (let j = 0; j < allValues.length; j++) {
        document.getElementsByClassName('price-range__value-low')[j].textContent = Math.round(allValues[j][0]);
        document.getElementsByClassName('price-range__value-up')[j].textContent = Math.round(allValues[j][1]);
    }
}
