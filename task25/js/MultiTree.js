function MultiTree(){
	this.stack = [];
	this.flag = false;//查询结果标志，为true时，表示查询成功
}

//被选择的节点文字颜色设置为白色
MultiTree.prototype.select = function(target) {
	if(target.className === "folderturn"){
		target.className = "folder";
	}
	else{
		target.className = "folderturn";
	}
	this.stack.push(target);//将所选节点放在stack中保存	
};

// 显示子节点
MultiTree.prototype.showChild = function() {
	var node = this.stack[this.stack.length-1];
	if (node.children.length !== 0) {//如果所点击的节点的子节点存在
		if(node.children[0].style.display === 'none'){
			node.children[0].style.display = 'list-item';
		}
		else{
			node.children[0].style.display = 'none';
		}
	}
};

// 遍历查找
MultiTree.prototype.search = function(node,searchContent) {
	// body...
	if(node.firstChild.nodeValue.trim() === searchContent){
		this.stack.push(node);
		this.flag = true;//查找成功
	}
	else{
		this.stack.push(node);
		if (node.children.length !== 0) {
			for (var i = 0; i < node.children.length; i++) {
				if(this.flag ===false){
					this.search(node.children[i],searchContent);
				}
				else{
					return;
				}
			}
		}
	}
};
//查找之后的操作
MultiTree.prototype.isFind = function() {
	if (this.flag === true) {
		this.flag = false;
		for(var i=1,len=this.stack.length;i<len;i++){
			this.stack[i].parentNode.style.display = 'list-item';
		}
		this.stack[this.stack.length-1].style.color = '#FFFFFF';
	}
	else {
		alert("can't find");
	}
};

//清除上一次的查找/选择 结果，表现为将设置的颜色恢复原样
MultiTree.prototype.clear = function() {
	var stack = this.stack;
	if (stack.length !== 0) {
		stack[stack.length-1].style.color = '#6e8095';
    	this.stack = [];
	}
};

// 添加节点
MultiTree.prototype.addNode = function(insertContent) {
	var textNode = document.createTextNode(insertContent),
		liNode 	 = document.createElement('LI'),
		ulNode 	 = document.createElement('UL');

	var target   = this.stack[this.stack.length-1];

	if (insertContent.trim() === '') {
		alert('请输入插入节点的内容！');
	}
	else if(this.stack.length === 0){
		alert('请选择插入节点的位置！');
	}
	else{
		if (target.children.length === 0) {//如果子节点不存在
			liNode.appendChild(textNode);
			liNode.className = 'folder';
			ulNode.appendChild(liNode);
		    ulNode.className = 'child-list';
		    ulNode.style.display = 'list-item';
			target.appendChild(ulNode);
		}
		else if (target.children[0].nodeName === 'UL') {//如果存在ul节点，则直接添加子节点到ul
			liNode.appendChild(textNode);
			liNode.className = 'folder';
			target.children[0].appendChild(liNode);
		}
	}
};

//删除所选节点及其子节点
MultiTree.prototype.deleteNode = function() {
	var childNode = this.stack[this.stack.length-1];
	if (this.stack.length === 0) {
		alert('请先选择要删除的节点！');
	}
	else {
		childNode.parentNode.removeChild(childNode);
	}
};