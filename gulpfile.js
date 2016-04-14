var gulp = require('gulp');
var $ = require('gulp-load-plugins')({DEBUG: true}),
    browserSync = require('browser-sync'),
    pngcrush = require('imagemin-pngcrush');

gulp.task('sass', function() {
  return gulp.src('src/scss/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
      }))
    .pipe(gulp.dest('public/assets/css'))
});

gulp.task('images', function() {
  gulp.src('src/images/**/*.*')
  .pipe($.cache($.imagemin({
    progressive: true,
    svgoplugins: [{removeViewBox: false}],
    use: [pngcrush()]
  })))
  .pipe(gulp.dest('public/assets/images'))
});

 gulp.task('browserSync', ['sass'], function() {
  browserSync({
    port: 8000,
    ui: {
      port: 8080
    },
    proxy: "192.168.33.10"
  });
});

gulp.task('default', ['sass','images','browserSync'], function() {
  gulp.watch(['src/scss/**/*.scss'], ['sass', browserSync.reload]);
  gulp.watch("craft/templates/**/*.html").on('change', browserSync.reload);
  gulp.watch(["src/images/**/*.*"], ['images', browserSync.reload]);

});