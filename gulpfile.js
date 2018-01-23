/**
 * Create by zx1984
 * 2018/1/23 0023.
 * https://github.com/zx1984
 */

const gulp = require('gulp')
const header = require('gulp-header')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const package = require('./package.json')

gulp.task('add-header', function () {
  gulp.src('./build/image-process-tools.js')
    .pipe(rename('image-process-tools.min.js'))
    .pipe(uglify())
    .pipe(header('/** \n * <%= name %> \n * version: <%= version %> \n * author: <%= author %> \n * <%= github %> \n */\n', package))
    .pipe(gulp.dest('./build'))
})

gulp.task('default', ['add-header'])
