# ANDigital Associate test

Apllication to read request the foursquare api and display the response on a map

* [Installation and Requirements](#installation)
* [Using the app](#usage)
* [Running Tests](#tests)

<a name="installation"></a>
## Installation and Requirements

> **NOTE** Node is a pre-requisite for this application, make sure it's installed

```sh
npm install -g bower gulp
npm update
bower update
```

These commands will download the dependencies for the application. Once all done, start the application:
```sh
gulp
```

and visit [http://localhost:3000](http://localhost:3000) in your browser

<a name="usage"></a>
## Using the app

Type in a location into the search input e.g. London, Ilford, Trafalgar Square, etc. and click search.
You will see the results (currently limited to 10) on the map and in the carousel.

<a name="tests"></a>
## Running tests

> **NOTE** You will need the latest java JDK installed

The chromedriver and the selenium server is not included due to the filesize.
Please download and place the chromedriver and selenium-server-standalone-2.52.0.jar into the tests folder.

Install Nightwatch by running the following command:

```sh
npm install -g nightwatch
```

And then start the tests

```sh
nightwatch --test tests/main.js
```

You will see the test passing

```sh
Running:  main test
 ✔ Element <body> was visible after 130 milliseconds.
  Warn: WaitForElement found 10 elements for selector ".carousel .title h2". Only the first one will be checked.
 ✔ Element <.carousel .title h2> was visible after 1310 milliseconds.
 ✔ Testing if element <.carousel .title h2> contains text: "Hampstead Heath".
```