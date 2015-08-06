# BBC Drop App

# Getting started on a local environment

0. If on Windows ignore `sudo` but use the elevated command prompt. Ensure to run this commands in the current project directory
1. Install Git
2. Clone Git repo
3. Check if node is installed. If not, install it
4. Install npm `sudo apt-get install npm`
5. Run `sudo npm install` (this will take a little while and installs everything for the dev environment)
6. Run `bower install` to install the angular dependencies
7. Run `gulp` to build SCSS files, and you are done!
8. If you don't have an http server run  `npm install http-server -g` This will install a lightweight http server for Node.js
9. Serve to http server with `http-server -a 127.0.0.1 -p 8080` You can change port and address if necessary
10. Visit your browser url `http://127.0.0.1:8080` modify where necessary if you changed the flags above.


# Deploy to Production

1. Run `gulp` (NOT READY ..More instructions coming soon)
