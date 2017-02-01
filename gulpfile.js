const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

gulp.task("default", ["build-css", "build-js"], function() {});

gulp.task("build-css", function() {
    return gulp.src(["sass/*.scss", "sass/**/*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("css/"));
});

gulp.task("build-js", function() {
    return gulp.src("app.js")
        .pipe(uglify())
        .pipe(gulp.dest("js/"));
});

gulp.task("watch", function() {
    gulp.watch(["sass/*.scss", "sass/**/*.scss"], ["build-css"]);
});