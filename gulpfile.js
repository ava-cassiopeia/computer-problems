const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task("default", ["build-css"], function() {});

gulp.task("build-css", function() {
    return gulp.src(["sass/*.scss", "sass/**/*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("css/"));
});