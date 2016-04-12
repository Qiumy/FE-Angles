var data = [];

document.getElementById("search").onclick = function() {
	var str = document.getElementById('searchInput').value.trim();
    render(str);
};

document.getElementById("left-in").onclick = function() {
	var str = document.getElementById('input').value.trim();
    var inputs = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
        if (e != null && e.length > 0) {
            return true;
        } else {
            return false;
        }
    });
    for (var i=inputs.length-1; i>=0; i--)
    	data.unshift(inputs[i]);
    render();
}

document.getElementById("right-in").onclick = function() {
	var str = document.getElementById('input').value.trim();
    var inputs = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
        if (e != null && e.length > 0) {
            return true;
        } else {
            return false;
        }
    });
    data = data.concat(inputs);
    render();
}

function render(match) {
	document.getElementById("result").innerHTML = data.map(function(d){
		var r = d;
		if(match != null && match.length > 0){
			r = r.replace(new RegExp(match, "g"), "<span class='select'>" + match + "</span>");
		} 
		return "<div>" + r + "</div>";
	}).join('');
}