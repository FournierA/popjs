(function(){

    this.Pop = function(){

        this.list = [];
        this.closeBtn = null;
        this.alert = null;
        this.transitionEnd = transitionSelect();

        var defaults = {
            className: "warning",
            closeBtn: true,
            parent: document.body,
            content: "",
            delay: false
        }

        if(arguments[0] && typeof arguments[0] === "object"){
            this.options = extendDefaults(defaults, arguments[0]);
        }
    }

    Pop.prototype.add = function(content){
        if(content !== undefined) this.options.content = content;
        build.call(this);
    }

    Pop.prototype.push = function(content){

        var _ = this;

        if(content !== undefined)
            this.options.content = content;
        build.call(this);
        initializeEvents.call(this);
        window.getComputedStyle(this.alert).height;
        this.alert.className = this.alert.className + " open";

        if(typeof this.options.delay === "number"){
            setTimeout(function(){
                _.alert.className = _.alert.className.replace(" open", "");

                _.alert.addEventListener(_.transitionEnd, function(){
                    _.alert.parentNode.removeChild(_.alert);
                });
            }, this.options.delay);
        }
    }

    Pop.prototype.close = function(){

        var _ = this;

        this.alert.className = this.alert.className.replace(" open", "");

        this.alert.addEventListener(this.transitionEnd, function(){
            _.alert.parentNode.removeChild(_.alert);
        });
    }

    function build(){

        var content, docFrag, parent;

        if(typeof this.options.content === "string")
            content = this.options.content;
        else
            content = this.options.content.innerHTML;

        docFrag = document.createDocumentFragment();

        this.alert = document.createElement("div");
        this.alert.className = "pop " + this.options.className;
        this.alert.innerHTML = content;

        if(this.options.closeBtn === true){
            this.closeBtn = document.createElement("span");
            this.closeBtn.className = "close-btn";
            this.closeBtn.innerHTML = "&times;";
            this.alert.appendChild(this.closeBtn);
        }

        docFrag.appendChild(this.alert);

        if(typeof this.options.parent === "string")
            parent = document.getElementById(this.options.parent);
        else
            parent = this.options.parent;

        parent.appendChild(docFrag);
    }

    function transitionSelect() {
        var el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
          if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
          }
        }
        return source;
    }

    function initializeEvents(){
        if(this.closeBtn){
            this.closeBtn.addEventListener('click', this.close.bind(this));
        }
    }

}());