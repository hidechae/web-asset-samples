import gulp from 'gulp'
import rimraf from 'rimraf';
import postcss from 'gulp-postcss';
import {cssProcessors} from '../settings.js';

let rootDir = './src/css';
let watchTarget = rootDir + '/**/*.scss';
let src = rootDir + '/main.scss';
let dist = './dist/css';

gulp.task('css:build', ['css:clean'], () => {
  return gulp.src(src)
    .pipe(postcss(cssProcessors))
    .pipe(gulp.dest(dist))
});

gulp.task('css:clean', (cb) => {
  rimraf(dist, cb);
});

gulp.task('css:watch', () => {
  gulp.watch(watchTarget, ['css:build']);
});
