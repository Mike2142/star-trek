
var gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
var browserSync  = require('browser-sync');
var babel = require('gulp-babel');

gulp.task("babel", function(){
    return gulp.src("src/script/*.jsx").
        pipe(babel({
            plugins: ['transform-react-jsx']
        })).
        pipe(gulp.dest("build/script"));
});

gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
            baseDir: ".",
            index: "index.html"
        }
    });

    watch('src/script/*.jsx', parallel('babel'));
    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', parallel('browser-sync','babel', ));
gulp.task('default', parallel('watch'));
