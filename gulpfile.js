var gulp       = require('gulp')
    watch      = require('gulp-watch'),
    sass       = require('gulp-sass'),
    coffee     = require('gulp-coffee'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

var sassPaths = [
    'node_modules',
    'node_modules/bootstrap-sass/assets/stylesheets'
];

var beSassy = function() {
    console.log('Being Sassy');

    gulp.src(['./scss/lab.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', includePaths: sassPaths}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/css'));
}

var makeCoffee = function() {
    console.log('Making coffee');

    gulp.src('coffee/*.coffee')
        .pipe(coffee())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js'));
}

gulp.task('compile', function(){
    beSassy();
    makeCoffee();
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
