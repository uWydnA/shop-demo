define([], function () {
    class Ajax {
        init(options) {
            var that = this;
            var p = new Promise(function (success) {
                that.url = options.url;
                that.data = options.data || {};
                let str = "";
                let xhr = new XMLHttpRequest();
                for (var i in that.data) {
                    str += `${i}=${that.data[i]}&`;
                }
                that.url = that.url + "?" + str + "__retr0__=" + new Date().getTime();
                xhr.open("get", that.url, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        success(xhr.responseText);
                    }
                }
                xhr.send();
            })
            return p;
        }
    }
    return new Ajax();
})