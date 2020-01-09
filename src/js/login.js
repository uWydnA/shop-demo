require(["js/ajax", "js/setCookie", "js/getCookies"], function (getp, gc, g) {
    class Login {
        constructor() {
            this.user = document.querySelector("#loginId");
            this.pass = document.querySelector("#password");
            this.btn = document.querySelector(".loginbtn");
            this.visshop = JSON.parse(sessionStorage.getItem("visshop")) || [];
            this.ajax = getp;
            this.result = [];
            this.addEvent();
        }
        addEvent() {
            var that = this;
            this.user.onfocus = function () {
                that.user.className = " inp inp-primaryclick radius cc_cursor inp-primary inp-primaryblur right"
            }
            this.user.onblur = function () {
                if (that.user.value == "") {
                    that.user.className = " inp inp-primaryclick radius cc_cursor inp-primary inp-primaryblur errer"

                } else {
                    that.user.className = " inp inp-primaryclick radius cc_cursor inp-primary inp-primaryblur "
                    that.result[0] = "1";
                }
            }
            this.pass.onfocus = function () {
                that.pass.className = " inp inp-primaryclick radius cc_cursor inp-primary inp-primaryblur right"
            }
            this.pass.onblur = function () {
                if (that.pass.value == "") {
                    that.pass.className = " inp inp-primaryclick radius cc_cursor inp-primary inp-primaryblur errer"
                } else {
                    that.pass.className = " inp inp-primaryclick radius cc_cursor inp-primary inp-primaryblur "
                    that.result[1] = "1";
                }
            }
            this.btn.onclick = function () {
                let str = 0;
                for (var i in that.result) {
                    if (that.result[i] == 1) {
                        str++;
                    }
                }
                if (str == 2) {
                    let ajax = getp;
                    ajax.init({
                        url: "http://10.11.51.202:8888/api",
                        data: {
                            type: "login",
                            user: that.user.value,
                            pass: that.pass.value
                        }
                    }).then((res) => {
                        that.res = JSON.parse(res);
                        console.log(that.res)
                        if (that.res.code == "11") {
                            that.res = that.res.msg;
                            let set = gc;
                            set.init({
                                key: "token",
                                val: that.res
                            });
                            let getc = g;
                            let token = getc.init({
                                key: "token"
                            })

                            if (that.visshop.length >= 1) {
                                that.ajax.init({
                                    url: "http://10.11.51.202:8888/api",
                                    data: {
                                        token: token,
                                        type: "firstPush",
                                        shop: JSON.stringify(that.visshop)
                                    }
                                }).then((res) => {
                                    console.log(res);
                                    console.log(JSON.parse(res))
                                    if (res) {
                                        sessionStorage.removeItem("visshop")

                                    }
                                })
                            }
                            location.assign("index.html");
                        }
                        if (that.res.code == "10") {
                            console.log(1)
                        }
                    })
                }
            }
        }
    }
    new Login();
})