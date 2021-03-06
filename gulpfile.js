var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');

//build JS
gulp.task('js', function () {
    gulp.src('src/js/main.js')
        .pipe(webpackStream({
            output: {
                filename: 'kintoneUtility.min.js'
            },
            module: {
                loaders: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: 'es2015',
                        },
                    }
                ]
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin()
            ],
            devtool: 'inline-source-map'
        }, webpack))
        .pipe(gulp.dest('dist/'))
        .pipe(gulp.dest('../../Dropbox/tmp'));
});

//build CSS
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
gulp.task('css', function() {
  /*
  return gulp.src('src/style/*.css')
    .pipe(cleanCSS())
    .pipe(concat('kintoneUtility-UI.min.css'))
    .pipe(gulp.dest('dist'));
  */
});

gulp.task('default', ['js', 'css']);

gulp.task('watch', ['default'], function(){
  var watcher = gulp.watch(['./src/js/*.js', './src/js/rest/*.js'], ['js']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
