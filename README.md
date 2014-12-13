# Prosperity OFX

> An open source OFX/QFX parser

[![Build Status](https://travis-ci.org/prosperityio/prosperity-ofx.svg?branch=master)](https://travis-ci.org/prosperityio/prosperity-ofx)

## Installation

```
npm install prosperity-ofx
```

## Running Tests

```
npm test
```

## Usage

```js
var ofx = require('prosperity-ofx');
```

## API

#### .parse()
Convert OFX or QFX data to a JavaScript object literal.

#### .encode()
Convert your JavaScript Object to OFX.

## Supported OFX Specs

- [x] 1.0.2 specification
- [x] 1.0.3 specification
- [ ] 2.0.3 specification
- [ ] 2.1.1 specification
