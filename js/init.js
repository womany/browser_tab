window.onload = () => {

	//
	// ============= clock ===============
	//

	var timeUpdate = () =>
		document.querySelector(".time span").innerHTML = moment().format("M/D HH:mm");
	timeUpdate();
	window.setInterval( timeUpdate, 1000);

	//
	// =========== daily quote ===========
	//


	var now = new Date();
	var today = now.toISOString().substr(0, 10);
	var dateStr = now.getMonth() + 1 + '/' + now.getDate() + ' ';
	var week = function(){
		var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
		return weekday[now.getDay()];
	}();
	dateStr += week;

	fetch('https://api.womany.net/daily_quotes/' + today)
		.then( res => res.json() )
		.then( dat => {
			if (!dat) { console.error("data is undefined!"); };

			document.querySelector("#daily_quote").innerHTML = `
				<a href="https://womany.net/weightofwords?ref=chrome-ext-newtab#${today}">
					${dat.quote}
					<span class="author">
						&#8212;&#8212; ${dat.source} <img src="${dat.image}" />
					</span>
				</a>
			`;
	})
	.catch( (e) => {
		console.log(e)
	});


	//
	// ======= search suggestion =========
	//

	var search_bar = document.querySelector('#query');
	var ss_target = document.querySelector("#search_suggestion > div");
	search_bar.addEventListener('input', () =>
	{
		ss_target.innerHTML = "";
		if(search_bar.value !== "") {
			fetch(`http://google.com.tw/complete/search?client=navquery&requiredfields=site%3Awomany.net&ds=navquery&q=${search_bar.value}`)
				.then(res=>(res.text()))
				.then( data => {
					data = JSON.parse(data.substr(19,data.length-20));

					if(data[0] === search_bar.value)
						data[1].forEach( (kw) => {
							if(kw[0] !== undefined)
								// ss_target.innerHTML += `<a class="womany" href="https://womany.net/search?q=${kw[0]}">${kw[0]}</a>`;
								ss_target.innerHTML += `<a class="womany" href="https://www.google.com.tw/search?query=${kw[0]}%20site%3Awomany.net">${kw[0]}</a>`;
						})
				})
			fetch(`http://google.com.tw/complete/search?client=chrome&q=${search_bar.value}`).then(res=>res.json())
				.then( data => {
					if(data[0] === search_bar.value) {

						var dk_num = 0, dk_limit = 4; // display_keyword

						for (var i = 0 ; dk_num < dk_limit && i < 20 ; i += 1)
							if(data[1][i] !== undefined) {
								ss_target.innerHTML += `<a class="google" href="https://www.google.com.tw/search?query=${data[1][i]}">${data[1][i]}</a>`;
								dk_num += 1;
							}
					}
				})
		}
	});

	var ss_index = -1;
	window.addEventListener("keydown", (e) => {
		if(search_bar.value !== "") {

			if(e.keyCode === 38) {	// Up
				ss_index = ss_index === -1 ?
					ss_target.children.length - 1 :
					ss_index - 1;
			}
			else if (e.keyCode === 40) {  // Down
				ss_index = ss_index === (ss_target.children.length - 1) ?
					-1 :
					ss_index + 1;
			}
			else if (e.keyCode === 8 || (e.keyCode >= 65 && e.keyCode <= 90)) {  // alphabet
				ss_index = -1;
			}

			if(ss_index >= 0 && ss_index <= ss_target.children.length-1)
				ss_target.children[ss_index].focus();
			else
				search_bar.focus();
		}
	}, false);

	document.addEventListener("click", (e) => {
		if(document.activeElement === search_bar) {
			document.querySelector("#search_suggestion > div").classList.remove("hide");
		}
		else {
			document.querySelector("#search_suggestion > div").classList.add("hide");
		}
	});
}


