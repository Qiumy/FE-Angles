(function(){
	var treeTraverse = new TreeTraverse();
	var preBtn = document.getElementById("pre-order");
	var inBtn = document.getElementById("in-order");
	var postBtn = document.getElementById("post-order");
	var root = document.getElementById("root");

	preBtn.onclick = function(){
		treeTraverse.preOrder(root);
		treeTraverse.animation();
	};

	inBtn.onclick = function(){
		treeTraverse.inOrder(root);
		treeTraverse.animation();
	};

	postBtn.onclick = function(){
		treeTraverse.postOrder(root);
		treeTraverse.animation();
	};
})();

// 遍历一棵树
function TreeTraverse(){
	this.stack = [];
	this.isTraversing = false;
}

// 前序遍历
TreeTraverse.prototype.preOrder = function(node) {
	this.stack.push(node);
	if(node.firstElementChild){
		this.preOrder(node.firstElementChild);
	}
	if(node.lastElementChild){
		this.preOrder(node.lastElementChild);
	}
};

//中序遍历
TreeTraverse.prototype.inOrder = function(node) {
	if(node.firstElementChild){
		this.inOrder(node.firstElementChild);
	}
	this.stack.push(node);
	if(node.lastElementChild){
		this.inOrder(node.lastElementChild);
	}
};

//后序遍历
TreeTraverse.prototype.postOrder = function(node) {
	if(node.firstElementChild){
		this.postOrder(node.firstElementChild);
	}
	if(node.lastElementChild){
		this.postOrder(node.lastElementChild);
	}
	this.stack.push(node);
};

// 动画方法
TreeTraverse.prototype.animation = function() {
	var stack = this.stack;
	var iter = 0;
	var self = this;
	var timer;

	self.stack = [];
	if(!self.isTraversing){
		self.isTraversing = true;
		stack[iter].style.backgroundColor = "#F125C2";
		timer = setInterval(function(){
			if(iter===stack.length-1){
				stack[iter].style.backgroundColor = "#FFFFFF";
				self.isTraversing = false;
				clearInterval(timer);
			}else{
				++iter;
				stack[iter-1].style.backgroundColor = "#FFFFFF";
                stack[iter].style.backgroundColor = "#F125C2";
			}
		}, 250);
	}
};