function MultiTree(){
	this.stack = [];
	this.isHold = false;
	this.flag = false;
}
// 前序遍历
MultiTree.prototype.preOrder = function(node) {
	// body...
	this.stack.push(node);
	if (node.children.length !== 0) {
		for (var i = 0; i < node.children.length; i++) {
			this.preOrder(node.children[i]);
		}
	}
};
// 遍历查找
MultiTree.prototype.searchOrder = function(node,searchContent) {
	// body...
	if(node.firstChild.nodeValue.trim() === searchContent){
		this.stack.push(node);
		this.flag = true;
	}
	else{
		this.stack.push(node);
		if (node.children.length !== 0) {
			for (var i = 0; i < node.children.length; i++) {
				if(this.flag ===false){
					this.searchOrder(node.children[i],searchContent);
				}
				else{
					return;
				}
			}
		}
	}
};

MultiTree.prototype.isFind = function() {
	if (this.flag === true) {
		this.flag = false;
		this.searchAnimation();
	}
	else {
		alert("can't find");
	}
};
// 动画效果
MultiTree.prototype.animation = function(){
	var stack   = this.stack,
        speeder = document.querySelector("#speeder"),
        iter    = 0,
        self    = this,
        timer;

    self.stack = [];
    if(!self.isHold) {
        self.isHold = true;
        stack[iter].style.backgroundColor = "#F125C2";
        timer = setInterval(function() {
            if(iter == stack.length-1) {
                stack[iter].style.backgroundColor = "#FFFFFF";
                self.isHold = false;
                clearInterval(timer);
            } else {
                ++iter;
                stack[iter-1].style.backgroundColor = "#FFFFFF";
                stack[iter].style.backgroundColor = "#F125C2";
            }
        }, speeder.value);
    }
};


MultiTree.prototype.searchAnimation = function(){
	var stack   = this.stack,
        speeder = document.querySelector("#speeder"),
        iter    = 0,
        self    = this,
        timer;
    if(!self.isHold) {
        self.isHold = true;
        stack[iter].style.backgroundColor = "#F125C2";
        timer = setInterval(function() {
            if(iter == stack.length-1) {
                stack[iter].style.backgroundColor = "#F125C2";
                self.isHold = false;
                clearInterval(timer);
            } else {
                ++iter;
                stack[iter-1].style.backgroundColor = "#FFFFFF";
                stack[iter].style.backgroundColor = "#F125C2";
            }
        }, speeder.value);
    }
};

MultiTree.prototype.clearSearch = function() {
	var stack = this.stack;
	if (stack.length !== 0) {
		stack[stack.length-1].style.backgroundColor = '#FFFFFF';
    	this.stack = [];
	}
};