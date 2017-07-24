"use strict"
const request = require('request'),
qs = require('querystring'),
logger = require(__dirname+'/../../util/logger'),
config = require(__dirname+ '/../../config/apisConfig.js').apisConfig,
credentials = require(__dirname+ '/../../provider-config/credentialsConfig.js').credentialsConfig,
providerError = require(__dirname+'/../../util/errors').providerError;

function getYoutubeInfo(match) {
    return new Promise((resolve, reject) => {
        let apiUrl = config(provider).apiUrl;
        const params = {
            id: match[2],
            part: config(provider).part,
            key: credentials(provider).key
        };
        apiUrl += qs.stringify(params);
        request.get(({url: apiUrl, json: true}), (e, r, media) => {
            if (media && media.items && media.items.length > 0) {
                let embed = media.items[0]; 
                embed.type = 'video';
                resolve(embed)
            } else
                reject(providerError('youtube', media))
        });
    })
}

exports.getYoutube = url => {
    return new Promise((resolve, reject) => {
        const provider = 'youtube',
        youtube_reg = config(provider).regex,
        match = url.match(youtube_reg);
        if (match && match[2].length == 11) {
            getYoutubeInfo(match)
            .then(media => resolve(media))
            .catch(error => reject(error))
        } else
            reject(providerError('youtube', null))   
    })    
}