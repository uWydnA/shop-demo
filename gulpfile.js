const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const gulp = require("gulp");
const connect = require("gulp-connect");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const proxy = require("http-proxy-middleware");
const livereload = require("gulp-livereload");

function indexFn(end) {
    gulp.src(["src/images/*"]).pipe(gulp.dest("server/images")).pipe(livereload());
    gulp.src(["src/*.html"]).pipe(gulp.dest("server")).pipe(livereload());
    gulp.src(["src/json/*.json"]).pipe(gulp.dest("server/json")).pipe(livereload());
    gulp.src(["src/js/*.js"]).pipe(gulp.dest("server/js")).pipe(livereload())
    gulp.src(["src/libs/*.js"]).pipe(gulp.dest("server/libs")).pipe(livereload());
    // gulp.src(["src/js/index.js"]).pipe(gulp.dest("server/js")).pipe(uglify()).pipe(rename("index.min.js")).pipe(gulp.dest("server/js")).pipe(connect.reload());
    end();
}

function watchFn() {
    gulp.watch(["src/*.html"], indexFn)
    gulp.watch(["src/json/*.json"], indexFn)
    gulp.watch(["src/js/*.js"], indexFn)
    gulp.watch(["src/sass/*.scss"], sassFn);
    gulp.watch(["src/images/*"], indexFn);
}

function ajaxHandle(req, res) {
    let str = "";
    req.on("data", (d) => {
        str += d;
    })
    req.on("end", () => {
        let data = str ? querystring(str) : url.parse(req.url, true).query;
        res.write(JSON.stringify(data));
        res.end();
    })
}

function fsHandle(req, res) {
    var path = "./server" + url.parse(req.url).pathname;
    console.log(path)
    fs.readFile(path, (err, data) => {
        if (err === null) {
            res.write(data);
        } else {
            res.write("404");
        }
        res.end();
    })
}

// function serverFn() {
//     connect.server({
//         root: "server",
//         port: "8888",
//         livereload: true,
//         // middleware: function (connect, opt) {
//         //     return [
//         //         proxy('/', { //代理之后的名字
//         //             target: 'https://127.0.0.1:8888', //要代理的地址
//         //             changeOrigin: true,
//         //             pathRewrite: {
//         //                 '^/': '' //声明路径的重写规则，为代理之后的名字
//         //             }
//         //         }),
//         //         // proxy('/abc',  {    //代理之后的名字
//         //         //     target: 'https://wanandroid.com/wxarticle', //要代理的地址
//         //         //     changeOrigin:true,
//         //         //     pathRewrite:{
//         //         //         '^/abc':''  //声明路径的重写规则，为代理之后的名字
//         //         //     }
//         //         // })
//         //     ]
//         // }
//     })
// }


function sassFn() {
    return gulp.src(["src/sass/*"]).pipe(sass()).pipe(gulp.dest("server/css")).pipe(livereload());
}


exports.index = indexFn;
exports.watch = watchFn;
// exports.server = serverFn;
// exports.serverWatch = gulp.parallel(serverFn, watchFn)