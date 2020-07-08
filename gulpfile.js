const { watch, series, parallel, src, dest } = require('gulp');
const log = require('fancy-log');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssNano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const groupMQ = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const del = require('del');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');

const cssNanoConfig = {
    discardComments: { removeAll: true },
    autoprefixer: false,
};

/*** Minifiying Images */  
function minifyImages() {
    return src('src/img/**/*')
        // .pipe(
        //     imagemin([
        //         imagemin.gifsicle({ interlaced: true }),
        //         imagemin.mozjpeg({ quality: 75, progressive: true }),
        //         imagemin.optipng({ optimizationLevel: 5 }),
        //         imagemin.svgo({
        //             plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        //         }),
        //     ])
        // )
        .pipe(dest('dist/img'));
}

function copyFonts() {
    return src('./src/fonts/**/*.*').pipe(dest('dist/fonts'));
}

function compileBootstrap() {
    return src('./node_modules/bootstrap/scss/bootstrap.scss', { allowEmpty: true })
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(groupMQ())
        .pipe(cssNano(cssNanoConfig))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./node_modules/bootstrap/dist/css'));
}

function concatCSSLibs() {
    return src(
        [
            './node_modules/nouislider/distribute/nouislider.min.css',
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
            './node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
            './node_modules/flatpickr/dist/flatpickr.min.css',
        ],
        { allowEmpty: true }
    )
        .pipe(concat('libs.min.css'))
        .pipe(cssNano(cssNanoConfig))
        .pipe(dest('dist/css'));
}

/*
 * JS processing
 */
function concatJSLibs() {
    return src([
        './node_modules/nouislider/distribute/nouislider.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/owl.carousel/dist/owl.carousel.min.js',
        './node_modules/flatpickr/dist/flatpickr.min.js',
        './node_modules/flatpickr/dist/l10n/ru.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

function compileSASS() {
    return src(['./src/sass/**/*.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(groupMQ())
        .pipe(cssNano(cssNanoConfig))
        .pipe(sourcemaps.write('maps'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream({ once: true }));
}

function concatJs() {
    return src(['./src/js/*.*'])
        .pipe(terser())
        .pipe(concat('theme.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream({ once: true }));
}

/**
 * Html processing
 */
function compileHtml() {
    return src('./src/**/*.html')
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@root',
                context: ['test1', 'test2', 'test3']
            })
        )
        .pipe(dest('./dist/'))
        .pipe(browserSync.stream({ once: true }));
}

function serve() {
    browserSync.init({
        files: ['dist/**/*.html'],
        port: 4000,
        open: false,
        server: {
            baseDir: 'dist',
        },
        notify: false,
    });
}

function watchALL() {
    watch('src/sass/**/*.sass', compileSASS);
    watch('src/**/*.sass', compileSASS);
    watch('src/components/**/*.sass', compileSASS);
    watch('src/img/**/*.*');
    watch('src/**/**/*.html', compileHtml);
    watch('src/**/*.html', compileHtml);
    watch('src/*.html', compileHtml);
    watch('src/js/*.js', concatJs);
}

function clearDist() {
    return del.sync('dist');
}

/*
 * Public tasks
 */
const defaultTasks = parallel(
    series(
        parallel(
            series(concatCSSLibs, compileBootstrap),
            compileSASS,
            concatJSLibs,
            compileHtml,
            copyFonts,
            concatJs,
            minifyImages
        ),
        serve
    ),
    watchALL
);

exports.default = defaultTasks;
