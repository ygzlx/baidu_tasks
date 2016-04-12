function MultiTree(){
	this.stack = [];
	this.isHold = false;
	this.flag = false;//查询结果标志，为true时，表示查询成功
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
//清除上一次的查找/选择 结果，表现为将设置的颜色恢复原样
MultiTree.prototype.clear = function() {
	var stack = this.stack;
	if (stack.length !== 0) {
		stack[stack.length-1].style.backgroundColor = '#FFFFFF';
    	this.stack = [];
	}
};
//被选择的节点颜色设置
MultiTree.prototype.select = function(target) {
	target.style.backgroundColor = "#F125C2";
	this.stack.push(target);//讲所选节点放在stack中保存	
};
MultiTree.prototype.addNode = function(insertContent) {
	var textNode = document.createTextNode(insertContent);
	var node 	 = document.createElement('DIV');
	var target   = this.stack[this.stack.length-1];
	console.log(insertContent);
	if (insertContent.trim() === '') {
		alert('请输入插入节点的内容！');
	}
	else if(this.stack.length === 0){
		alert('请选择插入节点的位置！');
	}
	else{
		node.appendChild(textNode);
		node.class = 'flex-items';
		target.appendChild(node);
	}
};
//删除子节点
MultiTree.prototype.deleteNode = function() {
	var childNode = this.stack[this.stack.length-1];
	if (this.stack.length === 0) {
		alert('请先选择要删除的节点！');
	}
	else {
		childNode.parentNode.removeChild(childNode);
	}
};