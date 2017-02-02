import gulp from 'gulp';
import postcss from 'gulp-postcss';
import styleguide from 'sc5-styleguide';
import {cssProcessors} from '../settings.js';

let cssRootDir = './src/css';
let jsRootDir = './src/js';
let cssRoot = cssRootDir + '/main.css';
let styleguideTarget = cssRootDir + '/components/*.css';
let styleVariables = cssRootDir + '/settings/variables.css';
let dist = 'dist-styleguide';
let imgSrc = './dist/img/**/*';
let imgDist = dist + '/img';
let jsSrc = './dist/js/**/*';
let jsDist = dist + '/js-dist';
let jsPath = '/js-dist/main.js';
let watchTarget = [cssRootDir + '/**/*.css', jsRootDir + '/**/*.js'];
let port = 3000;

gulp.task('styleguide:generate', () => {
  return gulp.src(styleguideTarget)
    .pipe(styleguide.generate({
      title: 'Styleguide for corporate site',
      server: true,
      rootPath: dist,
      overviewPath: 'README.md',
      styleVariables: styleVariables,
      enableJade: true,
      parsers: {css: 'postcss'},
      port: port,
      extraHead: [`<script src="${jsPath}"></script>`],
      disableEncapsulation: true // to allow javascript to access shadow DOM element
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('styleguide:applystyles', () => {
  return gulp.src(cssRoot)
    .pipe(postcss(cssProcessors))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(dist));
});

gulp.task('styleguide:image', () => {
  return gulp.src([imgSrc])
    .pipe(gulp.dest(imgDist))
});

gulp.task('styleguide:js', ['js:build'], () => {
  return gulp.src([jsSrc])
    .pipe(gulp.dest(jsDist))
});

gulp.task('styleguide:watch', [
  'styleguide',
  'styleguide:image',
  'styleguide:js'
], () => {
  return gulp.watch(watchTarget, ['styleguide']);
});

gulp.task('styleguide', [
  'styleguide:generate',
  'styleguide:applystyles',
  'styleguide:image',
  'styleguide:js'
]);

