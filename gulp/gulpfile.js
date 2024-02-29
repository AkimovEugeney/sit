const { src, dest, series, watch, parallel } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del')

function styles() {
  return src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(concat('style.min.css'))
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function stylesProd() {
  return src('app/scss/**/*.scss')
    .pipe(concat('style.min.css'))
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('dist/css'))
}

function clean() {
  return del(['dist'])
}

function resourses() {
  return src('app/resourses/**').pipe(dest('dist'));
}

function htmlMinify() {
  return src('app/**/*.html')
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(['app/js/componets/**/*.js', 'app/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

function scriptsProd() {
  return src(['app/js/componets/**/*.js', 'app/js/main.js'])
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(concat('main.min.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('dist/js'))
}

function svgSprites() {
  return src('app/images/svg/**/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('dist/images'));
}

function images() {
  return src([
    'app/images/**/*.jpg',
    'app/images/**/*.jpeg',
    'app/images/**/*.png',
    'app/images/*.svg',
  ])
    .pipe(image())
    .pipe(dest('dist/images'));
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: 'dist/',
    },
  });
}

watch('app/**/*.html', htmlMinify);
watch('app/scss/**/*.scss', styles);
watch('app/js/**/*.js', scripts);
watch('app/images/svg/**/*.svg', svgSprites);
watch('app/resourses/**', resourses);

exports.htmlMinify = htmlMinify();
exports.scripts = scripts();
exports.styles = styles();
exports.default = series(clean,
  parallel(resourses, htmlMinify, styles, scripts, images, svgSprites),
  watchFiles
);

exports.prod = series(clean,
  parallel(htmlMinify, stylesProd, scriptsProd, images, svgSprites),
  watchFiles
);
