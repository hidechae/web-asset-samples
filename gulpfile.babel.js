import gulp from 'gulp'
import requireDir from 'require-dir'

requireDir('./config/gulp/tasks', {recurse: true})

gulp.task('default', ['build'])

gulp.task('build', [
  'css:build',
  'js:build'
])

gulp.task('watch', [
  'css:watch',
  'js:watch'
])
