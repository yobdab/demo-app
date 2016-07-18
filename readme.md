## Demo application
Working dist version: http://ppstudio.pl/demo/

# Installation
First, install Node from here: http://nodejs.org/download/

When installing Node, also check that npm is also installed. 

Then you'll have to install a package from NPM:

    npm install -g gulp

When everything is ready, clone the repository. Then go inside the cloned directory and run:

    npm install

There! Demo application is ready to be developed. 
In order to run Demo, type:
  
    gulp serve
    
If you want to run server with Typescript compilation (e.g. when your IDE can't do the job) type:

    gulp serve --watch-ts

# Development

    gulp dist

Built of DemoApp is located in `dist/` directory and after uploading to any host should work.

# Tests
You can ensure the tests are passing running `gulp test`
 
# Other
Also very important is clean code, so don't forget to check if TSLint, ESLint aren't complaining (you can run TSLint, ESLint by typing `gulp check`).

Main task (`gulp` or `gulp default`) - runs:

 - code style check
 - source and test structure test
 - compilation
 - unit tests
 - building sources (dist)
