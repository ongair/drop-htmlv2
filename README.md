## BBC Drop App

### Getting started on a local environment

0. If on Windows ignore `sudo` but use the elevated command prompt. Ensure to run this commands in the current project directory
1. Install Git
2. Clone Git repo
3. Check if node is installed. If not, install it
4. Install npm `sudo apt-get install npm`
5. Run `sudo npm install` (this will take a little while and installs everything for the dev environment)
6. Run `bower install` to install the angular dependencies
7. Run `gulp` to build SCSS files, and you are done!
8. If you don't have an http server run  `npm install http-server -g` This will install a lightweight http server for Node.js
9. To test the app while in development change to the app directory `cd app` and serve to http server with `http-server -a 127.0.0.1 -p 8080 -a 3000` You can change port and address if necessary
10. Visit your browser url `http://127.0.0.1:3000/` modify where necessary if you changed the flags above.


### Deploy to Production (Applies to most servers)

1. Prepare the app locally first following the steps above.
2. Copy the contents of the app directory to your production server and ensure
the directory containing the files is the entry directory.

### Deploy to NGINX directly from Github

1. Make sure git and npm (`sudo apt-get install npm`) are already installed in your server.
NB: npm will only be used to prepare you files after the repo is cloned or updated. It's not required for the app to run as you can do that locally and just deploy the contents of the app directory.
2. Clone Git repo
3. Run `sudo npm install` to install the node modules required by gulp
4. Run `bower install` to install the angular dependencies
5. Run `gulp` to build and optimize front end assets
6. Make the app directory your entry directory and index.html your entry index files
7. It's recommended you deploy the app in it's own space and disable php execution for all files including .php files.
