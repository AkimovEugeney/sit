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
const del = require('del');
const gulpif = require('gulp-if');
const gulpIf = require('gulp-if');

let prod = false;

function isProd(done) {
  prod = true;
  done();
}

function styles() {
  return src('app/scss/**/*.scss')
    .pipe(gulpif(!prod, sourcemaps.init()))
    .pipe(concat('style.min.css'))
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(gulpif(prod, scss({ outputStyle: 'compressed' })))
    .pipe(gulpif(!prod, sourcemaps.write()))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function clean() {
  return del(['dist']);
}

function resourses() {
  return src('app/resourses/**').pipe(dest('dist'));
}

function htmlMinify() {
  return src('app/**/*.html')
    .pipe(
      gulpIf(
        prod,
        htmlMin({
          collapseWhitespace: true,
        })
      )
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(['app/js/componets/**/*.js', 'app/js/main.js'])
    .pipe(
      gulpIf(
        prod,
        babel({
          presets: ['@babel/env'],
        })
      )
    )
    .pipe(gulpif(!prod, sourcemaps.init()))
    .pipe(concat('main.min.js'))
    .pipe(gulpif(prod, uglify().on('error', notify.onError())))
    .pipe(gulpif(!prod, sourcemaps.write()))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
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
exports.default = series(
  clean,
  parallel(resourses, htmlMinify, styles, scripts, images, svgSprites),
  watchFiles
);

exports.build = series(
  clean,
  isProd,
  parallel(htmlMinify, styles, scripts, images, svgSprites)
);
