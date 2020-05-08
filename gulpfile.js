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
const imagemin = require('gulp-imagemin');
const terser = require('gulp-terser');
// const ts = require('gulp-typescript'),
//     tsProject = ts.createProject('tsconfig.json');

const cssNanoConfig = {
    discardComments: { removeAll: true },
    autoprefixer: false,
};

/*
 * Public tasks
 */
function compressImg() {
    return src('src/img/**/*').pipe(imagemin()).pipe(dest('dist/img'));
}

function copyFonts() {
    return src('./src/fonts/**/*.*').pipe(dest('dist/fonts'));
}

function concatCSSLibs() {
    return src(
        [
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/magnific-popup/dist/magnific-popup.css',
            './node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
            './node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
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
        './node_modules/jquery/dist/jquery.js',
        './node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
        './node_modules/owl.carousel/dist/owl.carousel.min.js'
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
        .pipe(browserSync.reload({ stream: true }));
}

function concatJs() {
    return src(['./src/js/*.*'])
        .pipe(terser())
        .pipe(concat('theme.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.reload({ stream: true }));
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
            })
        )
        .pipe(dest('./dist/'))
        .pipe(browserSync.reload({ stream: true }));
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
        parallel(series(concatCSSLibs), compileSASS, concatJSLibs, compileHtml, compressImg, copyFonts, concatJs),
        serve
    ),
    watchALL
);

exports.default = defaultTasks;
