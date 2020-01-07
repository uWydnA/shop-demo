require(["js/swiper", "js/getCookies", "js/ajax", "js/setCookie"], function (swiper, gc, aj, sc) {
    class Shop {
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
            this.menudata = document.querySelector("div #menuData");
            this.topbox = document.querySelector("#navbox");
            this.select = document.querySelector(".select");
            this.ali = document.querySelectorAll(".selectli");
            this.searchtxt = document.querySelector(".searchtxt");
            this.searchbtn = document.querySelector(".searchbtn");
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
            if (key) {
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
                        that.remname.innerHTML = `
                        Hi，<span id="memberName">${str}</span><br>
                        <p class="blogin_a">
                            <a href=";" style="display: none;">登录</a>
                            <a href="https://reg.bl.com/regist.html" target="_blank" style="display: none;">注册</a>
                            <a id="memberDetail">普通卡会员</a>
                            <a id="getCoupon" href="https://coupon.bl.com/list.html" target="_blank">领券中心</a>
                        </p>`;
                    }

                })
            }
            this.getAjax(this.cztUrl, {
                retr0: 1,
                json: "json/czt.json"
            }).then((res) => {
                if (res) {
                    that.res = JSON.parse(res);
                    let str = "";
                    for (var i in that.res) {
                        str += ` 
                        <li>
                        <a href="">
                            <img src="${that.res[i].img}" alt="">
                            <p>${that.res[i].info}</p>
                            <span class="money">￥${that.res[i].money}</span>
                            <i class="price">参考价：￥${that.res[i].price}</i>
                        </a>
                    </li>`
                    }
                    that.cztr.innerHTML = str;
                }
            })
            this.getAjax(this.cztUrl, {
                retr0: 1,
                json: "json/tm.json"
            }).then((res) => {
                if (res) {
                    that.res = JSON.parse(res);
                    let str = "";
                    for (var i in that.res) {
                        str += ` 
                        <li><a href="#">
                                <img src="${that.res[i].img}" alt="">
                            </a> </li>`
                    }
                    that.tmr.innerHTML = str;
                }
            })
            this.getAjax(this.cztUrl, {
                retr0: 1,
                json: "json/like.json"
            }).then((res) => {
                if (res) {
                    that.res = JSON.parse(res);
                    let str = "";
                    for (var i in that.res) {
                        str += ` 
                        <li>
                        <div>
                            <img src="${that.res[i].img}" alt="">
                            <p class="info">${that.res[i].info}</p>
                            <span class="price">￥${that.res[i].price}</span>
                            <a href="javascript:void(0);" goodsid="3865645" name="collect" class="geta">收藏</a>
                        </div>
                    </li>`
                    }
                    that.likething.innerHTML = str;
                }
            })
            this.getAjax(this.cztUrl, {
                retr0: 1,
                json: "json/banner.json"
            }).then((res) => {
                if (res) {
                    that.res = JSON.parse(res);
                    let str = "";
                    let dot = "";
                    for (var i in that.res) {
                        str += ` 
                        <li style="background: ${that.res[i].bcg};"  index=${i}><a href="#"><img src="${that.res[i].img}" alt=""></a></li>`
                        dot += `<li class ="odot"><a class="circle" index=${i}>${i}</a></li>`;
                    }
                    that.bul.innerHTML = str;
                    that.bol.innerHTML = dot;
                    that.bol.children[0].children[0].className = "active circle";
                    let swpierobj = swiper;
                    swpierobj.init({
                        dom: that.banner,
                        bul: that.bul,
                        bol: that.bol,
                        prevClassName: that.prev.className,
                        nextClassName: that.next.className,
                        index: that.index
                    });
                }
            })

        }
        addEvent() {
            var that = this;
            this.searchbtn.onclick = function () {
                let cook = sc;
                cook.init({
                    key: "search",
                    val: that.searchtxt.value,
                })
                setTimeout(() => {
                    location.assign("search.html");
                }, 100);
            }
            this.banner.onmouseover = function () {
                that.prev.style.display = "block";
                that.next.style.display = "block";
            }
            this.banner.onmouseout = function () {
                that.prev.style.display = "none";
                that.next.style.display = "none";
            }
            document.onscroll = function (eve) {
                var e = eve || window.event;
                var t = document.documentElement.scrollTop;
                var l = document.documentElement.offsetHeight
                if (t > l * 0.3) {
                    that.top.style.display = "block";
                } else {
                    that.top.style.display = "none";
                }
            }
            this.topbox.onclick = function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.id = "navigation") {
                    clearInterval(that.t1);
                    that.t1 = setInterval(() => {
                        var t = document.documentElement.scrollTop;
                        var speed = t / 15;
                        document.documentElement.scrollTop -= speed;
                        if (t <= 0) {
                            clearInterval(that.t1);
                        }
                    }, 13);
                }
            }
            for (var i = 0; i < this.ali.length; i++) {
                this.ali[i].index = i;
                this.ali[i].onmouseover = function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    e.stopPropagation();
                    for (var i = 0; i < that.menuli.length; i++) {
                        that.menuli[i].style.display = "none";
                    }
                    that.menuli[this.index].style.display = "block";
                    console.log(this.index)
                    that.menudata.style.opacity = "1";
                }
                this.ali[i].onmouseout = function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    e.stopPropagation();
                    that.menudata.style.opacity = "0";
                }
            }
            this.menudata.onmouseenter = function () {
                this.style.opacity = "1";
            }

        }
        getAjax(url, data) {
            let p = new Promise(function (success, err) {
                data = data || {};
                let str = "";
                let xhr = new XMLHttpRequest();
                for (var i in data) {
                    str += `${i}=${data[i]}&`;
                }
                url = url + "?" + str + "__retr0__=" + new Date().getTime();
                xhr.open("get", url, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        success(xhr.responseText);
                    }
                    if (xhr.readyState === 4 && xhr.status != 200) {
                        err(xhr.status);
                    }
                }
                xhr.send();
            })
            return p;
        }

    }

    new Shop();
})