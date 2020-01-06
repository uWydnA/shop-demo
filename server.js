const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
let userMsg = [];
http.createServer((req, res) => {
    if (req.url != "/favicon.ico") {
        let pathname = url.parse(req.url).pathname;
        if (pathname == "/api") {
            ajaxHandle(req, res);
        } else {
            fsHandle(req, res);
        }
    }
}).listen("8888", "127.0.0.2", () => {
    console.log("run server at http://127.0.0.2:8888");
})

function random(a, b) {
    return Math.round(Math.random() * (a - b) + b);
}

function randomToken() {
    var str = "";
    for (var i = 0; i < 64; i++) {
        var flag = random(0, 2);
        switch (flag) {
            case 0:
                str += String.fromCharCode(random(97, 122));
                break;
            case 1:
                str += String.fromCharCode(random(65, 90));
                break;
            case 2:
                str += random(0, 9);
                break;
        }
    }
    return str;
}

function ajaxHandle(req, res) {
    let str = "";

    req.on("data", (d) => {
        noder
        str += d;
    })
    req.on("end", () => {
        let data = str ? querystring(str) : url.parse(req.url, true).query;
        if (data.retr0) {
            var path = "./server/" + data.json;
            fs.readFile(path, (err, data) => {
                if (err === null) {
                    res.write(data);
                } else {
                    res.write("404");
                }
                res.end();
                return;
            })
        }
        if (data.type == "regist") {
            let flag = 1;
            let json = {};
            for (var i = 0; i < userMsg.length; i++) {
                if (data.user == userMsg[i].user) {
                    flag = 0;
                }
            }
            if (flag) {
                let tok = randomToken();
                data.token = tok;
                json.code = "01";
                json.msg = data.token;
                userMsg.push(data);
                res.write(JSON.stringify(json));
            } else {
                json.code = "00";
                json.msg = "用户名重复";
                res.write(JSON.stringify(json));
            }
            res.end();
        }
        if (data.type == "login") {
            let flag = 0;
            let index;
            let json = {};
            for (var i = 0; i < userMsg.length; i++) {
                if (data.user == userMsg[i].user) {
                    flag = 1;
                    index = i;
                } else {
                    json.code = "10";
                    json.msg = "没有该账户";
                }
            }
            if (flag == 1) {
                if (data.pass == userMsg[index].pass) {
                    json.code = "11";
                    json.msg = userMsg[index].token;
                } else {
                    json.code = "10";
                    json.msg = "密码错误";
                }
            }
            res.write(JSON.stringify(json));
            res.end();
        }
    })
}

function fsHandle(req, res) {
    let t = url.parse(req.url).pathname;
    if (t == "/") {
        t = "/index.html"
    }
    var path = "./server" + t;
    fs.readFile(path, (err, data) => {
        if (err === null) {
            res.write(data);
        } else {
            res.write("404");
        }
        res.end();
    })
}