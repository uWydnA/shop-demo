require(["js/getCookies", "js/ajax", "js/move", "js/setCookie", ], function (gc, aj, move, sc) {
    class Product {
        constructor() {
            this.cztUrl = "http://127.0.0.2:8888/api";
            this.title = document.querySelector("head title")
            this.banner = document.querySelector("#banner");
            this.bul = document.querySelector("#banner .ben ul")
            this.bol = document.querySelector(".progress-bar-ol")
            this.prev = document.querySelector(".prev");
            this.next = document.querySelector(".next");
            this.top = document.querySelector("#navigation");
            this.remname = document.querySelector(".ban_tit_txd");
            this.loginName = document.querySelector("#tool .tool-r ul li");
            this.visshop = JSON.parse(sessionStorage.getItem("visshop")) || [];
            this.showTk = document.querySelector(".show-tk");
            this.div = document.createElement("div");
            this.move = move;
            this.cartNum = document.querySelector("#cartNum");
            this.shopcar = document.querySelector(".shopcar");
            this.addCart = document.querySelector("#addCart");
            this.titlename = document.querySelector(".title");
            this.price = document.querySelector(".price");
            this.goods = document.querySelector(".goods-name h1");
            this.pup = document.querySelector(".pup")
            this.lazytag = document.querySelector(".lazytag");
            this.picture = document.querySelector("#picture");
            this.bigimg = document.querySelector("#loadVideo");
            this.navli = document.querySelectorAll(".navli");
            this.selectbg = document.querySelector(".selectbg");
            this.menudata = document.querySelector("div #menuData");
            this.itemnumber = document.querySelector("#itemnumber");
            this.topbox = document.querySelector("#navbox");
            this.select = document.querySelector(".select");
            this.ali = document.querySelectorAll(".selectli");
            this.menuli = document.querySelectorAll("#menuData li")
            this.proClass = document.querySelector(".pro-class");
            this.searchtxt = document.querySelector(".searchtxt");
            this.searchbtn = document.querySelector(".searchbtn");
            this.mainPic = document.querySelector("#mainPic");
            this.reduce = document.querySelector("#reduce");
            this.addnum = document.querySelector("#addnum");
            this.rside = document.querySelector("#rside");
            this.t1;
            this.t2;
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
            let getCookie = gc;
            let num = 0;
            // this.proClass.style.height = "auto";
            let shoparr = getCookie.init({
                key: "shop"
            })
            let token = getCookie.init({
                key: "token"
            })
            let key = getCookie.init({
                key: "token"
            });
            let ajax = aj;
            if (key) {
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
            let search = getCookie.init({
                key: "search"
            })
            let goodid = getCookie.init({
                key: "goodId"
            })
            // this.searchtxt.value = cook;
            ajax.init({
                url: that.cztUrl,
                data: {
                    retr0: 1,
                    json: "json/project.json"
                }
            }).then((res) => {
                that.res = JSON.parse(res);
                let str = "";
                for (var i in that.res) {
                    if (that.res[i].key == search) {
                        that.title.innerHTML = that.res[i].title;
                        that.res = that.res[i].val;
                    }
                }
                for (var i in that.res) {
                    if (that.res[i].goodId == goodid) {
                        that.res = that.res[i];
                        break;
                    }
                }
                that.bigimg.children[0].src = `images/${that.res.imgm[0]}`;
                that.goods.innerHTML = `
                <em class="late">自营百联</em>
                ${that.res.name}`;
                that.price.innerHTML = `<span class="price">
                <strong id="FlashPrice"><i>¥</i>
                    ${that.res.price}</strong>
            </span>`;
                that.titlename.innerHTML = that.res.info;
                that.lazytag.src = `images/${that.res.imgs[0]}`;
                for (var i = 0; i < that.res.imgs.length; i++) {
                    str += `<li index = "${i}"><img jqimg="images/b1.jpg" id="img_0" src="images/${that.res.imgs[i]}";style="display: inline;"></li>`
                }
                that.picture.innerHTML = str;
                that.apicture = that.picture.children;
                that.lite = that.picture.children[0].children[0];
                that.lite.className = "itemborder"
                for (var i = 0; i < that.apicture.length; i++) {
                    that.apicture[i].onmouseover = function () {
                        that.lazytag.src = `images/${that.res.imgs[this.getAttribute("index")]}`;
                        that.bigimg.children[0].src = `images/${that.res.imgm[this.getAttribute("index")]}`
                        for (var j = 0; j < that.apicture.length; j++) {
                            that.apicture[j].children[0].className = "";
                        }
                        that.apicture[this.getAttribute("index")].children[0].className = "itemborder";
                    }
                }
            })
            ajax.init({
                url: that.cztUrl,
                data: {
                    token: token,
                    type: "showNum",
                    goodid: goodid,
                }
            }).then((res) => {
                let num = 0;
                if (res) {
                    that.req = JSON.parse(res)
                    if (typeof that.req.shop == "string") {
                        that.req.shop = JSON.parse(that.req.shop)
                    }
                    for (var i in that.req.shop) {
                        num += parseInt(that.req.shop[i].num);
                    }
                } else {
                    for (var i in that.visshop) {
                        num += parseInt(that.visshop[i].num);
                    }
                }
                that.cartNum.innerHTML = num;
            })
            this.move.init({
                dom: this.rside,
                data: {
                    right: -276
                }
            })
        }
        addEvent() {
            var that = this;
            let statX;
            let statY;
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
            this.mainPic.onmouseover = function () {
                that.pup.style.display = "inline";
                that.bigimg.style.display = "block";
            }
            this.mainPic.onmouseout = function () {
                that.pup.style.display = "none";
                that.bigimg.style.display = "none";
            }
            this.mainPic.onmousemove = function (eve) {
                var e = eve || window.event;
                var l = e.offsetX - that.pup.offsetWidth / 2;
                var t = e.offsetY - that.pup.offsetHeight / 2;
                if (l < 0) l = 0;
                if (t < 0) t = 0;
                if (t > this.offsetHeight - that.pup.offsetHeight) t = this.offsetHeight - that.pup.offsetHeight;
                if (l > this.offsetWidth - that.pup.offsetWidth) l = this.offsetWidth - that.pup.offsetWidth;
                that.pup.style.top = t + "px"
                that.pup.style.left = l + "px"
                that.bigimg.children[0].style.top = -t * 2 + "px";
                that.bigimg.children[0].style.left = -l * 2 + "px";

            }
            this.addnum.onclick = function () {
                if (that.itemnumber.value == 1) {
                    that.reduce.className = "btn-down cc_cursor"
                }
                that.itemnumber.value++;
            }
            this.reduce.onclick = function () {
                if (that.itemnumber.value <= 1) {
                    this.className = "btn-down-disable cc_cursor"
                } else if (that.itemnumber.value > 1) {
                    this.className = "btn-down cc_cursor"
                }
                if (that.itemnumber.value > 1) {
                    that.itemnumber.value--;
                }
            }
            this.addCart.onclick = function () {
                let flag = 0;
                let num = that.itemnumber.value;
                let ajax = aj;
                let setcook = sc;
                let arr = [];
                let getCookie = gc;
                let token = getCookie.init({
                    key: "token"
                })
                let cook = getCookie.init({
                    key: "goodId"
                })
                if (token == "") {
                    for (var i in that.visshop) {
                        if (cook == that.visshop[i].goodid) {
                            flag = 1;
                            that.visshop[i].num = parseInt(that.visshop[i].num) + parseInt(num);
                            break;
                        }
                    }
                    if (!flag) {
                        that.visshop.push({
                            goodid: cook,
                            num: num
                        })
                    }
                    sessionStorage.setItem("visshop", JSON.stringify(that.visshop));
                }
                that.div.style.display = "block";
                let clientX = document.documentElement.clientWidth;
                let clientY = document.documentElement.clientHeight;
                for (var i = 0; i < that.apicture.length; i++) {
                    if (that.apicture[i].children[0].className == "itemborder") {
                        that.div.innerHTML = that.apicture[i].children[0].outerHTML;
                        that.div.className = "divimg";
                        document.body.appendChild(that.div)
                    }

                }
                if (!statY) {
                    statY = that.div.offsetTop - that.shopcar.offsetTop;
                }
                if (!statX) {
                    statX = (clientX - that.shopcar.offsetWidth) - that.div.offsetLeft;
                }
                that.move.init({
                    dom: that.div,
                    data: {
                        left: clientX,
                        top: statY,
                        width: 0,
                        height: 0
                    },
                    end: function () {
                        that.div.setAttribute("style", "");
                        that.div.className = "divimg";
                        if (token != "") {
                            ajax.init({
                                url: that.cztUrl,
                                data: {
                                    token: token,
                                    type: "addShop",
                                    goodid: cook,
                                    num: num
                                }
                            }).then((res) => {
                                let num = 0;
                                that.req = JSON.parse(res)
                                for (var i in that.req.shop) {
                                    num += parseInt(that.req.shop[i].num);
                                }
                                that.cartNum.innerHTML = num;
                                that.showTk.style.display = "block";
                                setTimeout(() => {
                                    that.showTk.style.display = "none";
                                }, 2000);
                            })
                        } else {
                            let num = 0;
                            for (var i in that.visshop) {
                                num += parseInt(that.visshop[i].num);
                            }
                            that.cartNum.innerHTML = num;
                        }
                    }
                })
            }
            this.shopcar.onclick = function () {
                location.assign("shop.html")
            }
        }
    }
    new Product();
})