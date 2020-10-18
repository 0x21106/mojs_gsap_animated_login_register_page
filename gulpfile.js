const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-minify')
const browserSync = require('browser-sync')

function HTML() {
    return gulp.src(`${__dirname}/app/index.html`)
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream())
}

function SASS() {
    return gulp.src(`${__dirname}/app/assets/*.scss`)
        .pipe(sass())
        .pipe(gulp.dest('./dist/assets/'))
        .pipe(browserSync.stream())
}

function JS() {
    return gulp.src(`${__dirname}/app/assets/*.js`)
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/'))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    })
    gulp.watch('./app/index.html', HTML)
    gulp.watch('./app/assets/*.scss', SASS)
    gulp.watch('./app/assets/*.js', JS)
}

exports.watch = watch