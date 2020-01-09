require(["js/ajax", "js/getCookies"], function (aj, gc) {
    class Shop {
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
            this.div = document.createElement("div");
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
            this.shopnum = document.querySelector(".shopnum");
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
            this.name = document.querySelector(".cart-title .name");
            this.zongjia = 0;
            this.sumzong = document.querySelector(".zongjia");
            this.shopul = document.querySelector(".cart-table-list");
            this.loginMes = document.querySelector(".login-message")
            this.t1;
            this.t2;
            this.index = 0;
            this.indexPrev;
            this.cztr = document.querySelector("#main .main-czt .czt-r ul");
            this.tmr = document.querySelector("#main .main-tm .tm-r ul ");
            this.likething = document.querySelector(".likething");
            this.init();
        }
        init() {
            let that = this;
            let ajax = aj;
            this.num = 0;
            let getCookie = gc;
            let token = getCookie.init({
                key: "token"
            })
            let goodid = getCookie.init({
                key: "goodid"
            })
            if (token) {
                ajax.init({
                    url: that.cztUrl,
                    data: {
                        type: "findToken",
                        token: token
                    }
                }).then((res) => {
                    that.res = JSON.parse(res);
                    if (that.res.code == "21") {
                        that.loginMes.style.display = "none";
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

            ajax.init({
                url: that.cztUrl,
                data: {
                    token: token,
                    type: "showNum",
                    goodid: goodid,
                }
            }).then((res) => {
                let json = [];
                that.req = JSON.parse(res)
                for (var i in that.req.shop) {
                    that.num++;
                    json.push({
                        goodid: that.req.shop[i].goodid,
                        num: that.req.shop[i].num
                    })
                }

                that.name.innerHTML = `全部商品<span>${that.num}</span>`;
                that.shopnum.innerHTML = that.num;
                ajax.init({
                    url: that.cztUrl,
                    data: {
                        retr0: 1,
                        json: "json/search.json"
                    }
                }).then((res) => {
                    let str = "";
                    let num = -1;
                    that.res = JSON.parse(res);
                    for (var i in that.res[0].val) {
                        for (var j in json) {
                            if (that.res[0].val[i].goodId == json[j].goodid) {
                                num++;
                                let sum = that.res[0].val[i].price * json[j].num;
                                str += `   <li class="clear" style="background-color: #FFFAF1;">
                                <div id="pr-zh" class="item select">
                                    <div class="cart-table-line">
                                        <div class="chk-line">
                                            <div index="${num}" class="checkbox chk goodsid_${that.res[0].val[i].goodId}" ></div>
                                        </div>
                                        <div class="item-box"><a target="blank" href="http://product.bl.com/3246106.html"
                                                title="索尼（SONY）PlayStation 4 游戏手柄 水晶蓝（PS4）"> <img
                                                    src="${that.res[0].val[i].img}"></a>
                                            <div class="name"><a target="blank" href="http://product.bl.com/3246106.html"
                                                    title="索尼（SONY）PlayStation 4 游戏手柄 水晶蓝（PS4）"> ${that.res[0].val[i].name}
                                                </a></div>
                                            <div class="message-line"></div>
                                        </div>
                                        <div class="type-box"></div>
                                        <div class="item-price-box cc_cursor">
                                            <div class="aprice">¥${that.res[0].val[i].price}</div>
                                            <div class="icon"></div>
                                        </div>
                                        <div class="number-box">
                                            <div 
                                           class="input-line"><em class="reduce" 
                                           index = "${num}"id="reduce_${that.res[0].val[i].goodId}"
                                                   >-</em> <input class="text"
                                                     type="text" value="${json[j].num}"> <em 
                                                     index = "${num}"class="add"
                                                    id="add_${that.res[0].val[i].goodId}" >+</em></div>
                                        </div>
                                        <div class="price-box cc_cursor">
                                            <div class="price cc_cursor sumprice" index = "${num}"
                                            show = "1"    
                                            >¥${sum}</div>
                                        </div>
                                        <div class="action-box cc_cursor"><a class="add-favourite cc_pointer"
                                                href="javascript:void(0);" >移入收藏夹</a> <br><a
                                                class="delete cc_pointer" href="javascript:void(0);"
                                                >删除</a></div>
                                    </div>
                                </div>
                            </li>`;
                                that.zongjia += parseInt(sum);

                            }
                        }
                    }
                    that.sumzong.innerHTML = that.zongjia;
                    that.shopul.innerHTML = str;
                    that.asum = document.querySelectorAll(".sumprice");
                    that.aprice = document.querySelectorAll(".aprice")
                    that.ckb = document.querySelectorAll(".checkbox");
                    that.atext = document.querySelectorAll(".text");
                    that.addEvent();
                })
            })
        }
        addEvent() {
            var that = this;
            this.shopul.onclick = function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.className == "reduce") {

                    var t = target.parentNode.children[1].value >= 2 ? target.parentNode.children[1].value-- : target.parentNode.children[1].value;
                    var index = target.getAttribute("index");
                    that.asum[index].innerHTML = `￥${target.parentNode.children[1].value * parseInt(that.aprice[index].innerHTML.slice(1, that.aprice[index].innerHTML.length - 1))}`;
                    that.changeMoney();

                }
                if (target.className == "add") {
                    target.parentNode.children[1].value++;
                    var index = target.getAttribute("index");
                    that.asum[index].innerHTML = `￥${target.parentNode.children[1].value * parseInt(that.aprice[index].innerHTML.slice(1, that.aprice[index].innerHTML.length - 1))}`;
                    that.changeMoney();
                }
            }
            for (var i = 0; i < that.ckb.length; i++) {
                that.ckb[i].onclick = function () {
                    if (this.flag == undefined) {
                        this.flag = 0;
                    }
                    if (this.flag == 0) {
                        this.flag = 1;
                        this.style.background = "#fff";
                        that.asum[this.getAttribute("index")].setAttribute("show", 0);
                        that.changeMoney();
                        that.shopnum.innerHTML = --that.num;
                    } else if (this.flag == 1) {
                        this.flag = 0;
                        this.style.cssText = "background: url(//img.iblimg.com/respc-1/resources/v4.0/css/i/select.png) #d62233 no-repeat;";
                        that.asum[this.getAttribute("index")].setAttribute("show", 1);
                        that.shopnum.innerHTML = ++that.num;
                        that.changeMoney();
                    }
                    // let str = this.getAttribute("class");
                    // let arr = str.split(" ");
                    // var t;
                    // console.log(arr)
                    // if (t = arr.indexOf("chk")) {
                    //     arr.splice(t, 1);
                    // }
                    // this.className = arr.join(" ");
                }
            }
        }
        changeMoney() {
            let sum = 0;
            for (var i = 0; i < this.asum.length; i++) {
                let flag = parseInt(this.asum[i].getAttribute("show"));
                if (flag) {
                    sum += parseInt(this.asum[i].innerHTML.slice(1, this.asum[i].innerHTML.length))
                    this.shopul.children[i].style.cssText = "background-color: #FFFAF1;"
                } else {
                    this.shopul.children[i].style.cssText = "background-color: #fff;"
                }
            }
            this.sumzong.innerHTML = sum;
        }
    }
    new Shop();
})