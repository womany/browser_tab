.PHONY: install, firefox, chrome, pack, css

pack: chrome firefox

chrome:
	sh pack_chrome.sh . ../app.pem

firefox:
	zip -qr ../app.xpi ./

css:
	scss --watch scss/style.scss:css/style.css

install:
	gem install sass --no-ri --no-doc


