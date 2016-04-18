// 封装TreeNode
function TreeNode (obj) {
	this.parent = obj.parent;
	this.children = obj.children || [];
	this.data = obj.data || "";
	this.selfElement = obj.selfElement; // 访问对应的DOM结点
	this.selfElement.TreeNode = this;   // 对应的DOM结点访问回来
}

// 对应DOM结点的样式渲染
TreeNode.prototype.render = function(arrow, visibility, toHighlight, delHighlight) {
	if(arguments.length < 3){
		toHighlight = false;
		delHighlight = false;
	}
	// 叶节点，设为空箭头
	// 折叠状态，设为右箭头
	// 展开状态，设为下箭头
	if(arrow){

		if(this.isLeaf()){
			this.selfElement.getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
		}else if(this.isFolded()){
			this.selfElement.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
		}else{
			this.selfElement.getElementsByClassName("arrow")[0].className = "arrow down-arrow";
		}
	}
	// 改变可见性
	if(visibility){
		if(this.selfElement.className.indexOf("node-visible") == -1){
			this.selfElement.className = this.selfElement.className.replace("hidden","visible");
		}else{
			this.selfElement.className = this.selfElement.className.replace("visible","hidden");
		}
	}
	// 设为高亮
	if(toHighlight){
		this.selfElement.getElementsByClassName("node-title")[0].className = "node-title node-title-highlight";
	}
	// 取消高亮
	if(delHighlight){
		this.selfElement.getElementsByClassName("node-title")[0].className = "node-title";
	}
};

// 删除结点，DOM会自动递归删除子节点，TreeNode手动递归删除子节点
TreeNode.prototype.deleteNode = function() {
	// 递归删除子节点
	if(!this.isLeaf()){
		for(var i=0, len=this.children.length; i<len; i++){
			this.children[i].deleteNode();
		}
	}
	// 移除对应的DOM结点
	this.parent.selfElement.removeChild(this.selfElement);
	// 从父节点删除该孩子
	for(var i=0, len=this.parent.children.length; i<len; i++){
		if(this.parent.children[i] == this){
			this.parent.children.splice(i,1);
			break;
		}
	}
	// 调整结点箭头样式
	this.parent.render(true,false);
};

// 增加子节点
TreeNode.prototype.addNode = function(text) {
	if(text == null){
		return this;
	}
	if(text.trim()==""){
		alert("节点内容不能为空");
		return this;
	}
	// 先增加子节点，再渲染自身样式

	// 若当前结点关闭，则将其展开
	if(!this.isLeaf() && this.isFolded()){
		this.toggleFold();
	}
	// 创建新的DOM结点并附加
	var newNode = document.createElement("div");
	newNode.className = "node-visible";
	var newBody = document.createElement("label");
	newBody.className = "node-body";
	var newSymbol = document.createElement("div");
	newSymbol.className = "arrow empty-arrow";
	var newTitle = document.createElement("span");
	newTitle.className = "node-title";
	newTitle.innerHTML = text;
	var space = document.createElement("span");
	space.innerHTML = "&nbsp;&nbsp";
	var newAdd = document.createElement("img");
	newAdd.className = "addIcon";
	newAdd.src = "./images/add.png";
	var newDelete = document.createElement("img");
	newDelete.className = "deleteIcon";
	newDelete.src = "./images/delete.png";
	newBody.appendChild(newSymbol);
	newBody.appendChild(newTitle);
	newBody.appendChild(space);
	newBody.appendChild(newAdd);
	newBody.appendChild(newDelete);
	newNode.appendChild(newBody);
	this.selfElement.appendChild(newNode);

	// 创建对应的TreeNode对象，并添加到子节点序列
	this.children.push(new TreeNode({parent:this,children:[],data:text,selfElement:newNode}));

	// 渲染自身样式
	this.render(true,false);
	return this;
};

// 展开、折叠结点
TreeNode.prototype.toggleFold = function() {
	// 叶节点 无需操作
	if(this.isLeaf()){
		return this;
	}
	// 改变所有结点的可见状态
	for(var i=0, len=this.children.length; i<len; i++){
		this.children[i].render(false,true);
	}
	// 渲染本节点的箭头
	this.render(true,false);

	return this;
};

// 判断是否为叶节点
TreeNode.prototype.isLeaf = function() {
	return this.children.length == 0;
};

// 判断结点是否处于折叠状态
TreeNode.prototype.isFolded = function() {
	if(this.isLeaf()){
		return false;
	}
	if(this.children[0].selfElement.className == "node-visible"){
		return false;
	}
	return true;
};

// 创建根节点对应的TreeNode对象
var root = new TreeNode({parent:null,children:[],data:"程序员",selfElement:document.getElementsByClassName("node-visible")[0]});
// 为root绑定事件代理，处理所有节点的点击事件
addEvent(root.selfElement, "click", function(e){
	var target = e.target || e.srcElement;
	var domNode = target;
	// 找到类名含有node前缀的DOM结点
	while(domNode.className.indexOf("node-visible")==-1){
		domNode = domNode.parentNode;
	}
	// 获取DOM对象对应的TreeNode对象
	var selectedNode = domNode.TreeNode;
	// 文件和箭头：触发toggle操作、点在加号、点在减号上
	if(target.className.indexOf("node-title") != -1 || target.className.indexOf("arrow") != -1){
		selectedNode.toggleFold();
	}else if(target.className == "addIcon"){
		selectedNode.addNode(prompt("请输入子节点内容："));
	}else if(target.className == "deleteIcon"){
		selectedNode.deleteNode();
	}

});

// 给root绑定广度优先搜索，返回一个搜索结果队列
root.search = function(query){
	var resultList = [];
	var queue = [];
	var current = this;

	queue.push(current);
	while(queue.length > 0){
		current = queue.shift();
		current.render(false,false,false,true);
		if(current.data == query){
			resultList.push(current);
		}
		for(var i=0,len=current.children.length; i<len; i++){
			queue.push(current.children[i]);
		}
	}
	return resultList;
};

// 搜索并显示结果
addEvent(document.getElementById("search"), "click", function(){
	var text = document.getElementById("search-input").value.trim();
	if(text == ""){
		document.getElementById("result").innerHTML = "请输入查询内容！";
		return;
	}
	// 执行搜索
	var resultList = root.search(text);
	// 处理搜索结果
	if(resultList.length == 0){
		document.getElementById("result").innerHTML = "没有查询到符合条件的结点！";
	}else{
		document.getElementById("result").innerHTML = "查询到" + resultList.length + "个符合条件的结点";
        // 将所有结果结点沿途展开，结果结点加粗红色展示
        var pathNode;
        for (var x = 0;x<resultList.length;x++) {
            pathNode = resultList[x];
            pathNode.render(false, false, true, false);
            while (pathNode.parent != null) {
                if (pathNode.selfElement.className == "node-hidden"){
                	pathNode.parent.toggleFold();
                } 
                pathNode = pathNode.parent;
            }
        }
	}
});

//清除搜索结果
addEvent(document.getElementById("clear"), "click", function(){
	document.getElementById("search-input").value = "";
	root.search(null);
	document.getElementById("result").innerHTML = "";
});

// 兼容不同浏览器
function addEvent (element, type, handler) {
	if(element.addEventListener){
		element.addEventListener(type,handler);
	}else if(element.attachEvent){
		element.attachEvent("on" + type, handler);
	}else{
		element["on" + type] = handler;
	}
}

//=======================================Demo展示区==================================================
//动态生成Demo树
root.addNode("技术").addNode("IT公司").addNode("谈笑风生");
root.children[0].addNode("C++").addNode("Python").addNode("Java").addNode("C#").addNode("PHP").toggleFold();
root.children[0].children[4].addNode("JavaScript").toggleFold();
root.children[1].addNode("百度").addNode("腾讯").addNode("阿里").toggleFold();
root.children[2].addNode("身经百战").addNode("JavaScript").addNode("吟两句诗").toggleFold();
root.children[2].children[2].addNode("苟利国家生死以").toggleFold();
//初始化查询Demo值
document.getElementById("search-input").value = "JavaScript";
//=================================================================================================