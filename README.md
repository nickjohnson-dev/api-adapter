# api-adapter

[![npm version](https://badge.fury.io/js/api-adapter.svg)](https://badge.fury.io/js/api-adapter)

Decouple the shape of your data on the client and server.

Allows you to easily convert unfortunately named properties on server responses so that they're more pleasant to work with on the client. Even supports deep flattening and nesting of values.

Defining the mapping of server to client data in a single spot means no more renaming in hundreds of files when someone changes the property names on the backend.

## Installation

```bash
npm install api-adapter
```

## Usage

The helper `createAdapter` takes an object with keys equal to unwanted [property paths](https://lodash.com/docs#get) in your API response, and values equal to desired property paths to use in your client.

```javascript
import { createAdapter } from 'api-adapter';
const adapter = createAdapter({
  name: 'title',
  'other.band': 'artist',
});
```

The adapter's `fromApi` method will convert your data into a pleasant format you can use in the client.

```javascript
const clientData = adapter.fromApi({
  name: 'Blue in Green',
  other: {
    band: 'Bill Evans',
  },
});

console.log(clientData);
// { artist: 'Bill Evans', title: 'Blue in Green' }
```

Then, the `toApi` method will then convert back to the API structure when you're ready to send an update to the server.

```javascript
const apiData = adapter.toApi({
  artist: 'Bill Evans',
  title: 'Blue in Green',
});

console.log(apiData);
// { name: 'Blue in Green', other: { band: 'Bill Evans' } }
```

Both methods can also handle arrays!

```javascript
const clientData = adapter.fromApi([
  { name: 'Blue in Green', other: { band: 'Bill Evans' } },
  { name: 'マイワールド', other: { band: 'ASIAN KUNG-FU GENERATION' } },
]);

console.log(clientData);
// [
//   { artist: 'Bill Evans', title: 'Blue in Green' },
//   { artist: 'ASIAN KUNG-FU GENERATION', title: 'マイワールド' },
// ]
```
