fetch("https://api.womany.net/articles/list")
	.then( res => res.json())
	.then( ({articles}) => {
		let latest_ul = document.querySelector("#latest-articles > ul");
		var content = "";
		let article_limit_num = 6;
		for(var i = 0; i < article_limit_num ; ++i ) {
			content += `<li>
			<a href="https://womany.net/read/article/${articles[i].id}?ref=ext-chrome-"
				style="background-image:url('https://${articles[i].featured_image_thumb}')">
				<h3>${articles[i].title}</h3>
			</a></li>`
		}
		latest_ul.innerHTML = content;
	})
	.catch( err => {
		document.querySelector("#latest-articles > ul").innerHTML = "<li class='error'>因為網路問題，我們沒辦法擷取到新文章…</li>"
	})
