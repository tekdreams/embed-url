const providerError = require(__dirname+'/../../../util/errors').providerError,
pinterestAPI = require('pinterest-api'),
parseUrl = require('url'),
S = require('string');

exports.getBoard = (url, tab) => {
    return new Promise((resolve, reject) => {
        const accountName = tab[tab.length - 2], boardName = tab[tab.length - 1], pinterest = pinterestAPI(accountName);
        let pinTab = [];
        pinterest.getPinsFromBoard((boardName, true), pins => {
        	if (pins && pins.data && pins.data.length > 0) {
        		const medias = pins.data ? pins.data : [];
                let size = medias.length;
                while ((media = medias.shift())) {
                    --size;
                    if (media.embed && media.embed.src.indexOf("youtube") >= 0)
                    	media.embed.src = 'http://www.youtube.com' + parseUrl.parse(media.embed.src).pathname;
                    media.type = media.is_video == false ? 'photo' : 'video';
                    media.providerId = media.id ? media.id : null;
                    media.title = media.description ? S(media.description).decodeHTMLEntities().s : null;
                    media.expandedUrl = media.id ? 'https://pinterest.com/pin/' + media.id : null;
                    media.embedUrl = media.embed && media.embed.src ? media.embed.src : media.images['237x'].url.replace('237x', '736x');
                    media.thumbnail = media.images ? media.images['237x'].url : null;
                    media.providerDate = media.created_at ? new Date(media.created_at) : null;
                    media.providerTimestamp = media.providerDate ? media.providerDate.getTime() : null;
                    pinTab.push(media);
                    if (size <= 0) {
                        let embed = pinTab
                        embed.embedUrl = pinTab[0].embedUrl;
                        embed.thumbnail = pinTab[0].thumbnail;
                        embed.type = pinTab[0].type 
                        embed.title = pinTab[0].title
                        embed.providerId = pinTab[0].providerId
                    	resolve(embed)
                    }
                }
        	} else
        		reject(providerError('pinterest', null));
    	}); 
    })  
}