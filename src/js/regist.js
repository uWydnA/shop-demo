require(["js/redistCheck", "js/ajax", "js/reg", "js/inputFocus", "js/getCookies"], function (rcheck, get, creg, f, g) {
    class Regist {
        constructor() {
            this.btn = document.querySelector("#subbtn");
            this.user = document.querySelector("#loginId");
            this.pass = document.querySelector("#loginPass");
            this.enpass = document.querySelector("#loginenpass");
            this.num = document.querySelector("#loginnum");
            this.ajax = get;
            this.email = document.querySelector("#loginEmail");
            this.visshop = JSON.parse(sessionStorage.getItem("visshop")) || [];
            this.result = [];
            this.addEvent();
        }
        addEvent() {
            var that = this;
            this.user.onfocus = function () {
                let dom = f;
                f.init({
                    dom: that.user
                })
            }
            this.user.onblur = function () {
                that.user.className = "";
                let res = creg;
                let reg = /[a-z0-9A-Z]{6,20}/;
                that.result[0] = ((res.init({
                    dom: that.user,
                    reg: reg
                })));

            }
            this.pass.onfocus = function () {
                let dom = f;
                f.init({
                    dom: that.pass
                })
            }
            this.pass.onblur = function () {
                that.pass.className = "";
                let res = creg;
                let reg = /[a-z0-9A-Z]{8,20}/;
                that.result[1] = ((res.init({
                    dom: that.pass,
                    reg: reg,
                    flag: 1,
                    watch: that.enpass
                })));
            }
            this.enpass.onfocus = function () {
                let dom = f;
                f.init({
                    dom: that.enpass
                })
            }
            this.enpass.onblur = function () {
                that.enpass.className = "";
                let res = creg;
                let reg = /[a-z0-9A-Z]{8,20}/;
                that.result[2] = ((res.init({
                    dom: that.enpass,
                    reg: reg,
                    flag: 1,
                    watch: that.pass
                })));
            }
            this.num.onfocus = function () {
                let dom = f;
                f.init({
                    dom: that.num
                })
            }
            this.num.onblur = function () {
                that.num.className = "";
                let res = creg;
                let reg = /^1[3-9][0-9]{9}$/;
                that.result[3] = ((res.init({
                    dom: that.num,
                    reg: reg
                })));
            }
            this.email.onfocus = function () {
                let dom = f;
                f.init({
                    dom: that.email
                })
            }
            this.email.onblur = function () {
                that.email.className = "";
                let res = creg;
                let reg = /^\w{2,10}@[0-9a-z]{2,10}(\.[a-z]{2,3}){1,2}$/;
                that.result[4] = ((res.init({
                    dom: that.email,
                    reg: reg
                })));
            }
            this.btn.onclick = function () {
                let str = 0;
                for (var i in that.result) {
                    if (that.result[i] == 1) {
                        str++;
                    }
                }
                if (str == 5) {
                    let check = rcheck;
                    check.init({
                        user: that.user,
                        pass: that.pass,
                        enpass: that.enpass,
                        num: that.num,
                        email: that.email
                    });
                    // if (that.visshop.length >= 1) {
                    //     that.ajax.init({
                    //         url: "http://10.11.51.202:8888/api",
                    //         data: {
                    //             type: "login",
                    //             user: that.user.value,
                    //             pass: that.pass.value
                    //         }
                    //     }).then((res) => {
                    //         that.res = JSON.parse(res);
                    //         if (that.res.code == "11") {
                    //             that.res = that.res.msg;
                    //             let set = gc;
                    //             set.init({
                    //                 key: "token",
                    //                 val: that.res
                    //             });
                    //             let getc = g;
                    //             let token = getc.init({
                    //                 key: "token"
                    //             })
                    //             that.ajax.init({
                    //                 url: that.cztUrl,
                    //                 data: {
                    //                     token: token,
                    //                     type: "firstPush",
                    //                     shop: that.visshop
                    //                 }
                    //             }).then((res) => {
                    //                 console.log(res)
                    //             })
                    //         }
                    //         if (that.res.code == "10") {
                    //             console.log(1)
                    //         }
                    //     })
                    // }
                }

            }
        }
    }
    new Regist();
})