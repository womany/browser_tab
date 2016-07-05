.PHONY: install, css

css:
	scss --watch scss/style.scss:css/style.css

install:
	gem install sass --no-ri --no-doc


