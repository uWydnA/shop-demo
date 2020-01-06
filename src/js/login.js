require(["js/ajax", "js/setCookie"], function (getp, gc) {
    class Login {
        constructor() {
            this.user = document.querySelector("#loginId");
            this.pass = document.querySelector("#password");
            this.btn = document.querySelector(".loginbtn");
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
                    that.result.push("1");
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
                    that.result.push("1");
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
                        url: "http://127.0.0.2:8888/api",
                        data: {
                            type: "login",
                            user: that.user.value,
                            pass: that.pass.value
                        }
                    }).then((res) => {
                        that.res = JSON.parse(res);
                        if (that.res.code == "11") {
                            that.res = that.res.msg;
                            let set = gc;
                            set.init({
                                key: "token",
                                val: that.res
                            });
                            setTimeout(() => {
                                location.assign("index.html")
                            }, 100)

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