window.onload = function(){
	var tree     = new BinaryTree();
		rootNode = document.querySelector('.top'),
		DLR      = document.getElementById('DLR'),
		LDR      = document.getElementById('LDR'),
		LRD      = document.getElementById('LRD');
	
	init();
	function init(){
		eventUtil.addHandler(DLR,'click',function(){
			tree.preOrder(rootNode);
			tree.animation();
		});
		eventUtil.addHandler(LDR,'click',function(){
			tree.inOrder(rootNode);
			tree.animation();
		});
		eventUtil.addHandler(LRD,'click',function(){
			tree.postOrder(rootNode);
			tree.animation();
		});
	}
}


