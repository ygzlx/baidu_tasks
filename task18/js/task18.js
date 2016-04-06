// JavaScript Document
window.onload = function(){
	var queue = document.getElementById('queue'),
		leftIn = document.getElementById('left-in'),
		rightIn = document.getElementById('right-in'),
		leftOut = document.getElementById('left-out'),
		rightOut = document.getElementById('right-out');
	var textInput = document.getElementById('text-in');	
		contentQueue = new Array();//保存队列内容
	
	init();	
	
	function init(){
		initcontentQueue();
		leftIn.addEventListener('click',addByLeft,false);
		rightIn.addEventListener('click',addByRight,false);
		leftOut.addEventListener('click',removeByLeft,false);
		rightOut.addEventListener('click',removeByRight,false);
		queue.addEventListener('click',function(e){
			if(e.target && e.target.nodeName.toLowerCase() == 'div'){
				removeAny(e.target);
			}
		},false);
	}
	function getInput(){
		var text = textInput.value.trim();
		if(!text.match(/^\d+$/)) {
        alert("必须为整数！")
        return;
    	}
    	else return text;
	}
	function initcontentQueue(){
		var items = queue.getElementsByTagName('div');
			for (var i = 0; i < items.length; i++) {
				contentQueue.push(items[i].innerText);
			}
	}
	function addByLeft(){
			var text = getInput();
			if(text){//如果输入值有效
				contentQueue.unshift(text);
			}
			document.getElementById('text-in').value = null;//清空输入框
			paint(contentQueue);
		}
	function addByRight(){
			var text = getInput();
			if(text){
				contentQueue.push(text);
			}
			document.getElementById('text-in').value = null;
			paint(contentQueue);
		}
	function removeByLeft(){
			var items = queue.getElementsByTagName('div');
			alert(items[0].innerText);
			contentQueue.shift();//删除数组前边元素
			paint(contentQueue);
		}
	function removeByRight(){
			var items = queue.getElementsByTagName('div');
			alert(items[items.length-1].innerText);
			contentQueue.pop();//删除数据末尾的元素
			paint(contentQueue);
		}
	function removeAny(e){
		//console.log(contentQueue.indexOf(e.innerText));
		contentQueue.splice(contentQueue.indexOf(e.innerText),1);//指定位置开始删除指定个数的元素
		paint(contentQueue);
	}
	function paint(e){
		 var content = '';
		 for (var i = 0; i < e.length; i++) {
		 	content += '<div>' + e[i] +'</div>';
		 }
		 queue.innerHTML = content;
	}
}
	