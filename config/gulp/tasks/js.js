import gulp       from 'gulp';
import browserify from 'browserify';
import babelify   from 'babelify';
import source     from "vinyl-source-stream";

let rootDir = './src/js';
let watchTarget = rootDir + '/**/*.js';
let src = rootDir + '/main.js';
let dist = './dist/js';

gulp.task('js:build', () => {
  browserify({
    entries: src,
    extensions: [".js"]
  })
    .transform(babelify)
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
      this.emit("end");
    })
    .pipe(source("main.js"))
    .pipe(gulp.dest(dist));
});

gulp.task('js:watch', () => {
  gulp.watch(watchTarget, ['js:build']);
});
