window.onload = function(){
	var tree     = new MultiTree();
		rootNode = document.querySelector('.root'),
		text     = document.getElementById('text-in'),
		find     = document.getElementById('find'),
		walk     = document.getElementById('walk');
	
	init();
	function init(){
		eventUtil.addHandler(find,'click',function(){
			tree.clearSearch();
			tree.searchOrder(rootNode,text.value);
			tree.isFind();
		});
		eventUtil.addHandler(walk,'click',function(){
			tree.preOrder(rootNode);
			tree.animation();
		});
	}
};


