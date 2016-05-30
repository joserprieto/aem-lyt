/**
 * init.js script
 */
$(document).ready(function() {
    /**
     * Init menu button collapse:
     */
    $('.button-collapse').sideNav({
        menuWidth: '50%', // Default is 240
        edge: 'left' // Choose the horizontal origin
    });
    /**
     * Init parallax sections:
     */
    $('.parallax').parallax();

    /**
     * Init top slider:
     */

    var arteEtMarteHomeTopBannerSlider =
        $('.home.top-carousel.slider').arteEtMarteSlider(
            {
                full_width              : true,
                indicatorsOverSlides    : true,
                height                  : 576
            }
        );
    console.log(arteEtMarteHomeTopBannerSlider);
    console.log(arteEtMarteHomeTopBannerSlider.methods);
    //arteEtMarteHomeTopBannerSlider.trigger('sliderPause');



//        },
//        pause : function() {
//        $(this).trigger('sliderPause');
//    },
//    start : function() {
//        $(this).trigger('sliderStart');
//    },
//    next : function() {
//        $(this).trigger('sliderNext');
//    },
//    prev : function() {
//        $(this).trigger('sliderPrev');
//    }
//};
    $(window)
        .on({
            resize: function() {
                var width = window.width,
                    height = window.height,
                    topBanner = $('.home.top-carousel.slider');
                //if (width >= )
                console.log('resized!');
            }
        });

    <!-- Initialize Swiper -->
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        effect: 'fade'
    });

    /*
     <div class="home top-carousel slider" style="height: 618px; touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
     <ul class="home slides" style="height: 578px;">
     <li class="velocity-animating active" style="opacity: 0.991917; transform: translateX(0px) translateY(0px);">
     <img src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" style="background-image: url(&quot;/assets/img/home-carousel-1.jpg&quot;);">
     </li>
     <li class="velocity-animating" style="opacity: 0.00808256; transform: translateX(0px) translateY(0px);">
     <img src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" style="background-image: url(&quot;/assets/img/home-carousel-2.jpg&quot;);">
     </li>
     </ul>
     <ul class="indicators">
     <li class="indicator-item active"></li>
     <li class="indicator-item"></li>
     </ul>
     </div>

     */
    //var swiper = new Swiper('.swiper-container', {
    //    direction: 'horizontal',
    //    loop: true,
    //    // If we need paginationi
    //    pagination: '.swiper-pagination',
    //    // Navigation arrows
    //    nextButton: '.swiper-button-next',
    //    prevButton: '.swiper-button-prev',
    //    // And if we need scrollbar
    //    scrollbar: '.swiper-scrollbar',
    //});

    //$(".home.top-banner.owl-carousel").owlCarousel({
    //    loop        : true,
    //    margin      : 0,
    //    nav         : true,
    //    autoHeight  : true,
    //    lazyLoad    : true,
    //    items       : 1
    //});
});// end of document ready
/**
 * /init.js
 */