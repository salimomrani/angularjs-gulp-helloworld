const gulp = require('gulp');
const concat = require('gulp-concat');
// const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var rev_collect = require('gulp-rev-collector');
const browserSync = require('browser-sync').create();

var revDel = require('gulp-rev-del-redundant');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var del = require('del');

const scripts = require('./scripts');
const styles = require('./styles');

// Some pointless comments for our project.

var devMode = false;


// Clean output directory
gulp.task('clean', del.bind(
    null, ['.tmp', 'dist' + '*'], {
        dot: true
    }
));

gulp.task('css' , function() {
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(revDel({ dest: 'dist/css' }))
        .pipe(gulp.dest('./src/rev/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js',function() {
    gulp.src(scripts)
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
