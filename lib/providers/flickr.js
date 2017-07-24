"use strict"
exports.logger = require(__dirname+'/../../util/logger.js').logger;
const flickr = require('flickr-with-uploads'),
providerError = require(__dirname+'/../../util/errors').providerError,
config = require(__dirname+ '/../../config/apisConfig.js').apisConfig,
credentials = require(__dirname+ '/../../provider-config/credentialsConfig.js').credentialsConfig;

exports.getFlickr = url => {
    return new Promise((resolve, reject) => {
        const provider = 'flickr',
        flickrApi = flickr(credentials(provider).consumer_key, credentials(provider).consumer_secret),
        flickr_reg = config(provider).regex, match = url.match(flickr_reg);
        if (match && match[1] && credentials(provider).consumer_key  && credentials(provider).consumer_key != "YOUR_FLICKR_CONSUMER_KEY"  && credentials(provider).consumer_secret && credentials(provider).consumer_secret != "YOUR_FLICKR_CONSUMER_SECRET") {
            const id = match[1];
            flickrApi(({method: config(provider).method, photo_id: id}), (err, response) => {
                if (err)
                    reject(providerError('flickr', err)) 
                else {
                    let embed = response;
                    embed.type = 'photo';
                    resolve(embed);
                }   
            });    
        } else reject(providerError('flickr', 'Invalid Url or credentials')) 
    })
}