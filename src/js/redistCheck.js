define(["js/ajax"], function (getp) {
    class Check {
        constructor() {

        }
        init(options) {
            var that = this;
            this.user = options.user
            this.pass = options.pass;
            this.num = options.num;
            this.email = options.email;
            let userMsg = {
                type: "regist",
                user: options.user.value,
                pass: options.pass.value,
                num: options.num.value,
                email: options.email.value,
            };
            let p = getp;
            p.init({
                url: "http://10.11.51.202:8888/api",
                data: userMsg
            }).then((res) => {
                that.res = JSON.parse(res);
                if (that.res.code == "01") {
                    location.assign("login.html");
                }
                if (that.res.code == "00") {
                    that.user.parentNode.parentNode.parentNode.children[2].children[2].style.display = "none";
                    that.user.parentNode.parentNode.parentNode.children[2].children[1].style.display = "block";
                    that.user.parentNode.parentNode.parentNode.children[2].children[1].children[1].innerText = "用户名重复"
                }
            })

        }


    }
    return new Check();
})