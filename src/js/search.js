require(["js/getCookies", "js/ajax"], function (gc, aj) {
    class Search {
        constructor() {
            this.cztUrl = "http://127.0.0.2:8888/api";
            this.banner = document.querySelector("#banner");
            this.bul = document.querySelector("#banner .ben ul")
            this.bol = document.querySelector(".progress-bar-ol")
            this.prev = document.querySelector(".prev");
            this.next = document.querySelector(".next");
            this.top = document.querySelector("#navigation");
            this.remname = document.querySelector(".ban_tit_txd");
            this.loginName = document.querySelector("#tool .tool-r ul li");
            this.navli = document.querySelectorAll(".navli");
            this.selectbg = document.querySelector(".selectbg");
            this.menudata = document.querySelector("div #menuData");
            this.topbox = document.querySelector("#navbox");
            this.select = document.querySelector(".select");
            this.ali = document.querySelectorAll(".selectli");
            this.menuli = document.querySelectorAll("#menuData li")
            this.t1;
            this.index = 0;
            this.indexPrev;
            this.cztr = document.querySelector("#main .main-czt .czt-r ul");
            this.tmr = document.querySelector("#main .main-tm .tm-r ul ");
            this.likething = document.querySelector(".likething");
            this.init();
            this.addEvent();
        }
        init() {
            let that = this;
            let token = gc;
            let key = token.init({
                key: "token"
            });
            let ajax = aj;
            ajax.init({
                url: that.cztUrl,
                data: {
                    type: "findToken",
                    token: key
                }
            }).then((res) => {
                that.res = JSON.parse(res);
                if (that.res.code == "21") {
                    that.res = that.res.msg;
                    let str = that.res.slice(0, 2);
                    str += "**";
                    str += that.res.slice(5, that.res.length);
                    that.loginName.innerHTML = `
					<a href="https://my.bl.com/ym/nl/toIndex.html" target="_blank">
						<s class="hi">Hi，</s>
						<span id="member_name" class ="username">${str}</span>
					</b>
					<a href="https://passport.bl.com/loginDisplay.html?type=logout">退出</a>
					<b></b>
                    `;
                }

            })
        }
        addEvent() {
            var that = this;
            for (var i = 0; i < this.ali.length; i++) {
                this.ali[i].index = i;
                this.ali[i].onmouseover = function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    e.stopPropagation();
                    for (var i = 0; i < that.menuli.length; i++) {
                        that.menuli[i].style.display = "none";
                    }
                    that.select.style.display = "block";
                    that.selectbg.style.display = "block";
                    that.menuli[this.index].style.display = "block";
                    that.menudata.style.display = "block";
                }
                this.ali[i].onmouseout = function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    e.stopPropagation();
                    that.menudata.style.display = "none";
                    that.select.style.display = "none";
                    that.selectbg.style.display = "none";
                }
            }
            this.menudata.onmouseover = function () {
                this.style.display = "block";
            }
            this.menudata.onmouseout = function () {
                this.style.display = "none";
            }
            this.navli[0].onmouseover = function () {
                that.select.style.display = "block";
                that.selectbg.style.display = "block";
            }
            this.navli[0].onmouseout = function () {
                that.select.style.display = "none";
                that.selectbg.style.display = "none";
            }

        }
    }
    new Search();
})