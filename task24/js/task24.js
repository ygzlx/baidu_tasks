window.onload = function(){
	var tree     = new MultiTree();
		rootNode = document.querySelector('.root'),
		text     = document.getElementById('text-in'),
		find     = document.getElementById('find'),
		add  	 = document.getElementById('add'),
		walk     = document.getElementById('walk'),
		del 	 = document.getElementById('del');
	
	init();
	function init(){
		eventUtil.addHandler(find,'click',function(){
			tree.clear();
			tree.searchOrder(rootNode,text.value);
			tree.isFind();
		});
		eventUtil.addHandler(walk,'click',function(){
			tree.preOrder(rootNode);
			tree.animation();
		});
		eventUtil.addHandler(rootNode,'click',function(event){
			tree.clear();
			if (event.target && event.target.nodeName === 'DIV') {
				tree.select(event.target);
			}
		});
		eventUtil.addHandler(add,'click',function(){
			console.log(text.value);
			tree.addNode(text.value);
		});
		eventUtil.addHandler(del,'click',function(){
			tree.deleteNode();
			tree.clear();
		});
		
		
	}
};


