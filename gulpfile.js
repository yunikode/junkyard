var browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglify'),
    include      = require('gulp-include'),
    sourcemaps   = require('gulp-sourcemaps'),

    pug          = require('gulp-pug'),
    del          = require('del'),
    htmlmin      = require('gulp-htmlmin'),
    doIf         = require('gulp-if'),
    imagemin     = require('gulp-imagemin'),
    plumber      = require('gulp-plumber'),
    wiredep      = require('wiredep').stream,
    uncss        = require('gulp-uncss');

    postcss      = require('gulp-postcss'),
    cssnano      = require('cssnano'),
    initial      = require('postcss-initial'),
    autoreset    = require('postcss-autoreset'),
    reporter     = require('postcss-reporter'),
    hexrgba      = require('postcss-hexrgba'),
    scss         = require('postcss-scss'),

    aColors      = require('postcss-all-link-colors'),
    clearfix     = require('postcss-clearfix'),
    verthorz     = require('postcss-verthorz'),
    // fontMagic    = require('postcss-font-magician'),
    alias        = require('postcss-alias'),

    autoprefixer = require('autoprefixer'),


gulp.task('tmpl', function() {
    gulp.src('src/pug/*.pug')
        .pipe(pug())
        .pipe(wiredep({
          directory: 'src/bower_components/',
          bowerJson: require('./bower.json'),
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream:true}));
});

gulp.task('scss', function() {
    gulp.src('src/scss/*.scss')
        .pipe( sourcemaps.init())
        .pipe( postcss([
            // stylelint(),
            // fontMagic({ hosted: '../fonts' }),
            alias(),
            aColors(),
            clearfix({ display: 'table' }),
            verthorz(),
            hexrgba(),
            reporter({clearMessages: true, throwError: true })],
            { parser: scss })
        )
        .pipe(sass({errLogToConsole: true}))
        .pipe( postcss([
            autoprefixer({ browsers: ['last 2 versions'] }),
            reporter({clearMessages: true, throwError: true })
        ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( gulp.dest('dist/css/'))
        .pipe( reload({stream:true}));
});


gulp.task('js', function() {
    gulp.src('src/js/main.js')
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest('dist/js/'))
        .pipe(reload({stream:true}));
});

// gulp.task('inject-vendor', function() {
//   gulp.src('src/pug/**/*')
//   .pipe
// })

gulp.task('copy', function() {
    gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img/'))
        .pipe(reload({stream:true}));

    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(reload({stream:true}));

    gulp.src('src/root/**/*')
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('minify', function() {
    gulp.src('dist/**/*')
        .pipe(doIf('*.js', uglify()))
        .pipe(doIf('*.css', postcss([
            cssnano({autoprefixer: false})
        ])))
        .pipe(doIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist/'));

    gulp.src('dist/img/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{cleanupIDs: false}]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function () {
    del('dist/');
});

gulp.task('done', function () {

});

gulp.task('uncss', function () {
     return gulp.src('dist/**/*.css')
        .pipe(uncss({
            html: ['../**/*.html']
        }))
        .pipe(gulp.dest('dist/'));
});

// use task
gulp.task('watch', function() {
    gulp.watch('src/pug/**/*.pug', ['tmpl']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/js/**/*', ['js']);
});

gulp.task('server', ['watch', 'browser-sync']);

// gulp.task('default',['clean','tmpl','scss','js','copy','minify','done']);
gulp.task('default',['clean','tmpl','scss','js','copy','done']);
