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
const ts = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json');

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

/**
 * CSS processing
 */
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
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
        ],
        { allowEmpty: true }
    )
        .pipe(concat('libs.min.css'))
        .pipe(cssNano(cssNanoConfig))
        .pipe(dest('dist/css'));
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

/*
 * JS processing
 */
function concatJSLibs() {
    return src(['./node_modules/jquery/dist/jquery.js'])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

function transpileTS() {
    return tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js.pipe(uglify())
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
    // watch('src/*.sass', compileSASS);
    watch('src/components/**/*.sass', compileSASS);
    watch('src/ts/**/*.ts', transpileTS);
    watch('src/**/**/*.html', compileHtml);
    watch('src/*.html', compileHtml);
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
            series(compileBootstrap, concatCSSLibs),
            compileSASS,
            concatJSLibs,
            transpileTS,
            compileHtml,
            compressImg
        ),
        serve
    ),
    watchALL
);

exports.default = defaultTasks;
