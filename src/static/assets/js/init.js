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
     * Init top slider Swiper:
     */

    if ($('body').hasClass('home')) {
        var time = 7, // time between slides, in seconds
            progressBar,
            bar,
            elem = $('.home.top-carousel.swiper-container'),
            isPause,
            tick,
            percentTime,
            homeTopSwiperBanner;
        //Init the carousel
        homeTopSwiperBanner =
            new Swiper(
                '.home.top-carousel.swiper-container',
                {
                    pagination: '.swiper-pagination',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    paginationClickable: true,
                    spaceBetween: 1,
                    centeredSlides: true,
                    loop: true,
                    // Disable preloading of all images
                    preloadImages: false,
                    // Enable lazy loading
                    lazyLoading: true,
                    onInit: initProgressBar,
                    onSlideChangeEnd: moved,
                    onTouchStart: pauseOnDragging,
                    onTouchEnd: continueAfterDragging
                }
            );
        //Init progressBar where elem is $("#owl-demo")
        function initProgressBar(){
            //elem = _elem;
            //build progress bar elements
            buildProgressBar();
            //start counting
            start();
        }
        //create div#progressBar and div#bar then prepend to $("#owl-demo")
        function buildProgressBar(){
            progressBar =
                $("<div>",
                    {
                        class:"home progressBar",
                    }
                );
            bar =
                $("<div>",
                    {
                        class:"home bar"
                    }
                );
            progressBar.append(bar).prependTo(elem);
        }
        function start() {
            //reset timer
            percentTime = 0;
            isPause = false;
            //run interval every 0.01 second
            tick = setInterval(interval, 10);
        };
        function interval() {
            if(isPause === false){
                percentTime += 1 / time;
                bar.css({
                    width: percentTime+"%"
                });
                //if percentTime is equal or greater than 100
                if(percentTime >= 100){
                    //slide to next item
                    homeTopSwiperBanner.slideNext();

                }
            }
        }
        //pause while dragging
        function pauseOnDragging(){
            isPause = true;
        }
        //continue after dragging
        function continueAfterDragging(){
            isPause = false;
        }
        //moved callback
        function moved(){
            //clear interval
            clearTimeout(tick);
            //start again
            start();
        }

    }


});// end of document ready
/**
 * /init.js
 */