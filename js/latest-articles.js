var display_item = (tallScreen) => {
	if(tallScreen)
		Array.from(document.querySelectorAll(".big")).forEach(e => {e.style.display = "inline-block"});
	else
		Array.from(document.querySelectorAll(".big")).forEach(e => {e.style.display = "none"});
};

fetch("https://api.womany.net/articles/list")
	.then( res => res.json())
	.then( data => {
		let {articles} = data;
		let latest_ul = document.querySelector("#latest-articles > ul");
		var content = "";
		var tallScreen = document.body.clientHeight > (document.body.clientWidth > 1900 ? 930:767);
		let article_limit_num = 8;
		for(var i = 0; i < article_limit_num ; ++i ) {
			content += `<li ${ i > 4? "class='big'":"" }>
			<a href="https://womany.net/read/article/${articles[i].id}?ref=ext-chrome-newtab"
				style="background-image:url('https://${articles[i].featured_image_thumb}')">
				<h3>${articles[i].title}</h3>
			</a></li>`
		}
		content += `<li>
			<a href="http://womany.net/read/article/${articles[Math.floor(Math.random() * 16 ) + 5].id}?ref=ext-chrome-newtab">
				<h3>好手氣：隨機看看女人迷的好文章！</h3>
			</a><li>
		`;
		latest_ul.innerHTML = content;
		display_item(tallScreen);
	})
	.catch( err => {
		console.error(err);
		document.querySelector("#latest-articles > ul").innerHTML = "<li class='error'>因為網路問題，我們沒辦法擷取到新文章…</li>"
	})

window.addEventListener("resize", () => {
	var tallScreen = document.body.clientHeight > (document.body.clientWidth > 1900 ? 930:767);
	display_item(tallScreen);
});
