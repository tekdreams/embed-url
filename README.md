https://travis-ci.org/tekdreams/embed-url.svg?branch=master

Embed Url 
=========

A small library that allows to embed and extract content from third party providers url.
This module manage:
- Dailymotion video urls
- Flickr photo urls
- Instagram post urls
- Pinterest board and pin urls
- Tumblr post urls
- Twitter urls (Tweets)
- Vimeo video urls
- Youtube video urls

## Prerequisites

Node.js - Version >=4.3.2

## Installation

Use npm:

```
$ npm install embed-url --save
```
Or you can clone and install HEAD:

```
git clone https://github.com/tekdreams/embed-url.git
cd embed-url
npm install
```


## Getting Started

For some providers, credentials configurations are mandatory. To start using the embed-url module with Flickr, Instagram, Tumblr, Twitter, Youtube Urls, don't forget to update the credentials concerned in the "provider-config/credentialsConfig.js" file. 

How to get the credentials:

- Instagram: https://www.instagram.com/developer/

- Flickr: https://www.flickr.com/services/api/misc.api_keys.html

- Tumblr: https://www.tumblr.com/docs/en/api/v2

- Twitter: https://apps.twitter.com/

- Youtube: https://developers.google.com/youtube/v3/getting-started

This wrapper utilizes ES6 Promises to handle the API calls.

## Usage

```
const embedurl = require('embed-url');

```

To extract datas from a single url use the following...

```
embedurl.url(URL_TO_EXTRACT)
    .then(result => {
    	// do stuff
    	// console.log("Embed url", result.embedUrl)
    })
    .catch(error => {
    	// errors will bubble up through the reject method of the promise.
        // you'll want to console.log them otherwise it'll fail silently
    })
});
```

The `result` returned in from the promise will be a `Result` object.


## Returned Data

The API returns an object. Below is an example 

```
{ mediaId: '1552321983961937074_25998477',
  title: 'Sem Photoshop, é rosa mesmo! 😉👍🏼 #lascoloradas #yucatán #mexico #roadtrip',
  embedUrl: 'https://scontent-cdg2-1.cdninstagram.com/t51.2885-15/e35/19624133_1476073882469010_4796107352862359552_n.jpg?ig_cache_key=MTU1MjMyMTk4Mzk2MTkzNzA3NA%3D%3D.2&se=8',
  thumbnail: 'https://scontent-cdg2-1.cdninstagram.com/t51.2885-15/e35/19624133_1476073882469010_4796107352862359552_n.jpg?ig_cache_key=MTU1MjMyMTk4Mzk2MTkzNzA3NA%3D%3D.2&se=8',
  provider: 'instagram',
  url: 'https://www.instagram.com/p/BWK9J6vFLSy/?tagged=lascoloradas',
  typeMedia: 'photo',
  instagram:  {
  //Here the original object returned from the provider API if you need more data than the ones above
  }
}
```

## Tests

  `npm test`

Some tests will return "ERROR" due to missing api key

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## License

Copyright © 2017 Tekdreams. [MIT Licensed](LICENSE).