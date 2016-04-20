(function() {
	// 设置radio事件
	function radioEvent() {
		var radios = document.getElementsByName("jobs");
		if(radios[0].checked){
			document.getElementById("show_school").className = "show";
			document.getElementById("show_work").className = "hidden";
		}else{
			document.getElementById("show_school").className = "hidden";
			document.getElementById("show_work").className = "show";
		}
	}

	// 设置第二个级联下拉菜单
	function setSelect() {
		var sec = document.querySelector("#school");
		//处理初始状态
		if(!event){
		    sec.options[0] = new Option("北京航空航天大学","bh");
		    sec.options[1] = new Option("北京大学","bd");
		    sec.options[2] = new Option("中国人民大学","rd");
		}
		else{
		    var val = event.target.value;
		    switch(val){
		        case "bj" :
		            sec.options[0] = new Option("北京航空航天大学","bh");
		            sec.options[1] = new Option("北京大学","bd");
		            sec.options[2] = new Option("中国人民大学","rd");
		            break;
		        case "sh" :
		            sec.options[0] = new Option("复旦大学","fd");
		            sec.options[1] = new Option("同济大学","tj");
		            sec.options[2] = new Option("上海交通大学","sj");
		            break;
		        case "gz" :
		            sec.options[0] = new Option("中山大学","sysu");
		            sec.options[1] = new Option("华南理工大学","hg");
		            sec.options[2] = new Option("暨南大学","jd");
		            break;
		    }
		}
	}

	function addEvent() {
		var radios = document.getElementsByName("jobs");
		for(var i=0; i<radios.length; i++){
			radios[i].addEventListener("change",radioEvent);
		}

		var select = document.getElementById("city");
		select.addEventListener("change",setSelect)
	}
	
	setSelect();
	addEvent();
}());

