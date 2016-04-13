/*
 构造函数
 私有方法和属性放在构造函数内
*/
function ListObj(divContainer){
	this.queue = [];
	this.render = function(){
		var str = this.queue.reduce(function(s,v){
			return s+"<div>"+v+"</div>"
		},"");
		divContainer.innerHTML = str;
		addDivEvent(divContainer,this);
	};
}

//共有方法和属性放在原型链上面。避免每个实例斗艳创造新的方法和属性
ListObj.prototype.del = function(str) {
	this.queue.splice(str,1);
	this.render();
};

ListObj.prototype.push = function(str) {
	this.queue.push(str);
};

ListObj.prototype.unshift = function(str) {
	this.queue.unshift(str);
};

ListObj.prototype.pop = function(str) {
	this.queue.pop(str);
};

ListObj.prototype.shift = function(str) {
	this.queue.shift(str);
};

var tagContainer = document.getElementById("tag-box");
var hobbyContainer = document.getElementById("hobby-box");
var tagList = new ListObj(tagContainer);
var hobbyList = new ListObj(hobbyContainer);

// 绑定事件
var tagInput = document.getElementById("input-tag");
tagInput.onkeyup = updateTag;

var hobbyInput = document.getElementById("input-hobby");
var hobbyBtn = document.getElementById("add-hobby");
hobbyBtn.onclick = updateHobby;

//绑定div事件
function addDivEvent(divContainer,list){
	var btn = divContainer.getElementsByTagName('div');
	for(var i=0; i<btn.length; i++){
		btn[i].onclick = function(i){
			return function(){
				list.del(i);
			}
		}(i);
	}
}

//点击确认兴趣爱好事件
function updateHobby(){
	var arr = hobbyInput.value.split(/,|，|`|、| |　|\t|\r|\n/)
								.filter(function(a){return a})
								.forEach(function(value){
									if(hobbyList.queue.indexOf(value) === -1){
										hobbyList.push(value);
										if(hobbyList.queue.length > 10){
											hobbyList.shift()
										}
									}
								});
	hobbyInput.value = "";
	hobbyList.render();
}

//每次tag按逗号空格回车的事件
//用keyup的理由是内容已经输入文本框了，可以获取最后一个字符
function updateTag(e){
	var str = this.value;
	if(/(,| |\，)$/.test(str)||e.keyCode===13){
		var newTag = str.match(/(^[^,\， ]*)/)[0];
		if(tagList.queue.indexOf(newTag)===-1 && newTag!=""){
			tagList.push(newTag);
			if(tagList.queue.length>10){
				tagList.shift();
			}
			tagList.render();
		}
		this.value = "";
	}
}