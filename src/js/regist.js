require(["js/redistCheck", "js/ajax", "js/reg", "js/inputFocus"], function (rcheck, get, creg, f) {
    class Regist {
        constructor() {
            this.btn = document.querySelector("#subbtn");
            this.user = document.querySelector("#loginId");
            this.pass = document.querySelector("#loginPass");
            this.enpass = document.querySelector("#loginenpass");
            this.num = document.querySelector("#loginnum");
            this.email = document.querySelector("#loginEmail");
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
                that.result.push((res.init({
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
                that.result.push((res.init({
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
                that.result.push((res.init({
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
                that.result.push((res.init({
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
                that.result.push((res.init({
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

                }
            }
        }
    }
    new Regist();
})