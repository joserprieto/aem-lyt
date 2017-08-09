/**
 * Gulp task to run the web server and live reload the changes in browser
 *
 * @usage
 *   $ gulp webserver --gulpfile livereload-server-gulpfile.js
 */

var gulp   = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('webserver', function() {
    gulp.src('./web')
        .pipe(server({
            livereload:       true,
            directoryListing: true,
            open:             true,
            log:              'debug',
            clientConsole:    true
        }));
});