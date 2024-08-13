import gulp from "gulp";
import source from "vinyl-source-stream";
import browserify from "browserify";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);
const DIST = "../admin";
const APP = "./app";
const SRC = `${APP}/src`;

gulp.task("copy-html", () => gulp.src(`${SRC}/index.html`).pipe(gulp.dest(DIST)));

gulp.task("copy-api", () => gulp.src(`${APP}/api/**/*.*`).pipe(gulp.dest(`${DIST}/api`)));

gulp.task("copy-assets", () => gulp.src(`${APP}/assets/**/*.*`).pipe(gulp.dest(`${DIST}/assets`)));

gulp.task("build-js", () =>
  browserify(`${SRC}/main.js`, {
    debug: true,
  })
    .transform("babelify", {
      global: true,
      ignore: [/\/node_modules\/(?!axios\/)/],
      presets: ["@babel/preset-env"],
      sourceMap: true,
    })
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(DIST))
);

gulp.task("build-sass", () =>
  gulp.src(`${SRC}/scss/**/*.scss`).pipe(sass().on("error", sass.logError)).pipe(gulp.dest(DIST))
);

gulp.task("watch", () => {
  gulp.watch(`${SRC}/index.html`, gulp.parallel("copy-html"));
  gulp.watch(`${APP}/api/**/*.*`, gulp.parallel("copy-api"));
  gulp.watch(`${APP}/assets/**/*.*`, gulp.parallel("copy-assets"));
  gulp.watch(`${SRC}/**/*.js`, gulp.parallel("build-js"));
  gulp.watch(`${SRC}/scss/**/*.scss`, gulp.parallel("build-sass"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-api", "copy-assets", "build-js", "build-sass"));

gulp.task("default", gulp.parallel("watch", "build"));
