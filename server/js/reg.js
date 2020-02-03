define([], function () {
    class CheckReg {
        init(options) {
            this.dom = options.dom
            this.reg = options.reg;
            this.flag = options.flag || 0;
            this.watch = options.watch || 0;
            this.result = 0;
            return this.checkReg();
        }
        checkReg() {
            let userreg = this.reg;
            if (!userreg.test(this.dom.value)) {
                this.dom.className = "errer";
                this.dom.parentNode.parentNode.parentNode.children[2].children[0].style.display = "none";
                this.dom.parentNode.parentNode.parentNode.children[2].children[1].style.display = "block";
            } else {
                this.result = 1;
                this.dom.className = "normal";
                if (!this.flag) {
                    this.dom.parentNode.parentNode.parentNode.children[2].children[0].style.display = "none";
                } else {
                    let mreg = /[0-9]+[a-z]+/;
                    if (mreg.test(this.dom.value)) {
                        let mima = this.dom.parentNode.parentNode.parentNode.children[2].children[0].children;
                        for (var i = 2; i < mima.length; i++) {
                            mima[i].className = "strength-1";
                        }
                        mima[3].className = "strength-1 strengthatcive";
                        if (this.dom.value.length > 10) {
                            for (var i = 2; i < mima.length; i++) {
                                mima[i].className = "strength-1";
                            }
                            mima[4].className = "strength-1 strengthatcive";
                        }
                    }


                }
                this.dom.parentNode.parentNode.parentNode.children[2].children[1].style.display = "none";
                if (this.watch) {

                } else {
                    this.dom.parentNode.parentNode.parentNode.children[2].children[2].style.display = "block";
                }
            }
            if (this.watch) {
                if (this.watch.value != this.dom.value || this.watch.value == "" || this.dom.value == "") {
                    this.dom.parentNode.parentNode.parentNode.children[2].children[0].style.display = "none";
                    this.dom.parentNode.parentNode.parentNode.children[2].children[1].style.display = "block";
                    this.watch.parentNode.parentNode.parentNode.children[2].children[1].style.display = "block";
                } else if (this.watch.value == this.dom.value) {
                    this.dom.parentNode.parentNode.parentNode.children[2].children[0].style.display = "none";
                    this.dom.parentNode.parentNode.parentNode.children[2].children[1].style.display = "none";
                    this.watch.parentNode.parentNode.parentNode.children[2].children[1].style.display = "none";
                    this.dom.parentNode.parentNode.parentNode.children[2].children[2].style.display = "block";
                    this.watch.parentNode.parentNode.parentNode.children[2].children[2].style.display = "block";
                }
            }
            return this.result;
        }
    }
    return new CheckReg;
})