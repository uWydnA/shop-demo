define([], function () {
    class Session {
        init(options) {
            this.type = options.type;
            this.key = options.key || "";
            this.val = options.val || "";
            this.addEvent();
        }
        addEvent() {
            eval()
            `sessionStorage.${this.type}(this.key)`
        }
    }
})