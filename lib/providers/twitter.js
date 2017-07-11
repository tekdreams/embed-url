const request = require('request'),
qs = require('querystring'),
logger = require(__dirname+'/../../util/logger'),
providerError = require(__dirname+'/../../util/errors').providerError,
credentials = require(__dirname+ '/../../provider-config/credentialsConfig.js').credentialsConfig,
config = require(__dirname+ '/../../config/apisConfig.js').apisConfig;

function getTwitterInfo(myId) {
    return new Promise((resolve, reject) => {
        const provider = 'twitter', oauth = credentials(provider).oauth;
        let url = config(provider).apiUrl, params = config(provider).params;
        params.id = myId, url += qs.stringify(params);
        request.get(({url: url, oauth: oauth, json: true}), (e, r, media) => {
            if (e && e != null || (media && media.errors) || (media && media.error && media.error.length == 0) || (media && media.errors && media.errors.length == 0)) {
                const error = media ? media : null
                reject(providerError('twitter', error))
            } else {
                let embed = media;
                embed.providerId = media.id;
                embed.title = media.text;
                if (media.extended_entities && media.extended_entities.media && media.extended_entities.media.length > 0) {
                    const datamedia = media.extended_entities.media[0];
                    embed.thumbnail = datamedia.media_url ? datamedia.media_url : null;
                    embed.type = datamedia.type == 'video' ? 'video' : 'photo';
                    embed.embedUrl = media.type == 'video' ? datamedia.video_info.variants[0].url : embed.thumbnail;
                } else if (media.entities.media && media.entities.media[0]) {
                    const datamedia = media.entities.media;
                    embed.embedUrl = datamedia.media_url ? datamedia.media_url : null;
                    embed.thumbnail = datamedia.media_url ? datamedia.media_url : null;
                    embed.type = datamedia.type == 'video' ? 'video' : 'photo';
                } else {
                    embed.embedUrl = null;
                    embed.thumbnail = null;
                    embed.type = 'text';
                }
                resolve(embed);
            }
        });
    })
}

exports.getTwitter = url => {
    return new Promise((resolve, reject) => {
        const regex = config(provider).regex, matches = url.match(regex),
        id = matches[1];
        if (isNaN(id) == true || id == null) {
            reject(providerError('twitter', null))
        } else {
            getTwitterInfo(id)
            .then(media => resolve(media))
            .catch(error => reject(error))
        }
    })
}