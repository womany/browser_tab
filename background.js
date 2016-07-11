chrome.browserAction.onClicked.addListener(
	() => chrome.tabs.create({ url: "about:newtab" })
);

chrome.tabs.onCreated.addListener( (tab) => {
	if(tab.url === "about:newtab")
		chrome.tabs.update(
			tab.id, {'url': 'index.html'}
		);
});
