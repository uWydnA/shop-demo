define([], function () {
    class GetCookie {
        init(options) {
            this.key = options.key;
            var arr = document.cookie.split("; ");
            var v = "";
            arr.forEach((val) => {
                if (val.split("=")[0] == this.key) {
                    v = val.split("=")[1];
                }
            })
            return v;
        }
    }
    return new GetCookie;
})