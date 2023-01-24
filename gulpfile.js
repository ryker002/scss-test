"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

function buildStyles() {
  return gulp
    .src("./sass/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./styles"));
}

function autoPrefixStyles() {
  return gulp
    .src("./styles/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("./styles"));
}

function minifyStyles() {
  return gulp
    .src("./styles/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("./styles/minified"));
}

exports.buildStyles = buildStyles;
exports.minifyStyles = minifyStyles;
exports.autoPrefixStyles = autoPrefixStyles;
exports.default = function () {
  gulp.watch(
    "./sass/**/*.scss",
    gulp.series(buildStyles, autoPrefixStyles, minifyStyles)
  );
};
