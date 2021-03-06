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
        var timeBetweenSlides, // time between slides, in seconds
            timeElapsed,// time transcurred, in ms
            timeBetweenIntervals,// time between interval calls, in ms
            previousTime,
            nowTime,
            progressBar,
            bar,
            elem,
            isPause,
            tick,
            percentTime,
            homeTopSwiperBanner;
        //Init the carousel
        homeTopSwiperBanner =
            new Swiper(
                '.home.top-carousel.swiper-container',
                {
                    pagination: '.home.top-carousel.swiper-pagination',
                    nextButton: '.home.top-carousel.swiper-button-next',
                    prevButton: '.home.top-carousel.swiper-button-prev',
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
        function initProgressBar(){
            //reset timer
            timeBetweenSlides = 8;
            timeElapsed = 0;
            timeBetweenIntervals = 10;
            isPause = false;
            elem = $('.home.top-carousel.swiper-container');

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
            timeElapsed = 0;
            isPause = false;
            // get the "now" time:
            nowTime = new Date();
            previousTime = nowTime;
            //run interval every "timeBetweenIntervals" miliseconds
            tick = setInterval(interval, timeBetweenIntervals);
        };
        function interval() {
            if(isPause === false){
                var diffTime,
                    msBetweenSlides;
                msBetweenSlides = timeBetweenSlides * 1000;
                nowTime = new Date();
                diffTime = nowTime - previousTime;
                previousTime = nowTime;
                timeElapsed += diffTime;
                percentTime = (timeElapsed / msBetweenSlides) * 100;
                bar.css({
                    width: percentTime+"%"
                });
                // if timeElapsed is equal or greater than timeBetweenSlides (msBetweenSlides)
                if (timeElapsed >= msBetweenSlides) {
                    stopInterval();
                }
            }
        }
        function stopInterval() {
            //clear interval
            clearTimeout(tick);
            //slide to next item
            homeTopSwiperBanner.slideNext();
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
            //start again
            start();
        }

        /**
         * Owl Carousel of Groups:
         */
        $('.home.groups-carousel.owl-carousel').owlCarousel({
            loop:true,
            margin:15,
            nav:false,
            dot: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },
                1000:{
                    items:4
                },
                1200:{
                    items:5
                }
            }
        })
    }


});// end of document ready
/**
 * /init.js
 */