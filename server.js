const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
let userMsg = [];
let userShop = [];
http.createServer((req, res) => {
    if (req.url != "/favicon.ico") {
        let pathname = url.parse(req.url).pathname;
        if (pathname == "/api") {
            ajaxHandle(req, res);
        } else {
            fsHandle(req, res);
        }
    }
}).listen("8888", "10.11.51.202", () => {
    console.log("run server at http://10.11.51.202:8888");
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
        console.log(userMsg)
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
        if (data.type == "findToken") {
            let flag = 0;
            let index;
            let json = {};
            if (userMsg.length >= 1) {
                for (var i in userMsg) {
                    if (data.token == userMsg[i].token) {
                        flag = 1;
                        index = i;
                    }
                }
                if (flag = 1) {
                    json.code = "21";
                    json.msg = userMsg[index].user;
                    res.write(JSON.stringify(json));
                }
            }
            res.end();
        }
        if (data.type == "addShop") {
            let flag = 0;
            let index;
            let iNow;
            let json = {};
            if (userMsg.length >= 1) {
                for (var i in userMsg) {
                    if (data.token == userMsg[i].token) {
                        flag = 1;
                        index = i;
                    }
                }
                if (flag = 1) {
                    let json = {};
                    json.user = userMsg[index].user;
                    json.goodid = data.goodid;
                    json.num = data.num;
                    console.log(json)
                    if (userShop.length < 1) {
                        userShop.push({
                            user: json.user,
                            shop: [{
                                goodid: json.goodid,
                                num: json.num
                            }]
                        })
                        iNow = 0;
                    } else {
                        let flag = 0;
                        let nameflag = 0;
                        let index = 0;
                        for (var j in userShop) {
                            if (userShop[j].user == json.user) {
                                nameflag = 1;
                                index = j;
                                iNow = j;
                            }
                        }
                        if (nameflag) {
                            let users = userShop[index].shop;
                            for (var j in users) {
                                if (users[j].goodid == json.goodid) {
                                    flag = 1;
                                    users[j].num = parseInt(users[j].num) + parseInt(json.num);
                                }
                            }
                            if (!flag) {
                                users.push({
                                    goodid: json.goodid,
                                    num: json.num
                                })
                            }
                        } else {
                            userShop.push({
                                user: json.user,
                                shop: [{
                                    goodid: json.goodid,
                                    num: json.num
                                }]
                            })
                            iNow = userShop.length - 1;
                        }

                    }
                }
            }
            res.write(JSON.stringify(userShop[iNow]));
            res.end();
        }
        if (data.type == "showNum") {
            let flag = 0;
            let index;
            let shopindex;
            for (var i in userMsg) {
                if (data.token == userMsg[i].token) {
                    flag = 1;
                    index = i;
                }
            }
            if (flag = 1) {
                let json = userMsg[index].user;
                for (var i in userShop) {
                    if (json == userShop[i].user) {
                        flag = 0;
                        shopindex = i;
                        break;
                    }
                }
                if (!flag) {
                    res.write(JSON.stringify(userShop[shopindex]));
                }
            }
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