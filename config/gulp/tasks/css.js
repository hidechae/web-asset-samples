import gulp             from 'gulp'
import rimraf           from 'rimraf';
import postcss          from 'gulp-postcss';
import cssImport        from 'postcss-import';
import cssNested        from 'postcss-nested';
import cssVars          from 'postcss-simple-vars';
import cssInlineComment from 'postcss-inline-comment';
import autoprefixer     from 'autoprefixer';
import cssnano          from 'cssnano';

let cssProcessors = [
  cssImport,
  cssNested,
  cssVars,
  cssInlineComment(),
  autoprefixer({browsers: ['last 1 version']}),
  cssnano()
];

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
