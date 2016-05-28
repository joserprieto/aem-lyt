/**
 * init.js script
 */
(function($) {
    $(function() {

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
        $('.slider')
        .slider(
            {
                full_width: true,
                height: 650,
                indicators: false,
                transition: 500,
                interval: 8000
            }
        );// /init top slider

    }); // end of document ready
})(jQuery); // end of jQuery name space
/**
 * /init.js
 */