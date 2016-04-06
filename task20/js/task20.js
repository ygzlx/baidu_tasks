// JavaScript Document
window.onload = function(){
	var queue = document.getElementById('queue'),
		leftIn = document.getElementById('left-in'),
		rightIn = document.getElementById('right-in'),
		leftOut = document.getElementById('left-out'),
		rightOut = document.getElementById('right-out'),
		find = document.getElementById('find'),//查询按钮
		textareaInput = document.getElementById('textarea-in');	//待插入的输入
		textInput = document.getElementById('text-in');	//查询输入框的输入
		contentQueue = new Array();//保存队列内容
	
	init();	
	
	function init(){
			initcontentQueue();
			leftIn.addEventListener('click',addByLeft,false);
			rightIn.addEventListener('click',addByRight,false);
			leftOut.addEventListener('click',removeByLeft,false);
			rightOut.addEventListener('click',removeByRight,false);
			find.addEventListener('click',mark,false);
			queue.addEventListener('click',function(e){//将事件添加给整个div
				if(e.target && e.target.nodeName.toLowerCase() == 'div'){
					removeAny(e.target);
				}
			},false);
		}
	function getInput(){
		var text = new Array();
		var re = /[^a-zA-Z0-9\u4e00-\u9fa5]/;//正则表达式：所有在26个字母、数字和中文以外的符号
		text = textareaInput.value.trim().split(re);//分割字符串成字符串数组
		return text;
		}
	function initcontentQueue(){
		var items = queue.getElementsByTagName('div');
			for (var i = 0; i < items.length; i++) {
				contentQueue.push(items[i].innerText);
			}
		}
	function addByLeft(){
			var text = getInput();
			for (var i = 0; i < text.length; i++) {
				contentQueue.unshift(text[i]);
			}
			document.getElementById('textarea-in').value = null;//清空输入框
			paint(contentQueue);
		}
	function addByRight(){
			var text = getInput();
			for (var i = 0; i < text.length; i++) {
				contentQueue.push(text[i]);
			}
			document.getElementById('textarea-in').value = null;
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
	function mark(){
			var textIn = textInput.value.trim();
			var markQueue = new Array(),
				findQueue = contentQueue;
			for (var i = 0; i < findQueue.length; i++) {
				if(findQueue[i].includes(textIn))
					markQueue.push(i);
			}
			// console.log(textIn);
			//paint(contentQueue);//每次查询之后恢复原样
			//var divs = queue.getElementsByTagName('div');
			// for (var j = 0; j < markQueue.length; j++) {
			//  	divs[markQueue[j]].style.color = 'black';
			//}
			for (var j = 0; j < markQueue.length; j++) {
				findQueue[markQueue[j]] = findQueue[markQueue[j]].replace(textIn,'<span>'+textIn+'</span>');
			}
			paint(findQueue);
			document.getElementById('text-in').value = null;
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
	