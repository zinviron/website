var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync'),
    prefix      = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    cp          = require('child_process');

/**
 * Build the Jekyll Site
 */
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    var pl = process.platform === "win32" ? "jekyll.bat" : "jekyll";
    return cp.spawn(pl, ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Recompile SASS
gulp.task('sass', function(){
  return gulp.src('sass/import.sass')
    .pipe(sass())
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(rename('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream:true}));
});

// Recompile HTML
gulp.task('pug-layout', function buildHTML() {
  return gulp.src('pug/layout/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('_layouts'));
});

gulp.task('pug-include', function buildHTML() {
  return gulp.src('pug/include/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('_includes'));
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'pug-layout', 'pug-include', 'jekyll-rebuild'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});

// Watch Task
gulp.task('watch', function() {
  gulp.watch('sass/**', ['sass']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*'], ['jekyll-rebuild']);
  gulp.watch('pug/**/*.pug', ['pug-layout', 'pug-include']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);