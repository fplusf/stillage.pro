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

/******************* Range slider *****************/

if (window.location.pathname === '/actions/actions.html') {
    let slider = document.getElementById('slider');

    let nodes = [
        document.getElementsByClassName('price-range__value-low')[0],
        document.getElementsByClassName('price-range__value-up')[0],
    ];

    noUiSlider.create(slider, {
        start: [60, 800],
        connect: true,
        range: {
            min: 0,
            max: 1000,
        },
    });

    // Display the slider value

    slider.noUiSlider.on('update', function (values, handle) {
        nodes[handle].innerHTML = Math.round(values[handle]);
    });
}

/********** Setup Srednigruzovie page slider **********/
if (
    window.location.pathname === '/catalog/stillage-metalicheskoe/stillage-srednegruzovie/stillage-srednegruzovie.html'
) {
    /// Srednogruzovie setup
    let sliderSrednoGruzovie = document.getElementById('sliderSrednoGruzovie');

    let nodes = [
        document.getElementsByClassName('price-range__value-low')[0],
        document.getElementsByClassName('price-range__value-up')[0],
    ];

    noUiSlider.create(sliderSrednoGruzovie, {
        start: [60, 400],
        connect: true,
        range: {
            min: 0,
            max: 1000,
        },
    });

    // Display the slider value

    sliderSrednoGruzovie.noUiSlider.on('update', function (values, handle) {
        nodes[handle].innerHTML = Math.round(values[handle]);
    });
}

/********** Date picker **********/
$('#datetimepicker').flatpickr({
    dateFormat: 'l, j F',
    time: 'false',
    locale: 'ru',
    disableMobile: "true"
});
