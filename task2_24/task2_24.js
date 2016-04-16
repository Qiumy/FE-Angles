var intervalID;

var select;
var domPath = [];

window.onload = function(){
	initTree();
};

// 初始化二叉树
function initTree(){
	tree = new Tree(8);
    tree.add(1, [])
        .add(5, [])
        .add(2, [])
        .add(3, [0])
        .add(6, [0])
        .add(12, [0])
        .add(14, [0])
        .add(7, [1])
        .add(9, [1])
        .add(11, [1])
        .add(10, [2])
        .add('你好', [2])
        .add(13, [2, 0])
        .add(15, []);
    createDOM(tree);
    initShow();
    addEvent();
}

// 展示区绑定监听事件
function initShow () {
    $('container').addEventListener("click",function(e){
        if(e.target.className == 'box'){
            if($(select)){
                $(select).className = 'box';
            }
            select = e.target.id;
            var popPath = path(e);
            domPath = [];
            for(var i=0; i< popPath.length; i++){
                if(popPath[i].id == "box0"){
                    break;
                }
                var index = popPath[i].id.replace("box","") - popPath[i].parentElement.firstElementChild.id.replace("box","");
                domPath.unshift(index);
            }
            $(select).className += " shadow";
        }
    });
}

//事件到根路径的冒泡事件
function path(e){
    var pathArray = [];
    var curPath = e.target;
    while(curPath.id != "box0"){
        pathArray.push(curPath);
        curPath = curPath.parentElement;
    }
    return pathArray;
}

// 根据树建立相应的dom结构
function createDOM(tree){
    var currentDOM;
    var nodeCnt = 1;
    var createPoint =1;
    if(!tree._root){
        return;
    }
    $('container').innerHTML = '<div class="box" id="box0">' + tree._root.value + '</div>';
    currentDOM = $('box0');
    tree.traverseBFS(function(node){
        node.children.forEach(function(elem){
            currentDOM.innerHTML += '<div class="box" id="box' + nodeCnt++ + '">' + elem.value + '</div>';
        });
        currentDOM = $('box' + createPoint++);
    });
    clearAll(tree);
}


// 清楚所有颜色标记
function clearAll(tree){
	for(var i=0; i<tree.size(); i++){
		$('box'+i).style.backgroundColor = 'white';
	}
}

// 定义一棵多叉树
function Tree(rootValue) {
	this._root = null;
	if (rootValue){
		this._root = {
			value: rootValue,
			parent: null,
			children: []
		};
	}
}

// 为多叉树添加方法
// add contains traverseDFS traverseBFS
Tree.prototype.add = function(value,treePath) {
	var addNode = {
		value: value,
		parent: null,
		children: []
	};

	if(this._root == null){
		this._root = addNode;
	}else{
        if(treePath){
            var cache = this._root;
            for(var i=0; i<treePath.length; i++){
                cache = cache.children[treePath[i]];
            }
            cache.children.push(addNode);
            addNode.parent = cache;
        }
		return this;
	}
};

Tree.prototype.contains = function(value,traversal) {
	var isContains = false;
	traversal.call(this, function(node){
		if(node.value == value){
			isContains = true;
		}
	});
	return isContains;
};

Tree.prototype.traverseDFS = function(process) {
	(function dsf(node){
		process(node);
		if(node.children.length > 0){
			for(var i=0; i<node.children.length; i++){
				dsf(node.children[i]);
			}
		}
	})(this._root);
};

Tree.prototype.traverseBFS = function(process) {
	var cache = [];
	var curNode = this._root;
	while(curNode){
		for(var i=0; i<curNode.children.length; i++){
			cache.push(curNode.children[i]);
		}
		process(curNode);
		curNode = cache.shift();
	}
};

Tree.prototype.toArray = function(process) {
	var showArray = [];
    process.call(this, function (node) {
        showArray.push(node.value);
    });
    return showArray;
};

Tree.prototype.pathToArray = function(process) {
    var allPathArray = [];
    process.call(this,function(node){
        var curNode = node;
        var pathArray = [];
        while(curNode.parent!=null){
            pathArray.unshift(curNode.parent.children.indexOf(curNode));
            curNode = curNode.parent;
        }
        allPathArray.push(pathArray);
    });
    return allPathArray;
};

Tree.prototype.remove = function(treePath) {    
    if(!parent){
        this._root = null;
    }else{
        if(treePath){
            var cache = this._root;
            for(var i=0; i<treePath.length; i++){
                cache = cache.children[treePath[i]];
            }
            cache.parent.children.splice(treePath[treePath.length-1],1);
        }
    }
};

Tree.prototype.size = function() {
    var length = 0;
    this.traverseDFS(function(){
        length++;
    });
    return length;
};


function $(id){
	return document.getElementById(id);
}

// 给树添加tree结点
function addTreeNode(tree){
    var value = $('value-input').value.trim();
    if(value == ''){
        alert("please enter a value");
        return;
    }
    if(select){
        if(value == ''){
            alert("please enter a vlaue");
        }else{
            tree.add(value,domPath);
            createDOM(tree);
        }
    }else{
        alert("please choose a box");
    }
}
// 给树删除结点
function deleteTreeNode (tree) {
    if(select){
        if(!parent){
            select = null;
            domPath = [];
            createDOM(tree);
            alert("root node can not delete");
            return;
        }
        tree.remove(domPath);
        domPath = [];
        createDOM(tree);
    }else{
        alert("please choose a box");
    }
}

// 绑定事件
function addEvent(){
	$('dfs').onclick = function(){animation('dfs',tree)};
	$('bfs').onclick = function(){animation('bfs',tree)};
	$('search-dfs').onclick = function(){animation('search-dfs',tree)};
	$('search-bfs').onclick = function(){animation('search-bfs',tree)};
    $('add-node').onclick = function(){addTreeNode(tree)};
    $('del-node').onclick = function(){deleteTreeNode(tree)};
}

// 动画事件
function animation(id,tree){
 	clearInterval(intervalID);
    clearAll(tree);
    var count = 0;
    var data = [];

    var aniProcess = function(){
    	clearAll(tree);
    	if(count==tree.size()){
    		clearInterval(intervalID);
        }else{
            var cache = $('box0');
            for(var i=0; i<data[count].length; i++){
                cache = cache.children[data[count][i]];
            }
            cache.style.backgroundColor = 'blue';
            count++;
        }
    };

    var searchProcess = function(){
        clearAll(tree);
        var nodeList = document.getElementsByClassName('box');
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].innerText.split(/\n/)[0] == data[count]) {
                nodeList[i].style.backgroundColor = 'blue';
                break;
            }
        }
        if (data[count++] == keyWord) {
            clearInterval(intervalID);
        }
        if(count==tree.size()){
        	clearInterval(intervalID);
        	alert("Not find!");
        }
    };

    if(id=='dfs'){
    	data = tree.pathToArray(tree.traverseDFS);
    	intervalID = setInterval(aniProcess, 300);
    }else if(id=='bfs'){
    	data = tree.pathToArray(tree.traverseBFS);
    	intervalID = setInterval(aniProcess, 300);
    }else if(id=='search-dfs'){
    	data = tree.toArray(tree.traverseDFS);
        var keyWord = $('input').value;
        intervalID = setInterval(searchProcess, 300);
    }else if(id=="search-bfs"){
    	data = tree.toArray(tree.traverseBFS);
        var keyWord = $('input').value.trim();
        intervalID = setInterval(searchProcess, 300);
    }
}
