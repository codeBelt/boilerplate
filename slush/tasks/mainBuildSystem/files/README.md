# <%= projectName %>

# Quick Start

Below are the common ```gulp``` tasks you can run.

---
### First time using the project boilerplate

    $ gulp && gulp watch --open

---
### Build Files
Builds the project either in the develop or production mode depending on what is set for ```BUILD_MODE``` in **build-env.js** file.

    $ gulp

    // Override the BUILD_MODE with one of the following flag
    $ gulp --dev
    $ gulp --prod

By default the ```BUILD_MODE``` in **build-env.js** file production mode. Don't forget to change this so you not always building in production mode.

---
### Watch Files

    $ gulp watch

	// Automaticlly open project in the browser
    $ gulp watch --open


# Other Tasks

    // Builds YUIDocs
    $ gulp docs

    // Checks your JavaScript code
    $ gulp lint
