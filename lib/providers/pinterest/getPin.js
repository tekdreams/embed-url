const providerError = require(__dirname+'/../../../util/errors').providerError,
pinterestAPI = require('pinterest-api'),
parseUrl = require('url'),
S = require('string');

exports.getPin = (url, tab) => {
    return new Promise((resolve, reject) => {
        let arrayPin = new Array();
        arrayPin[0] = tab[tab.length - 1];
        pinterestAPI.getDataForPins(arrayPin, pins => {
            if (pins && pins.data && pins.data.length > 0) {
                let embed = pins.data[0];
                if (embed.embed && embed.embed.src && embed.embed.src.indexOf("youtube") >= 0)
                    embed.embed.src = 'http://www.youtube.com' + parseUrl.parse(embed.embed.src).pathname;
                embed.type = embed.is_video == false ? 'photo' : 'video';
                embed.providerId = embed.id ? embed.id : null;
                embed.title = embed.description ? S(embed.description).decodeHTMLEntities().s : null;
                embed.expandedUrl = url;
                embed.embedUrl = embed.embed && embed.embed.src ? embed.embed.src : embed.images['237x'].url.replace('237x', '736x');
                embed.thumbnail = embed.images ? embed.images['237x'].url : null;
                resolve(embed)
            } else
                reject(providerError('pinterest', null));
        });
    })
}