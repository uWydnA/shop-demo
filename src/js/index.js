require(["js/swiper", "js/getCookies", "js/ajax"], function (swiper, gc, aj) {
    class Shop {
        constructor() {
            this.cztUrl = "http://127.0.0.2:8888/api";
            this.banner = document.querySelector("#banner");
            this.bul = document.querySelector("#banner .ben ul")
            this.bol = document.querySelector(".progress-bar-ol")
            this.prev = document.querySelector(".prev");
            this.next = document.querySelector(".next");
            this.loginName = document.querySelector("#tool .tool-r ul li")
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
                token: key
            }).then((res) => {
                console.log(res)
            })
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
            this.banner.onmouseover = function () {
                that.prev.style.display = "block";
                that.next.style.display = "block";
            }
            this.banner.onmouseout = function () {
                that.prev.style.display = "none";
                that.next.style.display = "none";
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