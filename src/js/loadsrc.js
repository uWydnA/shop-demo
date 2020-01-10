define([], function () {
    class Load {
        init(options) {
            this.dom = options.dom;
            this.addEvent();
        }
        addEvent() {
            var arr = [];
            for (var i of this.dom) {
                arr.push(i);
            }
            for (var i = 0; i < arr.length; i++) {
                var t = document.documentElement.clientHeight;
                if (arr[i].offsetTop <= t) {
                    var img = arr[i].children[0].children[0];
                    img.src = img.getAttribute("datasrc");
                    arr.splice(i, 1)
                    i--;
                }
            }
            onscroll = function () {
                var t = document.documentElement.clientHeight;
                var scroll = document.documentElement.scrollTop;
                for (var i = 0; i < arr.length; i++) {
                    var t = document.documentElement.clientHeight;
                    if (arr[i].offsetTop < t + scroll) {
                        var img = arr[i].children[0].children[0];
                        img.src = img.getAttribute("datasrc");
                        arr.splice(i, 1)
                        i--;
                    }
                }

            }
        }
    }
    return new Load;
})