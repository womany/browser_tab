chrome.browserAction.onClicked.addListener(
	() => chrome.tabs.create({ url: "about:newtab" })
);

