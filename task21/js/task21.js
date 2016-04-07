// JavaScript Document
window.onload = function(){
	var textInput = document.getElementById('tag-in'),
		tagQueue = document.getElementById('tag-queue'),
		interestInput = document.getElementById('interestings-in'),
		btnInterest = document.getElementById('interestings-btn'),
		interestQue = document.getElementById('interestings-queue');	
		
		contentQueue1 = new Array();//保存队列内容
		tagArray = new Array();//用于保存鼠标滑过之后的tag数组
		contentQueue2 = new Array();//保存队列内容
	
	init();	
	
	function init(){
			contentQueue1 = initcontentQueue(tagQueue);
			contentQueue2 = initcontentQueue(interestQue);
			textInput.addEventListener('keyup',function(e){
				watch(e);
			},false);
			btnInterest.addEventListener('click',addByLeft,false);
			tagQueue.addEventListener('click',function(e){//将事件添加给整个div
				if(e.target && e.target.nodeName.toLowerCase() == 'p'){
					tagArray = initcontentQueue(tagQueue);
					removeAny(tagQueue,tagArray,e.target);
				}
			},false);
			tagQueue.addEventListener('mouseover',function(e){//将事件添加给整个p
				if(e.target && e.target.nodeName.toLowerCase() == 'p'){
					display(e.target);
				}
			},false);
			tagQueue.addEventListener('mouseout',function(e){//将事件添加给整个p
				if(e.target && e.target.nodeName.toLowerCase() == 'p'){
					undisplay(e.target);
				}
			},false);
			interestQue.addEventListener('click',function(e){//将事件添加给整个div
				if(e.target && e.target.nodeName.toLowerCase() == 'p'){
					removeAny(interestQue,contentQueue2,e.target);
				}
			},false);
		}
	function watch(e){//监控input输入框的输入内容，一旦遇到回车、逗号、空格，就把输入的内容添加到tag中
		var text = textInput.value.trim();
		//console.log(e.keyCode);//键位码：13回车 32空格 188逗号
		var re = /[\r\,\，\s]+$/;
			array = new Array();
		if (e.keyCode == 13||e.keyCode == 32||e.keyCode == 188) {
			array = text.split(re);
			//console.log(array);
			if (!isExist(array[0],contentQueue1)) {contentQueue1.unshift(array[0]);}
			if (contentQueue1.length > 10) {
				for (var i = contentQueue1.length; i > 10; i--) {
					contentQueue1.pop();//删除数据末尾的元素
				}
			}
			paint(tagQueue,contentQueue1);
			document.getElementById('tag-in').value = null;//清空输入框
		}
	}
	function getAreaInput(){
		var textarea = new Array();
		var re = /[^a-zA-Z0-9\u4e00-\u9fa5]/;//正则表达式：所有在26个字母、数字和中文以外的符号
		textarea = interestInput.value.trim().split(re);//分割字符串成字符串数组
		return textarea;
		}
	function initcontentQueue(queue){
		var items = queue.getElementsByTagName('p');
			contentQueue = new Array();
			for (var i = 0; i < items.length; i++) {
				contentQueue.push(items[i].innerText);
			}
			return contentQueue;
		}
	function addByLeft(){
			var text = getAreaInput();
			for (var i = 0; i < text.length; i++) {
				//console.log(isExist(text[i],contentQueue2));
				if (!isExist(text[i],contentQueue2)) {
				contentQueue2.unshift(text[i]);//添加数据到数组的开始
				}
			}
			document.getElementById('interestings-in').value = null;//清空输入框
			if (contentQueue2.length > 10) {
				for (var i = contentQueue2.length; i > 10; i--) {
					contentQueue2.pop();//删除数据末尾的元素
				}
			}
			paint(interestQue,contentQueue2);
		}
	function display(e){
		e.innerText ='点击删除' + e.innerText;
	}
	function undisplay(e){
		e.innerText = e.innerText.substring(4,e.innerText.length);
	}
	function removeAny(queue,array,e){
		//console.log(e);
		//console.log(array);
		array.splice(array.indexOf(e.innerText),1);//指定位置开始删除指定个数的元素
		paint(queue,array);
		}
	function paint(queue,array){
		var content = '';
		for (var i = 0; i < array.length; i++) {
		 	content += '<p>' + array[i] +'</p>';
		 	}
		queue.innerHTML = content;
		}
	function isExist(str,array){//重复检查
		return array.includes(str);
	}
}
	