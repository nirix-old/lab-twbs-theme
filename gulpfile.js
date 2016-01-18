var gulp       = require('gulp')
    watch      = require('gulp-watch'),
    sass       = require('gulp-sass'),
    coffee     = require('gulp-coffee'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    cssnano    = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps');

var sassPaths = [
    'node_modules',
    'node_modules/bootstrap-sass/assets/stylesheets'
];

var beSassy = function() {
    console.log('Being Sassy');

    gulp.src(['./scss/lab.scss'])
        .pipe(sass({includePaths: sassPaths}).on('error', sass.logError))
        .pipe(gulp.dest('assets/css'));
}

var makeCoffee = function() {
    console.log('Making coffee');

    gulp.src('coffee/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('assets/js'));
}

gulp.task('compile', function(){
    beSassy();
    makeCoffee();
});

gulp.task('compile-dist', function(){
    gulp.src(['scss/lab.scss'])
        .pipe(sass({includePaths: sassPaths}).on('error', sass.logError))
        .pipe(gulp.dest('assets/css'))
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/css'));

    gulp.src(['coffee/lab.coffee'])
        .pipe(coffee())
        .pipe(gulp.dest('assets/js'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js'));
});

// Watch for changes
gulp.task('watch', function(){
    watch('scss/**/*.scss', beSassy);
    watch('coffee/**/*.coffee', makeCoffee);
});

// Compile Sass
gulp.task('sass', beSassy);

// Compile CoffeeScript
gulp.task('coffee', makeCoffee);
