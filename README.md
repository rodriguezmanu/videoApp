### Croosover Video

Install:
* nodejs
* mongodb
* bower by npm - npm install -g bower
* grunt by npm - npm install -g grunt-cli

Run:
* mongod
* npm install
* bower install
* grunt serve - (dev env) or grunt serve:dist (prod env)

* To run unit test: grunt test
* To run lint javascript: grunt lint

Notes:
* This app running with video_portal_api on http://localhost:3000 if you want change it, please change ngconstant in gruntFile.js
* To test cross-browser do it with prod env in order to run babel to convert es6 in es6 features
* Running unit test, coverage folder is created in root path

