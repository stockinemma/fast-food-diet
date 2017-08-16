const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');

gulp.task("styles", () => {
    return gulp.src("./dev/styles/**/*.scss")//instide styles folder, ,any folder thats in there and any file that ends in scss, deal with it
    .pipe(sass().on("error",sass.logError))
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat("style.css"))
    .pipe(plumber())
    .pipe(gulp.dest("./public/styles"))
    .pipe(reload({stream: true}));
});

gulp.task('js', () => {
    browserify('dev/scripts/app.js')
        .transform('babelify', {
            presets: ['es2015','react']
        })
        .bundle()
        .on('error',notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 💀'
        }))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(plumber())
        .pipe(gulp.dest('public/scripts'))
        .pipe(reload({stream:true}));
});

const historyApiFallback = require('connect-history-api-fallback');

gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        },
        middleware: [historyApiFallback()] // <-- add this line
    });
});

gulp.task('default', ['styles','js','bs'], () => {
    gulp.watch('./dev/scripts/*.js', ['js']);
    gulp.watch('./dev/styles/*.scss', ['styles']);
    gulp.watch('./*.html', reload);
});