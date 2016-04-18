// dom元素
var input = document.getElementById("input-text");
var tips = document.getElementById("tips");
var btn = document.getElementById("btn");
var checkbox = document.getElementById("checkbox");

// 正则
var trimReg = /^\s+|\s+$/g;
var chineseReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
var lenReg = /^.{4,16}$/;

// 定义提示信息
var msgs={
	error_length:{
		"msg": "长度为4~16个字符",
		"className": "error"
	},
	error_required:{
		"msg": "名称不能为空",
		"className": "error"
	},
	right:{
		"msg": "名称格式正确",
		"className": "right"
	}
};

// 显示信息更新
function update(ele,paramObj) {
	ele.className = paramObj.className;
	tips.innerText = paramObj.msg;
}

// 表单检验
function validate() {
	var text = input.value;
	var testText = text.replace(trimReg,'').replace(chineseReg, '--');
	var paramObj ;
    if(testText.length === 0 ){
        paramObj = msgs.error_required;
    }else if( !lenReg.test(testText)){
        paramObj = msgs.error_length;
    }else{
        paramObj = msgs.right;
    }

    update(checkbox, paramObj);
};

btn.onclick = validate;