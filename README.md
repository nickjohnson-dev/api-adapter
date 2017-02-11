[![npm version](https://badge.fury.io/js/api-adapter.svg)](https://badge.fury.io/js/api-adapter)

# api-adapter
Decouple the shape of your data on the client and server.

Allows you to easily convert unfortunately named properties on server responses. Even supports deep flattening and nesting of values.

## Installation

```bash
npm install api-adapter
```

## Usage

```javascript
import { createAdapter } from 'api-adapter';

// Path Map Format:
// {
//   pathOnServerResponse: 'desiredPathOnClient',
// }
const adapter = createAdapter({
  name: 'title',
  'other.band': 'artist',
});

const apiData = {
  name: 'Blue in Green',
  other: {
    band: 'Bill Evans',
  },
};

const clientData = adapter.fromApi(apiData);

// Result:
// {
//   artist: 'Bill Evans',
//   title: 'Blue in Green',
// }
console.log(clientData);
```
