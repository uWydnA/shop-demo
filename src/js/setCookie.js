define([], function () {
    class SetCookie {
        init(options) {
            this.key = options.key;
            this.val = options.val;
            document.cookie = this.key + "=" + this.val;
        }
    }
    return new SetCookie;
})