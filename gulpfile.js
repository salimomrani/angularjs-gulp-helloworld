const gulp = require('gulp');
const concat = require('gulp-concat');
// const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var rev_collect = require('gulp-rev-collector');
const browserSync = require('browser-sync').create();
var assetManifest = require('gulp-asset-manifest');

var gutil           = require('gulp-util');
var rimraf          = require('rimraf');
var revOutdated     = require('gulp-rev-outdated');
var path            = require('path');
var through         = require('through2');

var runSequence = require('run-sequence');

const scripts = require('./scripts');
const styles = require('./styles');

// Some pointless comments for our project.

var devMode = false;


function cleaner() {
    return through.obj(function(file, enc, cb){
        rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}

gulp.task('clean', function() {
    gulp.src( ['dist/**/*.*'], {read: false})
        .pipe( revOutdated(1) ) // leave 1 latest asset file for every file name prefix.
        .pipe( cleaner() );
});



gulp.task('css', ['clean'] , function() {
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./src/rev/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', ['clean'],function() {
    gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./src/rev/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src(['./src/rev/**/*.json','./src/templates/**/*.html'])
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
        ['clean'],
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
    gulp.watch(['./src/rev/**/*.*'], ['html']);
});
