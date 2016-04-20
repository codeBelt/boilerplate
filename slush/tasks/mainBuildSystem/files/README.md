# plan

## FIRST-TIME PROJECT SETUP

### Step One - Install Node.js

Installation of Node.js is a prerequisite to running the Gulp build tool. Run the `node-install` script below to install everything you need to get started: Node.js, gulp-cli, and bower.

**Windows:**

1. On the command line, navigate to the root directory of the project and enter the following:

        cd tools
        node-install

**Mac/Linux:**

1. Configure Finder show hidden files by opening a terminal window and entering the following:

        defaults write com.apple.finder AppleShowAllFiles TRUE
        killall Finder

1. In your home directory, open the file `.bash_profile` in an editor (depending on your system, this file may also be called `.profile`, `.zlogin`, etc). Append the following lines to the very bottom, and save the file:

        export N_PREFIX=$HOME/.node
        export PATH=$N_PREFIX/bin:$PATH

1. Open a *NEW* terminal window. On the command line, navigate to the root directory of the project and enter the following:

        cd tools
        chmod 770 node-install.sh
        ./node-install.sh

### Step Two - Configure build environment

Gulp will expect a file called `build-env.js` in the project root. This contains environment-specific settings for the build process in much the same way as an .htaccess file, web.config, etc.

1. Copy the `build-env.js.dist` file in the root of your project to `build-env.js`.
1. Edit entries in this file to tailor the build process. Normally, you do not need to modify the settings in this file unless you want to change the built output paths.

### Step Three - Add gulp plugins

A baseline set of Gulp build tasks are included which will work for most projects out-of-the-box. Beyond that, there are hundreds of additional Gulp plugins available which can run additional tasks that may be useful for your project.

1. (Optional) Add a new line for each Gulp plugin you want to add to `package.json` in the project root.
1. On the command line, navigate to the root directory of the project and enter the following.

        npm install

1. This will scan the file `package.json` and download each plugin into the directory `node_modules`.

### Step Four - Add bower libraries

Add 3rd-party libraries to your project using bower.

1. (Optional) Add a new line for each third-party library you want to `bower.json` in the project root
1. On the command line, navigate to the root directory of the project and enter the following. This will scan the file `bower.json` and download each library into the directory `/src/assets/vendor`.

        bower install

1. Commit the new libraries created under `src/assets/vendor` to source control.
1. (Optional) Run the following command to inject into your code a reference to all libraries found in `bower.json`. If you're using RequireJS, a new entry for each library will be added to  `/src/assets/scripts/config.js`. Otherwise, script tags will be added `/src/index.html`.

        gulp inject

### Step Five - Run build

The build step will read all of the source code in the `/src` directory and output a complete runnable version of the website to the `/web` directory.

To view the build project, point your web browser to /web. For instance, if you are running your project on a local server: (http://localhost/MyProjectName/web)

**Building manually**

Any time you make changes to any file in your source code, run a build as follows:

1. Make changes to any file in `/src` (markup, stylesheets, scripts, etc.)
1. On the command line, navigate to the root directory of your project and enter the following:

        gulp

**Building automatically**

You can automatically rebuild any time a source file has changed as follows.

_Use this method only when developing locally, do not use this method on shared environments_

1. On the command line, navigate to the root directory of your project and enter the following:

        gulp watch

1. A persistent file watcher will run. This automatically does a new Gulp build every time it detects a change to a file in `/src` (markup, stylesheets, scripts, etc.)

---

## SERVER-SIDE INTEGRATION

Once the client-side source code has been integrated into the backend project, it is recommended to run Gulp at the same time as you run your server-side build.

### Build shell scripts

For convenience, `build.cmd` and `build.sh` shell scripts have been provided as a shortcut for running these commands:

 1. `npm install`
 1. `bower install`
 1. `gulp`

 Note that whatever argument you provide will pass through into the gulp command (for example, `build --prod` would run `gulp --prod`)

The build script will normally use the installed version of Node.js. If a standalone version of Node.js is detected as living under `/tools/node`, the build script will automatically use the standalone version of Node.js.

### Integrating Gulp build

Simply add the following shell command so that it runs during your normal build process (for instance, as a Visual Studio post-build event or as an Ant task):

*Windows:*

    cd [directory where Gulpfile.js is located]
    build.cmd --prod

*Mac/Linux:*

    cd [directory where Gulpfile.js is located]
    ./build.sh --prod

### Production flag

It is recommended to use the --prod argument in order to produce output suitable for a production environent.

This will ensure all client-side assets are production-ready; they will be minified, concatenated, and compressed in such a way to minimize file size and number of http hits.

Omit the --prod argument when doing local client-side development.

### Continuous integration

If you have a system running regular scheduled builds such as Jenkins, Bamboo, etc, it is a good idea to perform client-side build as part of this process.

Configure your continuous integration task to automatically run the following command every time it pulls an update from source control. If the build fails, the shell scripts will return an appropriate failure code.

*Windows:*

    cd [directory where Gulpfile.js is located]
    build.cmd --prod

*Mac/Linux:*

    cd [directory where Gulpfile.js is located]
    ./build.sh --prod

---

## PRODUCTION DEPLOYMENT

When performing a deployment, you can run a Gulp build either on your local machine or on the remote server.

### Local gulp build

Use this method if your deployment strategy involves performing a build locally and then pushing the built code to the remote server.

 1. If Node.js is not installed on your machine, run `./node-install.sh` to install the latest version of Node. If installation is not possible, see the "Lack of root access" section below.
 1. On your local machine, run `build.sh --prod`
 1. Copy the built assets to the remote server (via SSH, FTP, Git, etc)

### Remote gulp build

Use this method if your deployment strategy involves pulling source code on the remote server, and performing a build on the remote server.

 1. If Node.js is not installed on the remote machine, run `./node-install.sh` to install the latest version of Node. If installation is not possible, see the "Lack of root access" section below.
 1. Copy your project source code to the remote production server (via SSH, FTP, Git, etc)
 1. On the remote server, run `build.sh --prod`

### Lack of root access

Sometimes, you may lack the appropriate privileges to install the necessary prerequisites (Node.js, gulp, etc) on a system.

To get around this, you can download a standalone version of the Node.js executable which will live inside of your project directory:

 1. Enter the following on the command line:

*Windows:*

   ```
   cd tools
   node-install --standalone
   ```

*Mac/Linux:*

   ```
   cd tools
   ./node-install.sh --standalone
   ```

 1. This will download a standalone Node executable into `tools/node`. A specific subdirectory will be created based on your OS. For instance, a Windows version of Node.js would be created in `tools/node/windows/node.exe`.

 1. As this is system-specific, the directory `tools/node` is generally not committed to source control.

---

## DIRECTORY STRUCTURE

### Source code

Project source code, generally requires Gulp compilation before runnable in the browser.

    /src
        /assets
             /media
                 /fonts                     /* Fonts directory */
                 /images                    /* Images directory */
                 /uploads                   /* Uploads directory */
            /scripts
                App.js                      /* Initializes all JavaScript components in your application */
                config.js                   /* RequireJS configuration file (only appears if RequireJS is used) */
                main.js                     /* Main entry point. JavaScript execution starts here */
            /styles                         /* CSS directory */
            /vendor                         /* Third-party libraries. Bower outputs here by default */
        /templates                          /* Markup templates */
        index.html                          /* Index page */

    /tools
        /cache                              /* Nerdery-created bower modules */
        /tasks                              /* Config files for each gulp task */
        /utils
            curl.vbs                        /* Curl command for Windows */
            unzip.vbs                       /* Unzip command for Windows */
        node-install.sh                       /* Mac/Linux local install for node+bower+gulp */
        node-install.cmd                      /* Windows bundled executable for node+bower+gulp */
        npm-postinstall.js                  /* Copies local Nerdery modules to node_modules */

    .bowerrc                                /* bower configuration */
    .editorconfig                           /* IDE style rules (see editorconfig.org) */
    .gitattributes                          /* Settings for Git source control */
    .gitignore                              /* Describes files ignored by Git source control */
    .jshintrc                               /* JSHint style rules */
    bower.json                              /* Defines bower packages that this application depends on */
    build.cmd                               /* Windows Build script (short for `npm install`+`bower install`+`gulp`) */
    build.sh                                /* Mac/Linux Build script (short for `npm install`+`bower install`+`gulp`) */
    build-env.js                            /* Environment-specific build settings for gulp (NOT committed to source control) */
    build-env.js.dist                       /* Template for build settings used by gulp */
    gulpfile.js                            /* Executes build when running the command `gulp` */
    manifest.txt                            /* This file */
    package.json                            /* NPM packages this application depends on */
    README.md                               /* Steps for building the application */

### Built output

These files are generated by an automated tool. Do not modify directly.
Instead, modify the appropriate source code. Generally not commited to source control.

    /docs
        /js                                 /* Generated JavaScript documentation  */
    /node_modules                           /* node.js module dependencies needed by gulp */
    /tools
        /node                               /* Optional standalone executables for node+bower+gulp to be bundled with project */
    /web                                    /* The built website output runnable in the browser */
