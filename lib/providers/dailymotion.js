const request = require('request'),
logger = require(__dirname+'/../../util/logger'),
providerError = require(__dirname+ '/../../util/errors').providerError,
config = require(__dirname+ '/../../config/apisConfig.js').apisConfig;

exports.getDailymotion = url => {
    return new Promise((resolve, reject) => {
        const provider = 'dailymotion', dailymotion_reg = config(provider).regex, match = url.match(dailymotion_reg);
        if (match && match[2]) {
            let apiUrl = config(provider).apiUrl;
            const id = match[2];
            apiUrl += id + config(provider).params;
            request.get(({url: apiUrl, json: true}), (e, r, media) => {
                if (media && media.id) {
                    let embed = media; 
                    embed.type = 'video';
                    resolve(embed)
                } else
                    reject(providerError('dailymotion', e));               
            });
        } else
            reject(providerError('dailymotion', null));
    })
}