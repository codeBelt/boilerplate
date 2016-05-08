slush-project
==============

> A [slush](http://slushjs.github.io) generator to create different Front-end / Client-side boilerplates while maintainer the same folder structure. 

> ####Configure Options:
> 
> * **JavaScript** - Babel (ES2015), TypeScript (ES2015), or RequireJS (ES5)
> * **CSS** - Sass, PostCSS, or None
> * **HTML** - Handlebars, Includes, or None
> * **Plus More...**
> 
> ####Features:
> 
> * Development Mode
> * Production Mode
> * Sourcemaps
> * Minifying
> * BrowserSync / Browser Reload
> * YUIDocs


## Installation

Install `slush-project` globally:

```
npm install -g slush-project
```

Remember to install `gulp`, `slush`, and `bower` globally as well, if you haven't already:

```
npm install -g slush gulp bower
```

If you choose TypeScript as an option.  You'll need to have `typings` installed for a smooth installation:

```
npm install -g typings
```

## Usage

Create a new folder for your project:

```
mkdir my-project-app
```

Run the generator from within the new folder:

```
cd my-project-app

slush project
```

## Questions you'll be asked
    

1. Which scripts build system?
	* None 
	* ES2015 (Babel)
	* ES2015 (TypeScript)
	* RequireJS (legacy)
	
1. Any additional scripts?
	* jQuery 
	* Includes
	* Handlebars
	
1. Any additional scripts?
	* jQuery 
	* Modernizr
	* Request Animation Frame
	
1. Which styles build system?
	* None 
	* Sass
	* PostCSS
	
1. Any additional stylesheets?
	* Autoprefixer 
	* Print
	* IE9 Conditional
	* IE8 Conditional
	
1. Which markup build system?
	* None 
	* Includes
	* Handlebars
	
1. Precompile JavaScript Templates?
	* No 
	* Handlebars
	
1. What markup features would you like?
	* Icons 
	* SEO Meta Data
	* XHTML Strict Doctype (legacy)
	* Imagemin
	
1. Do you want a demo application?
	* No 
	* Yes
	
1. Any testing features?
	* 3rd-Party Vulnerability Audit 
	
----

TODO: 

* Add AVA unit testing to projects.
* Make sure optimizeStatic is working.

## License

The MIT License

Copyright (c) 2015, Lucas Constantino Silva

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.