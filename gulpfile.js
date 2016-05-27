/**************************************************************************
 * Copyleft joserprieto - Some Rights Reserved
 *
 * joserprieto
 *
 *
 * @file        gulpfile.js
 * @author      joserprieto
 * @date        24/05/16 20:18
 * @project     Arte et Marte Layout
 * @projectCode AEM-LYT
 * @site        http://preview.arteetmarte.org
 * @repo        git@bitbucket.org:joserprieto-team/aem-lyt.git
 *
 * @type        javascript
 */

/**
 * Based on various excellent tutorials:
 * @see https://www.mikestreety.co.uk/blog/advanced-gulp-file
 * @see https://markgoodyear.com/2014/01/getting-started-with-gulp/
 * @see
 * @see
 */


// Plugins:
/**
 * Plugins:
 * -------
 */

var gulp = require('gulp'),
    eventStream = require('event-stream'),
    gutil = require('gulp-util'),
    plugins = require("gulp-load-plugins")({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    });

/**
 * Development Variables and Functions:
 * -----------------------------------
 */
// Development Variables and Functions:

// Allows gulp --env dev or gulp --env prod to be run for a more verbose output
gutil.log('Init gulpfile.js; the defined enviroment is (remember, use gulp --env {option}): ' + gutil.env.env );
var isProduction = (gutil.env.env === 'prod')?true:false;
var sassStyle           = isProduction ? 'compressed': 'expanded',
    useSourceMap        = isProduction?false:true,
    autoprefixOptions   =
        [
            'last 2 version',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ],
    imageMinOptions     =
        {
            optimizationLevel   :   3,
            progressive         :   true,
            interlaced          :   true
        };

// changeEvent function - something which gets fired whenever a file changes.
// This outputs what file it was and what happened to it
var changeEvent = function(evt) {
    gutil.log(
        'File',
        gutil.colors.cyan(
            evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')
        ),
        'was',
        gutil.colors.magenta(evt.type)
    );
};

// File paths

var basePaths =
    {
        html:
        {
            src     : 'src/static/',
            dest    : 'web/'
        },
        assets:
        {
            src     : 'src/static/assets/',
            dest    : 'web/assets/',
            bower   : 'bower_components/',
            node    : 'node_modules/'
        }
    },
    paths =
    {
        html:
        {
            src     : basePaths.html.src,
            dest    : basePaths.html.dest
        },
        images:
        {
            src     : basePaths.assets.src + 'img/',
            dest    : basePaths.assets.dest + 'img/'
        },
        jSscripts:
        {
            src     : basePaths.assets.src + 'js/',
            dest    : basePaths.assets.dest + 'js/'
        },
        sassStyles:
        {
            src     : basePaths.assets.src + 'sass/',
            dest    : basePaths.assets.dest + 'css/'
        },
        cssStyles:
        {
            src     : basePaths.assets.src + 'css/',
            dest    : basePaths.assets.dest + 'css/'
        }
    },
    appFiles =
    {
        html        : paths.html.src  + '**/*.+(html|htm)',
        sassStyles  : paths.sassStyles.src + '**/*.+(scss|sass)',
        cssStyles   : paths.cssStyles.src + '**/*.css',
        jSscripts   :
            [
                paths.jSscripts.src + '**/*.js'
            ]
    },
    // Materialize:
    jsMaterialize =
            basePaths.assets.bower + 'Materialize/dist/js' +
                (isProduction?'materialize.min.js':'materialize.js'),
    // jQuery:
    jsJQuery =
        basePaths.assets.bower + 'jquery/dist/' +
            (isProduction?'jquery.min.js':'jquery.js'),
    // vendor files:
    vendorFiles =
    {
        cssStyles:
            [

            ],
        jSscripts:
            [
                jsMaterialize,
                jsJQuery
            ]
    };

// Variables dependent of --dev

var cssDestFileName     = isProduction?'styles.min.css':'styles.css',
    cssSassDestFileName = isProduction?'sass-styles.min.css':'sass-styles.css',
    jsFDestFileName     = isProduction?'js.min.js':'js.js';


/**
 * Clean Tasks:
 * ---------
 */

/**
 * @task        clean-dest
 * @description clean the html and assets files of destiny paths
 */
gulp.task('clean-dest', function() {
    var clean   = plugins.rimraf,
        gulpif  = plugins.if,
        debug   = plugins.debug;
    // Clean files on destiny:
    gulp.src(
            [
                paths.html.dest + '/**/*.+(html|htm)',  // HTML files
                paths.jSscripts.dest + '/**/*.*',       // jS Files
                paths.cssStyles.dest + '/**/*.*',       // CSS Files
                paths.images.dest + '/**/*.*',          // Image Files
                basePaths.assets.dest + '/ico/**/*.*',  // ICO Files
                basePaths.assets.dest + '/font/**/*.*'  // Font Files
            ],
            {
                read: false
            }
        )
        .pipe(gulpif(!isProduction, debug({title: 'clean-dest:'})))
        .pipe(
            clean(
                {
                    force: true
                }
            )
        );
})

/**
 * Copy plain files Tasks:
 * -----------------------
 */

/**
 * @task        copy-plain-assets
 * @description copy assets files that don't need any operation
 */
gulp.task('copy-plain-assets', function() {
    var gulpif  = plugins.if,
        debug   = plugins.debug;
    // copy any assets files in source path to public path (web root)
    gulp.src(
            [
                basePaths.assets.src + '/ico/**/*',                     // ICO Files
                basePaths.assets.src + '/font/**/*'                     // Font Files
            ]
        )
        .pipe(gulpif(!isProduction, debug({title: 'copy-play-assets:'})))
        .pipe(
            gulp.dest(basePaths.assets.dest)
        );
});

/**
 * @task        copy-plain-html
 * @description copy html files that don't need any operation
 */
gulp.task('copy-plain-html', function() {
    var gulpif  = plugins.if,
        debug   = plugins.debug;
    // copy any html files in source path to public path (web root)
    gulp.src(
            [
                appFiles.html
            ]
        )
        .pipe(gulpif(!isProduction, debug({title: 'copy-plain-html:'})))
        .pipe(
            gulp.dest(paths.html.dest)
        );
});

/**
 * Image tasks:
 * ------------
 */

/**
 * @task        copy-images
 * @description copy image files and minimice these files
 */
gulp.task('copy-images', function() {
    var imagemin    = plugins.imagemin,
        gulpif      = plugins.if,
        debug       = plugins.debug;
    // copy any img files in source path to public path (web root)
    gulp.src(
            [
                basePaths.assets.src + '/**/*.+(jpg|jpeg|gif|png|svg)'  // Image Files
            ]
        )
        .pipe(gulpif(!isProduction, debug({title: 'copy-images:'})))
        .pipe(
            imagemin(imageMinOptions)
        )
        .pipe(
            gulp.dest(basePaths.assets.dest)
        );
});

/**
 * jS Tasks:
 * ---------
 */

/**
 * @task        jshint
 * @description Lint our javascript (check for errors) using jshint and we’ll also set it up to run this task
 * each time we save a javascript file
 */
gulp.task('jshint', function() {
    var jshint  = plugins.jshint,
        gulpif  = plugins.if,
        debug   = plugins.debug;

    return gulp.src(appFiles.jSscripts)
        .pipe(gulpif(!isProduction, debug({title: 'jshint:'})))
        .pipe(jshint())
        .pipe(jshint.reporter('jshinTaskt-stylish'));
});

/**
 * @task        build-js
 * @description task to concat all jS needed for our web app, and, run it through uglify also to get
 * a much smaller filesize.
 */
gulp.task('build-js', function() {
    var sourcemaps  = plugins.sourcemaps,
        concat      = plugins.concat,
        gulpif      = plugins.if,
        uglify      = plugins.uglify,
        debug       = plugins.debug,
        jsSources   = new Array();

    jsSources = vendorFiles.jSscripts.concat(appFiles.jSscripts);
    gulp.src(jsSources)
        .pipe(gulpif(!isProduction, debug({title: 'build-js:'})))
        .pipe(gulpif(!isProduction, sourcemaps.init()))  // Process the original sources
        .pipe(concat(jsFDestFileName))
        //only uglify if gulp is ran with '--env prod'
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulpif(!isProduction, sourcemaps.write())) // Add the map to modified source
        .pipe(gulp.dest(paths.jSscripts.dest));
});


/**
 * CSS Tasks:
 * ---------
 */

/**
 * @task        build-css
 * @description Concatenate css files and copy to the web directory
 */
gulp.task('build-css', function() {
    var sourcemaps          = plugins.sourcemaps,
        concat              = plugins.concat,
        gulpif              = plugins.if,
        autoprefixer        = plugins.autoprefixer,
        size                = plugins.size,
        debug               = plugins.debug,
        sass                = plugins.sass,
        combineMediaQueries = plugins.combineMediaQueries,
        notify              = plugins.notify,
        cssmin              = plugins.cssmin,
        cssSources          = appFiles.cssStyles.concat(vendorFiles.cssStyles),
        sassSources         = appFiles.sassStyles,
        sassResult;



    sassResult = gulp.src(sassSources)
                    .pipe(gulpif(!isProduction, debug({title: 'build-css; building sass:'})))
                    .pipe(gulpif(!isProduction, sourcemaps.init()))  // Process the original sources
                    .pipe(
                        sass({ style: sassStyle})
                            .on('error', sass.logError)
                    )
                    .pipe(gulpif(!isProduction, sourcemaps.write())) // Add the map to modified source
                    .pipe(autoprefixer(autoprefixOptions))
                    .pipe(notify({ message: 'Sass build complete' }));

    return eventStream.concat(gulp.src(cssSources), sassResult)
        .pipe(gulpif(!isProduction, debug({title: 'build-css; building css:'})))
        .pipe(concat(cssDestFileName))
        .pipe(autoprefixer(autoprefixOptions))
        .pipe(
            gulpif(isProduction,
                    combineMediaQueries({
                        log: true
                    })
            )
        )
        .pipe(gulpif(isProduction, cssmin()))
        .pipe(size())
        .pipe(gulp.dest(paths.cssStyles.dest));

});

/**
 * @task        build-sass
 * @description Build sass files and concatenate with another css files
 * @note        this task is only for dev / testing purpose; the build-css task build SASS files and concatenate the
 *              result with the css files needed
 */
gulp.task('build-sass', function() {
    var sass            = plugins.sass,
        sourcemaps      = plugins.sourcemaps,
        autoprefixer    = plugins.autoprefixer,
        concat          = plugins.concat,
        debug           = plugins.debug,
        notify          = plugins.notify,
        rename          = plugins.rename,
        gulpif          = plugins.if;

    gulp.src(appFiles.sassStyles)
        .pipe(gulpif(!isProduction, debug({title: 'build-sass:'})))
        .pipe(gulpif(!isProduction, sourcemaps.init()))  // Process the original sources
        .pipe(sass({ style: sassStyle}).on('error', sass.logError))
        .pipe(gulpif(!isProduction, sourcemaps.write())) // Add the map to modified source
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({
            dirname: '',
            basename: 'sass-style',
            extname: ".css"
        }))
        .pipe(gulp.dest(paths.sassStyles.dest))
        .pipe(notify({ message: 'Scripts task complete' }));
});

/**
 * Watch Tasks:
 * ---------
 */

/**
 * @task        watch
 * @description configure which files to watch and what tasks to use on file changes
 */
gulp.task('watch', function() {
    gulp.watch(appFiles.jSscripts, ['jshint']);
    gulp.watch(appFiles.html, ['copy-plain-html']);
    gulp.watch(
        [
            basePaths.assets.src + '/ico/**/*',                     // ICO Files
            basePaths.assets.src + '/font/**/*'                     // Font Files
        ],
        ['copy-plain-assets']);
    gulp.watch(
        [
            basePaths.assets.src + '/**/*.+(jpg|jpeg|gif|png|svg)'  // Image Files
        ],
        ['copy-images']);
    gulp.watch(appFiles.cssStyles, ['build-css']);
    gulp.watch(appFiles.sassStyles, ['build-css']);
    gulp.watch(appFiles.jSscripts, ['build-js']);

});

/**
 * Default Tasks:
 * ---------
 */

/**
 * @task        default
 * @description define the default task and add the watch task to it, and the other task, before
 */
gulp.task('default', ['clean-dest',
                      'copy-plain-assets',
                      'copy-plain-html',
                      'copy-images',
                      'build-css',
                      'build-js',
                      'watch']);