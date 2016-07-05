window.onload = () => {
	var time = document.querySelector(".time span");
	time.innerHTML = moment().locale("zh_TW").format("M/D, h:mm:ss");
	window.setInterval( () => {
		time.innerHTML = moment().locale("zh_TW").format("M/D, h:mm:ss");
	}, 1000);
}
