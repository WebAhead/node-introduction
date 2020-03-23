# Node Introduction

Node is a JavaScript runtime that can be used outside of web browsers.

## History

JavaScript was created in 1995 as a programming language specifically for web pages. As the web grew more popular JavaScript became quite prevalent. However unlike other languages the only way to run JS code was inside a web browser.

Node was created in 2009 as a way to run JS anywhere: e.g. on your own computer or a web server. It rips out the V8 JS engine from the Chrome web browser and lets you run that on its own.

## Installation

If you don't already have Node installed you can get an installer [on their website](https://nodejs.org/). It can be useful to instead install Node with a "version manager", which will let you easily switch between different version of Node (this is useful for testing). [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating) is the most popular.

## Usage

Check Node is installed correctly by running `node -v` in your terminal. You should see the Node version you have installed.

### Terminal

The quickest way to run some JS on your own machine is with the built in repl. Type `node` in your terminal and the repl should start. You can type JS code here just like in your browser console. Hitting `return` will run your code and print the result.

### JavaScript files

The repl only works for quick tests: for a real application we need separate JavaScript files. You can run a file using Node by running `node my-file.js` in your terminal.

Create a new directory to work in, then make a new file called `index.js`. Add `console.log("hello")` to the file, then run `node index.js`. You should see "hello" printed to your terminal.

## Modules

Node has its own module system that lets you share code between files.

### Exporting code

You can export values from one file to be used in another using `module.exports`:

```js
// inside hello.js
const message = "hello";

module.exports = message;
```

### Importing code

You can import values that are exported from another file using the `require` keyword:

```js
// inside index.js
const whateverNameWeWant = require("./hello");

console.log(whateverNameWeWant); // logs "hello"
```

### Built in/3rd party modules

Node comes with a load of useful modules built-in. You can import these the same way, but without the relative file path. For example to access the built-in filesystem module:

```js
const fs = require("fs");

fs.readFile("blah.txt");
```

If you're using a package manager like `npm` to install modules that other people have created you can import them in the same way as built-in ones.

**Note**: You may have come across ES Modules, which are a new standard JS language feature that work in a similar way. Node was created before ES Modules existed, so it has its own different system. The Node team are currently working on ESM support.
