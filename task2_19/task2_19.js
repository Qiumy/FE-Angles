var data = [];
var data_tmp = [];
var flag = true;

document.getElementById("left-in").onclick = function(){
	if(checkInput()==0)
		return;
	if(flag == false)
		return;
	data.unshift(checkInput());
	update();
};

document.getElementById("right-in").onclick = function() {
	if(checkInput()==0)
		return;
	if(flag == false)
		return;
	data.push(checkInput());
	update();
}

document.getElementById("left-out").onclick = function() {
	if(flag == false)
		return;
	data.shift();
	update();
}

document.getElementById("right-out").onclick = function() {
	if(flag == false)
		return;
	data.pop();
	update();
}

document.getElementById("random-queue").onclick = function() {
	if(flag == false)
		return;
	data = [];
	for(var i=0; i<45; i++){
		var d = parseInt(Math.random()*90 + 9);
		data.push(d);
	}
	update();
}

document.getElementById("bubble-sort").onclick = function() {
	if(flag == false)
		return
	var i=0, j=1;
	var cir = setInterval(run,1);

	function run() {
		flag = false;
		if(i < data.length){
			if(j < data.length){
				if(data[i] > data[j]){
					var tmp = data[i];
					data[i] = data[j];
					data[j] = tmp;
					update();
					return;
				}
				j++;
			}else{
				i++;
				j = i+1;
			}
		}else{
			flag = true;
			clearInterval(cir);
		}
	}
}

document.getElementById("insert-sort").onclick = function() {
	if(flag == false)
		return;
	var i = 1, j = 0;
	var tmp;
	var cir = setInterval(run, 100);

	function run() {
		flag = false;
		if(i < data.length){
			tmp = data[i];
			for(j=i-1; j>=0&&data[j]>tmp; j--){
				data[j+1] = data[j]
			}
			data[j+1]  = tmp;
			update();
			i++;
		}else{
			flag = true;
			clearInterval(cir);
		}
	}
}

function checkInput() {
	var input = document.getElementById("input").value.trim();
	if(data.length >= 60){
		alert("元素超过60个");
		return 0;
	}
	if(input >= 100 || input <=10){
		alert("请输入11-99之间的数");
		return 0;
	}
	return input;
}

function update() {
	var res = "";
	for(var i=0; i<data.length; i++){
		var h = parseInt(data[i] * 3);
		res += '<div class="rect-box" style="height:' + h + 'px">' + data[i] + '</div>';
	}
	document.getElementById("box").innerHTML = res;
}

function partition(l,r) {
	var mid = parseInt((l+r)/2);
	var pvt = data[mid];
	while(l <= r){
		while(data[l] < pvt){
			l++;
		}
		while(data[r] > pvt){
			r--;
		}
		if(l<=r){
			var tmp = data[l];
			data[l] = data[r];
			data[r] = tmp;
			l++;
			r--;
			data_tmp.push(data.toString());
		}
	}
	return l;
}

function quicksort(l,r) {
	var index = partition(l,r);
	if(l < (index-1)){
		quicksort(l, index-1);
	}
	if(index < r){
		quicksort(index,r);
	}
}

document.getElementById("quick-sort").onclick = function() {
	if(flag == false)
		return;
	quicksort(0,data.length-1);
	var i = 0;
	var cir = setInterval(run, 100);
	function run() {
		data = data_tmp[i].split(',');
		update();
		i++;
		if(i >= data_tmp.length){
			clearInterval(cir);
		}
	}
}