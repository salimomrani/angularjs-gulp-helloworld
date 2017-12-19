const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var rev_collect = require('gulp-rev-collector');
var cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

var revDel = require('gulp-rev-del-redundant');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var del = require('del');
var purify = require('gulp-purifycss');
var gzip = require('gulp-gzip');
var clone = require('gulp-clone');

const scripts = require('./scripts');
const styles = require('./styles');

var uncss = require('gulp-uncss');
// Some pointless comments for our project.

var devMode = false;


// Clean output directory
gulp.task('clean', del.bind(
    null, ['.tmp', 'dist' + '*'], {
        dot: true
    }
));

gulp.task('css' , function() {


    vendorcss =gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(rev())
        .pipe(uncss({
            html: ['./dist/js/*.js', './dist/**/*.html']
        }))
        .pipe(purify(['./dist/js/*.js', './dist/**/*.html']))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));


    vendorcss.pipe(clone())
        .pipe(gzip())
        .pipe(gulp.dest('dist/css'));

});

gulp.task('js',function() {
    vendorjs =gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(revDel({ dest: 'dist/js' }))
        .pipe(gulp.dest('./src/rev/js'))
        .pipe(browserSync.reload({
            stream: true
        }));

    vendorjs.pipe(clone())
        .pipe(gzip())
        .pipe(gulp.dest('dist/js'));
});


gulp.task('html', function() {
    return gulp.src(['./src/rev/**/*.json','./src/templates/**/**/*.html'])
        .pipe( rev_collect({
            replaceReved: true,
            dirReplacements: {
                'css': 'css',
                'js': 'js'
            }
        }) )
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('htmlheader', function() {
    return gulp.src(['./src/rev/**/*.json','./src/templates/index.html'])
        .pipe( rev_collect({
            replaceReved: true,
            dirReplacements: {
                'css': 'css',
                'js': 'js'
            }
        }) )
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build', function(done) {
    runSequence(
        ['css'],
        ['js'],
        ['htmlheader'],
        ['html'],
    done);
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('start',  function() {
    devMode = true;

    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./src/css/**/*.css'], ['css']);
    gulp.watch(['./src/js/**/*.js'], ['js']);
    gulp.watch(['./src/rev/**/*.*'],['htmlheader']);
    gulp.watch(['./src/templates/views/**/*.*'],['html']);
});
