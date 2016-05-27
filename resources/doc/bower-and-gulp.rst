Frontend with Bower and Gulp; directories, tasks, etc; general layout for the website arteetmarte.org
=====================================================================================================

We use the next elements and components:

- Materialize
- jQuery
- FontAwesome
- Google Fonts
- Material Design Icons

We use bower as front-end package manager; we use Bower to download the assets and plugins and gulp to compile,
concatenate and minify them.

General commands for init:

    npm init
    # Gulp:
    # if we haven't gulp installed yet (we install global):
    npm install --global gulp-cli
    # packages:
    npm install --save-dev gulp
    npm install --save-dev gulp-util
    npm install --save-dev event-stream
    npm install --save-dev gulp-load-plugins
    # Bower:
    # if we haven't bower installed yet (we install global):
    sudo npm install -g bower
    # init bower:
    bower init
    # packages:
    bower install jquery --save
    bower install materialize --save
    bower install fontawesome --save
    bower install material-design-icons --save
    bower install google-fonts --save

Directory structure:

  [root]
    ├── bower_modules           <── bower sources
    ├── node_modules            <── node sources
    ├── src                     <── source folder  
    │   └── static
    │       └── assets
    │           ├── css
    │           ├── font
    │           ├── ico
    │           ├── img
    │           ├── js
    │           └── vendor
    └── web                     <── destination folder
