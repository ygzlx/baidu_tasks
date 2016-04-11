function BinaryTree(){
	this.stack = new Array();
	this.isHold = false;
}
// 前序遍历
BinaryTree.prototype.preOrder = function(node) {
	// body...
	this.stack.push(node);
	if (node.firstElementChild) {
		this.preOrder(node.firstElementChild);
	}
	if (node.lastElementChild) {
		this.preOrder(node.lastElementChild);
	}
};
// 中序遍历
BinaryTree.prototype.inOrder = function(node) {
	// body...
	if (node.firstElementChild) {
		this.inOrder(node.firstElementChild);
	}
	this.stack.push(node);
	if (node.lastElementChild) {
		this.inOrder(node.lastElementChild);
	}
};
// 后序遍历
BinaryTree.prototype.postOrder = function(node) {
	// body...
	if (node.firstElementChild) {
		this.postOrder(node.firstElementChild);
	}
	if (node.lastElementChild) {
		this.postOrder(node.lastElementChild);
	}
	this.stack.push(node);
};
// 动画效果
BinaryTree.prototype.animation = function(){
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