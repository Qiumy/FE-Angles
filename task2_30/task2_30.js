// 正则表达式
var lenReg = /^.{4,16}$/;
var chnReg = /[^\x00-\xff]/g;
var pwdReg = /^[\d|\w]{8,16}$/;
var mobileReg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
var mailReg =  /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

var msgs = function(name) {
	return {
	    error_required: {
	        "msg": (function(n) {
	            return n + "不能为空";
	        })(name),
	        "className": "error"
	    },
	    error_length: {
	        "msg": "长度为4~16个字符",
	        "className": "error"
	    },
	    error_invalidPassword: {
	        "msg": "密码格式不正确",
	        "className": "error"
	    },
	    error_inconsistentPassword: {
	        "msg": "两次输入密码不一致",
	        "className": "error"
	    },
	    error_invalidMail: {
	        "msg": "邮箱格式不正确",
	        "className": "error"
	    },
	    error_invalidMobile: {
	        "msg": "手机格式输入不正确",
	        "className": "error"
	    },
	    correct: {
	        "msg": "填写格式正确",
	        "className": "correct"
	    }
	};
};

var validateResults = {};

var inputEvent = function() {
	var inputs = document.getElementsByTagName("input");
	for(var i=0, len=inputs.length; i<len; i++){
		inputs[i].addEventListener("focus",function(){
			this.nextElementSibling.style.visibility = "visible";
		});
		inputs[i].addEventListener("blur",function(){
			isValidate.apply(this);
		});
	}

	var form = document.getElementById("myForm");
	form.addEventListener("submit", function(event) {
        var submitSuccess = true;
 		for(var i=0, len=inputs.length; i<len; i++){
 			isValidate.apply(inputs[i]);
 			inputs[i].nextElementSibling.style.visibility = "visible";
 		}
        for (p in validateResults) {
            if (validateResults[p] !== msgs().correct.msg) {
                submitSuccess = false;
                break;
            }
        }
        if (submitSuccess) {
            alert("提交成功");
        } else {
            alert("提交失败");
        }
    });

    var isValidate = function(){
    	var name = this.name;
    	var value = this.value;
		var testVal = value.trim();
		var testStr = testVal.replace(chnReg,"--");
		var tip = msgs(name);
		var validate= null;
		if (testStr.length == 0){
			validate = tip.error_required;
		}else{
			switch(name){
				case "名称":
					if(!lenReg.test(testStr)){
						validate = tip.error_length;
					}else{
						validate = tip.correct;
					}
					break;
				case "密码":
					if (!pwdReg.test(testStr)) {
	                    validate = tip.error_invalidPassword;
	                }else{
	                    validate = tip.correct;
	                }
	                break;
	            case "密码确认":
	                var pwdVal = document.getElementById("password").value;
	                if (pwdVal != testVal){
	                    validate = tip.error_inconsistentPassword;
	                }else{
	                    validate = tip.correct;
	                }
	                break;
	            case "邮箱":
	                if (!mailReg.test(testStr)){
	                    validate = tip.error_invalidMail;
	                }else{
	                    validate = tip.correct;
	                }
	                break;
	            case "手机":
	                if (!mobileReg.test(testStr)){
	                    validate = tip.error_invalidMobile;
	                }else{
	                    validate = tip.correct;
	                }
	                break;
	            default:
	                alert("非法字符");
			}
		}
		validateResults[name] = validate.msg;
	    renderInput(this, validate);
	};
}



var renderInput = function(ele,validate){
	ele.className = validate.className;
	ele.nextElementSibling.className = "tip " + validate.className;
    ele.nextElementSibling.innerText = validate.msg;
};

inputEvent();