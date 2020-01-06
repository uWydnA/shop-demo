define([], function () {
    class Swiper {
        init(options) {
            this.dom = options.dom;
            this.bul = options.bul;
            this.bol = options.bol;
            this.prev = options.prevClassName;
            this.next = options.nextClassName;
            this.index = options.index
            this.addEvent();
        }
        addEvent() {
            var that = this;
            this.dom.onclick = function (eve) {
                let e = eve || window.event;
                let target = e.targer || e.srcElement;
                if (target.className == that.prev) {
                    if (that.index == 0) {
                        that.index = that.bul.children.length - 1;
                    } else {
                        that.index--;
                    }
                    that.displayBanner();
                }
                if (target.className == that.next) {
                    if (that.index == that.bul.children.length - 1) {
                        that.index = 0;
                    } else {
                        that.index++;
                    }
                    that.displayBanner();
                }
                if (target.className == "circle" || target.className == "active circle") {
                    that.index = (target.getAttribute("index"));
                    that.displayBanner();
                }
            }
        }
        displayBanner() {
            for (var i of this.bul.children) {
                i.style.opacity = "0";
            }
            for (var u of this.bol.children) {
                u.children[0].className = "circle";
            }
            this.bul.children[this.index].style.opacity = "1";
            setTimeout(() => {
                this.bol.children[this.index].children[0].className = "active circle";
            }, 200)
        }

    }
    return new Swiper;
})