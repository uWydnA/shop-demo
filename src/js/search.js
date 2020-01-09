require(["js/getCookies", "js/ajax", "js/setCookie", "js/move"], function (gc, aj, sc, move) {
    class Search {
        constructor() {
            this.cztUrl = "http://10.11.51.202:8888/api";
            this.title = document.querySelector("head title")
            this.banner = document.querySelector("#banner");
            this.bul = document.querySelector("#banner .ben ul")
            this.bol = document.querySelector(".progress-bar-ol")
            this.prev = document.querySelector(".prev");
            this.next = document.querySelector(".next");
            this.top = document.querySelector("#navigation");
            this.remname = document.querySelector(".ban_tit_txd");
            this.loginName = document.querySelector("#tool .tool-r ul li");
            this.move = move;
            this.shopcar = document.querySelector(".shopcar");
            this.cartNum = document.querySelector("#cartNum");
            this.listclass = document.querySelector(".listclass");
            this.navli = document.querySelectorAll(".navli");
            this.selectbg = document.querySelector(".selectbg");
            this.menudata = document.querySelector("div #menuData");
            this.rside = document.querySelector("#rside");
            this.topbox = document.querySelector("#navbox");
            this.select = document.querySelector(".select");
            this.ali = document.querySelectorAll(".selectli");
            this.menuli = document.querySelectorAll("#menuData li")
            this.sort = document.querySelector(".sort");
            this.proClass = document.querySelector(".pro-class");
            this.searchtxt = document.querySelector(".searchtxt");
            this.searchbtn = document.querySelector(".searchbtn");
            this.t1;
            this.flag = 0;
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
            let key = getCookie.init({
                key: "token"
            });
            this.setcook = sc;
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
                ajax.init({
                    url: this.cztUrl,
                    data: {
                        token: key,
                        type: "showNum",
                    }
                }).then((res) => {
                    let num = 0;
                    if (res) {
                        that.req = JSON.parse(res)
                        for (var i in that.req.shop) {
                            num += parseInt(that.req.shop[i].num);
                        }
                        that.cartNum.innerHTML = num;
                    }

                })
            }
            let cook = getCookie.init({
                key: "search"
            })
            this.searchtxt.value = cook;
            ajax.init({
                url: that.cztUrl,
                data: {
                    retr0: 1,
                    json: "json/search.json"
                }
            }).then((res) => {
                that.res = JSON.parse(res);
                for (var i in that.res) {
                    if (that.res[i].key == cook) {
                        that.title.innerHTML = that.res[i].title;
                        that.res = that.res[i].val;
                        break;
                    }
                }
                that.rec = that.res;
                that.display();
            })
            ajax.init({
                url: this.cztUrl,
                data: {
                    token: key,
                    type: "showNum",
                }
            }).then((res) => {
                if (res) {
                    let num = 0;
                    that.req = JSON.parse(res)
                    for (var i in that.req.shop) {
                        num += parseInt(that.req.shop[i].num);
                    }
                    that.cartNum.innerHTML = num;
                }
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
            this.shopcar.onclick = function () {
                location.assign("shop.html")
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
            this.proClass.onclick = function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                var t = target;
                while (true) {
                    if (t.nodeName == "LI") {
                        break;
                    } else {
                        t = t.parentNode;
                    }
                }
                that.setcook.init({
                    key: "goodId",
                    val: t.getAttribute("dataid")
                })
                setTimeout(() => {
                    location.assign("product.html");
                }, 100);
            }
            this.listclass.onclick = function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                var t = target;
                while (true) {
                    if (t.nodeName == "LI") {
                        break;
                    } else {
                        t = t.parentNode;
                    }
                }
                for (var i = 0; i < this.children.length; i++) {
                    var c = this.children[i];
                    var old = c.getAttribute("class");
                    let reg = /on/;
                    if (reg.test(old)) {
                        c.setAttribute("class", old.slice(0, old.length - 3));
                    };


                }
                t.className = `${t.getAttribute("class")} on`;
            }
            this.sort.onclick = function () {
                if (!that.flag) {
                    that.flag = 1;
                    for (var i = 0; i < that.rec.length; i++) {
                        for (var j = 0; j < that.rec.length; j++) {
                            if (that.rec[i].price < that.rec[j].price) {
                                var temp = that.rec[i];
                                that.rec[i] = that.rec[j];
                                that.rec[j] = temp;
                            }
                        }
                    }
                    that.display();
                } else {
                    that.flag = 0
                    for (var i = 0; i < that.rec.length; i++) {
                        for (var j = 0; j < that.rec.length; j++) {
                            if (that.rec[i].price > that.rec[j].price) {
                                var temp = that.rec[i];
                                that.rec[i] = that.rec[j];
                                that.rec[j] = temp;
                            }
                        }
                    }
                    that.display();
                }
            }
        }
        display() {
            let str = "";
            if (this.rec.length > 0) {
                for (var i in this.rec) {
                    if (this.rec[i].info == "") {
                        str += `<li dataId = "${this.rec[i].goodId}">
                        <div class="pro-show" >
                            <div class="pro-icon">
                            </div>
                            <!-- 商品大图 -->
                            <div class="pro-img">
                                <a target="_blank";">
                                    <img class="" src="${this.rec[i].img}" height="200" width="200" style="display: inline;">
                                </a>
                                <div class="pro-img-show hotsale">${this.rec[i].hotsale}</div>
                            </div>
    
                            <div class="pro-money">
                                <div class="money-fl">￥${this.rec[i].price}</div>
                                <div class="money-fr"></div>
                            </div>
                            <div class="product-comment">
                                <div class="pro-name " style="word-break: none;
                                overflow: visible;
                                white-space: normal;
                                text-overflow: none;">
                                    <span style="color: #e6133c">
                                    </span>
                                    <a target="_blank" title="索尼（SONY）PlayStation 4 游戏手柄 迷彩绿（PS4）" href="https://product.bl.com/3160950.html?scf=1" onclick="addCmCreateElementTag(3160950,'索尼（SONY）PlayStation 4 游戏手柄 迷彩绿（PS4）',208043,this);">${this.rec[i].name}</a>
                                </div>
                                <div class="pro-info" title="支持各PS4主机">${this.rec[i].info}</div>
                            </div>
                            <div class="pro-assess">
                                &nbsp;
                            </div>
                            <!-- 经营类型 -->
                            <div class="pro-assess">
                                <div class="pro-assess-right">
                                    自营百联
                                    <input type="hidden" value="1" class="subYunType">
                                </div>
                            </div>
                            <div class="pro-button">
                                <input type="hidden" value="3160950">
                                <input type="hidden" value="338.0">
                                <input type="hidden" value="338.0">
                                <input type="hidden" value="索尼（SONY）PlayStation 4 游戏手柄 迷彩绿（PS4）">
                                <input type="hidden" value="https://Img.iblimg.com/photo-38/3020/612932569_200x200.jpg">
                                <input type="hidden" value="a102245">
                                <input type="hidden" value="208043">
                                <input type="hidden" value="">
                                <input type="hidden" value="">
                                <button type="button" class="btn btn-primary addCard">加入购物车</button>
                            </div>
                        </div>
                    </li>`
                    } else {
                        str += `<li dataId = "${this.rec[i].goodId}">
                        <div class="pro-show" >
                            <div class="pro-icon">
                            </div>
                            <!-- 商品大图 -->
                            <div class="pro-img">
                                <a target="_blank";">
                                    <img class="" src="${this.rec[i].img}" height="200" width="200" style="display: inline;">
                                </a>
                                <div class="pro-img-show hotsale">${this.rec[i].hotsale}</div>
                            </div>
    
                            <div class="pro-money">
                                <div class="money-fl">￥${this.rec[i].price}</div>
                                <div class="money-fr"></div>
                            </div>
                            <div class="product-comment">
                                <div class="pro-name ">
                                    <span style="color: #e6133c">
                                    </span>
                                    <a target="_blank" title="索尼（SONY）PlayStation 4 游戏手柄 迷彩绿（PS4）" href="https://product.bl.com/3160950.html?scf=1" onclick="addCmCreateElementTag(3160950,'索尼（SONY）PlayStation 4 游戏手柄 迷彩绿（PS4）',208043,this);">${this.rec[i].name}</a>
                                </div>
                                <div class="pro-info" title="支持各PS4主机">${this.rec[i].info}</div>
                            </div>
                            <div class="pro-assess">
                                &nbsp;
                            </div>
                            <!-- 经营类型 -->
                            <div class="pro-assess">
                                <div class="pro-assess-right">
                                    自营百联
                                    <input type="hidden" value="1" class="subYunType">
                                </div>
                            </div>
                            <div class="pro-button">
                                <input type="hidden" value="3160950">
                                <input type="hidden" value="338.0">
                                <input type="hidden" value="338.0">
                                <input type="hidden" value="索尼（SONY）PlayStation 4 游戏手柄 迷彩绿（PS4）">
                                <input type="hidden" value="https://Img.iblimg.com/photo-38/3020/612932569_200x200.jpg">
                                <input type="hidden" value="a102245">
                                <input type="hidden" value="208043">
                                <input type="hidden" value="">
                                <input type="hidden" value="">
                                <button type="button" class="btn btn-primary addCard">加入购物车</button>
                            </div>
                        </div>
                    </li>`
                    }

                }
                this.proClass.innerHTML = str;
            }
        }
    }
    new Search();
})