var intervalID;
var tree;

window.onload = function(){
	initTree();
};

// 初始化二叉树
function initTree(){
	tree = new Tree(8);
    tree.add(1, 8, tree.traverseDFS);
    tree.add(5, 8, tree.traverseDFS);
    tree.add(4, 8, tree.traverseDFS);
    tree.add(2, 1, tree.traverseDFS);
    tree.add(3, 1, tree.traverseDFS);
    tree.add(6, 1, tree.traverseDFS);
    tree.add(12, 1, tree.traverseDFS);
    tree.add(14, 1, tree.traverseDFS);
    tree.add(7, 5, tree.traverseDFS);
    tree.add(9, 5, tree.traverseDFS);
    tree.add(11, 5, tree.traverseDFS);
    tree.add(10, 4, tree.traverseDFS);
    tree.add(13, 4, tree.traverseDFS);
    tree.add(15, 8, tree.traverseDFS);
    createDOM(tree);
    addEvent();
}

// 根据树建立相应的dom结构

function createDOM(tree){
	var currentDOM = $('container');
    tree.traverseBFS(function (node) {
        if (!node.parent) {
            currentDOM.innerHTML = '<div class="box" id="box' + node.value + '">' + node.value + '</div>';
        } else {
            currentDOM = $('box' + node.parent.value);
            currentDOM.innerHTML += '<div class="box" id="box' + node.value + '">' + node.value + '</div>'
        }
    })
}


// 清楚所有颜色标记
function clearAll(){
	for(var i=1; i<16; i++){
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
Tree.prototype.add = function(value,parent,traversal) {
	var addNode = {
		value: value,
		parent: null,
		children: []
	};

	if(this._root == null){
		this._root = addNode;
	}else{
		traversal.call(this,function(node){
			if(node.value == parent){
				node.children.push(addNode);
				addNode.parent = node;
				return;
			}
		});
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

function $(id){
	return document.getElementById(id);
}

// 绑定事件
function addEvent(){
	$('dfs').onclick = function(){animation('dfs',tree)};
	$('bfs').onclick = function(){animation('bfs',tree)};
	$('search-dfs').onclick = function(){animation('search-dfs',tree)};
	$('search-bfs').onclick = function(){animation('search-bfs',tree)};
}

// 动画事件
function animation(id,tree){
 	clearInterval(intervalID);
    clearAll();
    var i = 0;
    var data = [];

    var aniProcess = function(){
    	clearAll();
    	if(i==15)
    		clearInterval(intervalID);
    	$('box' + data[i++]).style.backgroundColor = 'blue';
    };

    var searchProcess = function(){
        clearAll();
        $('box' + data[i]).style.backgroundColor = 'blue';
        if(data[i++] == keyWord){
        	$('box' + data[--i]).style.backgroundColor = 'red';
            clearInterval(intervalID);
        }
        if(i==15){
        	clearInterval(intervalID);
        	alert("Not find!");
        }
    };

    if(id=='dfs'){
    	data = tree.toArray(tree.traverseDFS);
    	intervalID = setInterval(aniProcess, 300);
    }else if(id=='bfs'){
    	data = tree.toArray(tree.traverseBFS);
    	intervalID = setInterval(aniProcess, 300);
    }else if(id=='search-dfs'){
    	data = tree.toArray(tree.traverseDFS);
        var keyWord = $('input').value;
        intervalID = setInterval(searchProcess, 300);
    }else if(id=="search-bfs"){
    	data = tree.toArray(tree.traverseBFS);
        var keyWord = $('input').value;
        intervalID = setInterval(searchProcess, 300);
    }
}