define([], function () {
    class focus {
        init(options) {
            this.dom = options.dom;
            this.addEvent();
        }
        addEvent() {
            this.dom.className = "right";
            this.dom.parentNode.parentNode.parentNode.children[2].children[0].style.display = "block";
            this.dom.parentNode.parentNode.parentNode.children[2].children[1].style.display = "none";
        }
    }
    return new focus();
})