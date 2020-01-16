# Text Elite
[![Build Status](https://travis-ci.com/Tehl/txtelite.svg?branch=master)](https://travis-ci.com/Tehl/txtelite)

Text version of Elite trading, in Node.js  
Based on C implementation converted by Ian Bell from 6502 Elite sources.  
Original 6502 Elite by Ian Bell & David Braben.  

Not affiliated with Ian Bell, David Braben or the Elite franchise.

## Repository Overview

### /ref

Original C implementation, for reference.

`/ref/src` contains the original source file retrieved from http://www.iancgbell.clara.net/elite/text/

`/ref/win10` contains a Windows 10-compatible build of the same; the executable distributed by Ian Bell is not compatible with Win10.

`/ref/scripts` contains example game runs provided by contributors to Ian's website. `spears.txt` relies on the native `rand()` implementation in Ian's original build; this unfortunately does not match the Win10 build, so this script does not produce the intended result. `sinclair.txt` uses the platform-independent `rand()` implementation, and can be used to verify the output of the updated build.

Use  
`TXTELITE.exe`  
to play the game interactively, or  
`TXTELITE.exe < ..\scripts\sinclair.txt`  
to run one of the example scripts.

### /port

Direct port of TXTELITE.C to Node.js, as proof-of-concept.

Original logic and program structure is retained; shims in `c_math.js`, `c_string.js` and `c_types.js` provide C-like behavior for strings and fixed-size numeric types.

Use  
`node main.js`  
to play the game interactively, or  
`node main.js < ..\ref\scripts\sinclair.txt`  
to run one of the example scripts.

Requires: Node.js 10+

### /src && /test

Full re-implementation of TXTELITE in ES6+ for Node.js

The remainder of this README refers to the ES6+ implementation of TXTELITE.

## Usage

_Requirements: node_js@10+, npm@6+_

Install:  
`npm ci`

Start game (interactive):  
`npm start`

Start game (example script):  
`npm start < ref\scripts\sinclair.txt`

Run tests:  
`npm test`

## Design Goals

* Clean separation of state, logic and presentation layer
* Unidirectional data flow, based on [Flux](https://facebook.github.io/flux/docs/in-depth-overview#structure-and-data-flow) / [Redux](https://redux.js.org/introduction/three-principles/) concepts
* Event-based architecture
* [Pure](https://en.wikipedia.org/wiki/Pure_function), testable game logic implementations

## License
[MIT](https://raw.githubusercontent.com/Tehl/txtelite/master/LICENSE) except where otherwise specified.  

`/ref/src` is (c) Ian C G Bell  
`/ref/scripts` are (c) original authors  
`/port/printf.js` is (c) 2008 Adaltas, used under [MIT](https://raw.githubusercontent.com/adaltas/node-printf/9bfcac8d565a19dfa1d72e3ebc6e14dfc4a5938b/LICENSE)
