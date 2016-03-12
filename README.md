#Tech Services App Builder

The app builder is similar to the Rally App Builder except that it doesn't provide a web server, it separates out server information to a non-version-controlled file, and it allows you to install to Rally from the command line.

This app builder can create a new space for you, setting up necessary structures for testing and development.  It'll create a structure that provides:

  * src/javascript:  All the JS files saved here will be compiled into the 
  target html file
  * src/style: All of the stylesheets saved here will be compiled into the 
  target html file
  * test/fast: Fast jasmine tests go here.  There should also be a helper 
  file that is loaded first for creating mocks and doing other shortcuts
  (fastHelper.js)
  * test/slow: Slow jasmine tests go here.  There should also be a helper
  file that is loaded first for creating mocks and doing other shortcuts 
  (slowHelper.js)
  * templates: This is where templates that are used to create the production
  and debug html files live.  The advantage of using these templates is that
  you can configure the behavior of the html around the JS.
  * config.json: This file contains the configuration settings necessary to
  create the debug and production html files. 
  * auth.json: This file contains necessary configuration settings that are
  not checked into version control.
  * package.json: This file lists the dependencies for grunt

#Installing

1.  **Install node.js**  This really is as simple as going to node[node] 
and pushing the Install button.  Afterward, type this command to see that 
it installed:

        npm --version

2.  **Install grunt** From the command line, use the node package manager to install grunt.  On linux/mac, you might have to use 
sudo as shown below. On Windows, you will not use the sudo part of the command.

        sudo npm install -g grunt-cli
        sudo npm install -g grunt-init

3.  **Install template** The easiest thing is to install this template to 
  your home directory:
    
    git clone https://github.com/RallyTechServices/ts-app-builder.git ~/.grunt-init/ts-app-builder

  _(Windows users, see [the documentation][grunt-init] for the correct destination directory path)_

4.  **Create** 

When 1-3 are done, you can do this step in as many different places as you like.

Create a new directory for your app, cd into that directory, then type:

    grunt-init ts-app-builder

You'll be prompted for some default values.  You can change them in the resulting config.json and auth.json files. 

After the prompt comes back, do a local install of the required npm libraries by typing (ignore warnings about missing repositories):

    npm install
    
After install is complete, you should be able to run the fast tests and get one success and one failure. 
Something like this:

    Running "jasmine:fast" (jasmine) task
    Testing jasmine specs via phantom
    x.
    Example test set:: should be a failing test: failed
      Expected 0 to equal 1. (1)
    2 specs in 0.002s.
    >> 1 failures
    Warning: Task "jasmine:fast" failed. Use --force to continue.

Another check:  You should be able to compile the debug version and view it (after logging in to Rally) 
in a new tab.  

    grunt debug

# Usage of the grunt file
##Tasks
    
### grunt debug

Use grunt debug to create the debug html file.  You only need to run this when you have added new files to
the src directories.

### grunt build

Use grunt build to create the production html file.  We still have to copy the html file to a panel to test.

### grunt test-fast

Use grunt test-fast to run the Jasmine tests in the fast directory.  Typically, the tests in the fast 
directory are more pure unit tests and do not need to connect to Rally.

### grunt test-slow

Use grunt test-slow to run the Jasmine tests in the slow directory.  Typically, the tests in the slow
directory are more like integration tests in that they require connecting to Rally and interacting with
data.

### grunt install

Use grunt install to build the deploy file and then install it into a new page/app in Rally.  It will create the page on the Home tab and then add a custom html app to the page.  The page will be named using the "name" key in the config.json file (with an asterisk prepended).

To use this task, you must create an auth.json file that contains the following keys:
{
    "username": "fred@fred.com",
    "password": "fredfredfred",
    "server": "https://us1.rallydev.com"
}

(Use your username and password, of course.)  NOTE: not sure why yet, but this task does not work against the demo environments.  Also, .gitignore is configured so that this file does not get committed.  Do not commit this file with a password in it!

When the first install is complete, the script will add the ObjectIDs of the page and panel to the auth.json file, so that it looks like this:  

{
    "username": "fred@fred.com",
    "password": "fredfredfred",
    "server": "https://us1.rallydev.com",
    "pageOid": "52339218186",
    "panelOid": 52339218188
}

On subsequent installs, the script will write to this same page/app. Remove the
pageOid and panelOid lines to install in a new place.  CAUTION:  Currently, error checking is not enabled, so it will fail silently.

--
[grunt-init]: http://gruntjs.com/project-scaffolding
[node]: http://nodejs.org/

