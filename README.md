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
const whateverNameWeWant = require("./message");

console.log(whateverNameWeWant); // logs "hello"
```

### Built in/3rd party modules

Node comes with a load of useful modules built-in. You can import these the same way, but without the relative file path. For example to access the built-in filesystem module:

```js
const fs = require("fs");

fs.readFile("blah.tx");
```

If you're using a package manager like `npm` to install modules that other people have created you can import them in the same way as built-in ones.

**Note**: You may have come across ES Modules, which are a new standard JS language feature that work in a similar way. Node was created before ES Modules existed, so it has its own different system. The Node team are currently working on ESM support.

## Web servers

Node is most often used to create HTTP servers for the web. It has some nice built-in tools that help us do this.

### Creating a server

The built-in `http` module has a `createServer` method.

```js
const http = require("http");

const server = http.createServer();
```

It's common to use object destructuring to import just the method you need:

```js
const { createServer } = require("http");

const server = createServer();
```

### Handling requests

Our server currently does nothing. We need to pass a "handler function" to `createServer`. This function will be run whenever the server receives a request. This is similar to `addEventListener` in the browser.

The handler will be passed two arguments: an object representing the incoming request, and an object representing the response that will eventually be sent.

```js
const { createServer } = require("http");

const server = createServer((request, response) => {
  response.end("hello");
});
```

We can use the `end` method on the response object to tell Node to send the response. Whatever we pass here will be sent as the response body.

### Starting the server

Our Node program has a functioning server, but that server isn't currently listening for requests. We need to tell it to do so, and what port it should listen on:

```js
const { createServer } = require("http");
const PORT = 3000;

const server = createServer((request, response) => {
  response.end("hello");
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
```

We use the `listen` method of the server object. This takes the port number to listen on, and an optional callback to run when it starts listening. This callback is a good place to log something so you know the server has started.

Now we can run the program in our terminal with `node server.js`. The server will start and you should see "Server listening on http://localhost:3000" logged.

### Sending requests

We can now send HTTP requests to our server and we should see the "hello" response. You can open http://localhost:3000 in your browser to send a `GET` request and see the response. It's helpful to open the network tab of devtools so you can see all the details of the request and response.

The server currently returns "hello" as plaintext no matter what request we send it. Lets make it more interesting.

### The response

HTTP responses need a few different things:

1. A status code (e.g. `200` for success or `404` for not found)
1. Headers to provide info about the response
1. A body (the response data itself)

#### Status code

We're currently only providing the body. Node will set the status code to `200` by default, but it's best to be explicit.

```js
const server = createServer((request, response) => {
  response.statusCode = 200;
  response.end("Hello");
});
```

#### Headers

We should set headers describing our response. For example here we're sending the body as regular text, so we should tell the browser that using the `content-type` header.

```js
const server = createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader(("content-type": "text/plain"));
  response.end("Hello");
});
```

#### JSON body

We aren't limited to a plaintext response. Lets send some JSON instead.

```js
const server = createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader(("content-type": "application/json"));
  response.end(JSON.stringify({ message: "Hello" }));
});
```

It's important to note that our response has to be a string, which is why we stringify our object.

#### HTML body

Browsers don't handle JSON that well. Web pages are made of HTML, so lets change our response to that.

```js
const server = createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader(("content-type": "text/html"));
  response.end("<h1>Hello</h1>");
});
```

#### Simplifying headers

If we wanted to set more headers we'd end up with a lot of `setHeader` calls. Node has a method for setting the status code _and_ all the headers at once: `response.writeHead`.

```js
const server = createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  response.end("<h1>Hello</h1>");
});
```

We provide the status code as the first argument and an object of headers as the second.

### The request

So far we've only looked at the response argument of our handler function. Let's log a few properties of the request object.

```js
const server = createServer((request, response) => {
  console.log(request.method, request.url);
  response.writeHead(200, { "content-type": "text/html" });
  response.end("<h1>Hello</h1>");
});
```

Now when you refresh `localhost:3000` in your browser you should see `GET /` logged in your terminal. Now visit `localhost:3000/goodbye` in your browser. You should see `GET /goodbye` logged in your terminal. Now run `curl -X POST localhost:3000` in your terminal (or use Postman to send a POST request if you prefer). You should see `POST /` logged by your server.

We can use the method and URL of the request to determine what response to send.

#### Routing

Lets create another page for our site that displays a different message at `localhost:3000/goodbye`.

```js
const server = createServer((request, response) => {
  const url = request.url;
  if (url === "/") {
    response.writeHead(200, { "content-type": "text/html" });
    response.end("<h1>Hello</h1>");
  } else if (url === "/goodbye") {
    response.writeHead(200, { "content-type": "text/html" });
    response.end("<h1>Goodbye</h1>");
  }
});
```

Visit `localhost:3000/goodbye` in your browser and you should see the "Goodbye" title.

#### Missing resources

Now that we have routing for different pages it's possible to send requests for resources that don't exist. For example visit `localhost:3000/uhoh` in your browser. The request will hang as the browser never receives a response.

We should add a case to our `if` statement to send a response when the URL doesn't match.

```js
const server = createServer((request, response) => {
  const url = request.url;
  if (url === "/") {
    response.writeHead(200, { "content-type": "text/html" });
    response.end("<h1>Hello</h1>");
  } else if (url === "/goodbye") {
    response.writeHead(200, { "content-type": "text/html" });
    response.end("<h1>Goodbye</h1>");
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>Not found</h1>");
  }
});
```

Now our server will send a `404` response for any request it doesn't recognise, and the user will see a "Not found" message.
