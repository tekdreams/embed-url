"use strict"
const Client = require('instagram-private-api').V1, 
logger = require(__dirname+'/../../util/logger'),
providerError = require(__dirname+'/../../util/errors').providerError,
credentials = require(__dirname+ '/../../provider-config/credentialsConfig.js').credentialsConfig;

exports.getInstagram = url => {
    return new Promise((resolve, reject) => {
        const provider = 'instagram',
        pwd = credentials(provider).instagram_password, username = credentials(provider).instagram_username,
        device = new Client.Device(username), storage = new Client.CookieMemoryStorage(); 
        var promise =  Client.Session.create(device, storage, username, pwd )
        promise.then(function(sessionInstance) {
        // you need to wait until session is available.Then you can use session to work with instagram.
           return Client.Media.getByUrl(sessionInstance, url)
        }).then(json => {
            let embed = json._params
            embed.type = json._params && json._params.videos && json._params.videos.length > 0 ? 'video' : 'photo'          
            resolve(embed)
        })
        .catch(e => reject(providerError('instagram', e.message)))
    })
}