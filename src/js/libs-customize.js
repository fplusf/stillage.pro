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