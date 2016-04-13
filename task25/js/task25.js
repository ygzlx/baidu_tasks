window.onload = function(){
	var tree     = new MultiTree();
		rootNode = document.querySelector('.root'),
		text     = document.getElementById('text-in'),
		find     = document.getElementById('find'),
		add  	 = document.getElementById('add'),
		del 	 = document.getElementById('del');
	
	init();
	function init(){
		
		eventUtil.addHandler(rootNode,'click',function(event){
			tree.clear();
			if (event.target && event.target.nodeName === 'LI') {
				tree.select(event.target);
				tree.showChild();
			}
		});

		eventUtil.addHandler(add,'click',function(){
			tree.addNode(text.value);
		});

		eventUtil.addHandler(del,'click',function(){
			tree.deleteNode();
			tree.clear();
		});
		
		eventUtil.addHandler(find,'click',function(){
			tree.clear();
			tree.search(rootNode,text.value);
			tree.isFind();
		});
	}
};


