$ = function (el) { return document.querySelector(el); };

var data = [];

function render() {
	$("#result").innerHTML = data.map(function(d){
		return "<div>" + d + "</div>";
	}).join('');
}

function deal(func, succ) {
  var args = [].slice.call(arguments, 2);
  return function(e) {
    try {
      var arg = args.map(function(item) {
        return typeof item === "function" ? item(e) : item;
      });
      var result = func.apply(data, arg);
      if (succ != null) {
        succ(result);
      }
    } catch (ex) {
      alert(ex.message);
    }
    render();
  };
}

function getInputValue() {
	var num = $("input").value;
	if(!validate(num))
		throw new Error('input error');
	return parseInt(num);
}

function getClickIndex(e){
	var node = e.target;
	return [].indexOf.call(node.parentNode.children,node);
}

function validate(str){
	return /^\d+$/.test(str);
}

$('#leftin').onclick = deal([].unshift, null, getInputValue);
$('#rightin').onclick = deal([].push, null, getInputValue);
$('#leftout').onclick = deal([].shift, null);
$('#rightout').onclick = deal([].pop, null);
// $('#rightout').onclick = deal([].pop, window.alert);
$('#result').onclick = deal([].splice, null, getClickIndex, 1);
