const request = require('request'),
providerError = require(__dirname+'/../../../util/errors').providerError,
credentials = require(__dirname+ '/../../../provider-config/credentialsConfig.js').credentialsConfig,
config = require(__dirname+ '/../../../config/apisConfig.js').apisConfig;

function getTumblrId(url) {
    const tab = url.split('/');
    let id = null;
    if (tab.length == 5 && isNaN(tab[tab.length - 1]) == false)
        id = tab[tab.length - 1];
    else if (tab.length == 6 && isNaN(tab[tab.length - 2]) == false)
        id = tab[tab.length - 2]
    return id;
}

function getTumblrName(url) {
    const tab = url.split('/');
    return (tab[2]);
}


function getTumblrImages(photos) {
    let photoObj = {}, t = photos.alt_sizes.length;
    photoObj.thumbnail = photos.original_size.url, photoObj.source = photos.original_size.url;
    while (t--) {
        var getPic = photos.alt_sizes[t];
        if (getPic.width == 370 || getPic.width == 400)
            photoObj.thumbnail = getPic.url;
        if (getPic.width == 500 || getPic.width == 400)
            photoObj.source = getPic.url;
        if (t == 0) 
            return photoObj
    }
}

function getmediaObj(media) {
   let embed = {}, user = {};
    user.profilePicture = null;
    user.id = media.blog_name;
    user.name = media.blog_name;
    user.username = media.blog_name;
    embed.people = user;
    embed.note_count = media.note_count ? media.note_count : null;
    embed.source_url = media.source_url ? media.source_url : null;
    embed.source_title = media.source_title ? media.source_title : null;
    embed.caption = media.caption ? media.caption : null;
    embed.tags = media.tags ? media.tags : null;
    embed.post_url = media.post_url ? media.post_url : null;
    embed.blog_name = media.blog_name ? media.blog_name : null;
    embed.id = media.id ? media.id : null;
    embed.date = media.date ? media.date : null;
    embed.timestamp = media.timestamp ? media.timestamp : null;
    embed.photos = media.photos ? media.photos : null;
    embed.reblog = media.reblog ? media.reblog : null;     
    embed.type = media.type ? media.type : null;
    embed.title = media.summary ? media.summary : null;
    embed.providerId = media.id ? media.id : null;
    return embed
}

function concatData(result) {
    let embed = result &&  result.length > 1 ? result[1] : {};
    embed.embedUrl = result && result.length > 1 ? result[0].source : null
    embed.thumbnail = result && result.length > 1 ? result[0].thumbnail : null;
    return embed 
}


function extractTumblrData(media) {
    return new Promise((resolve, reject) => {
        let tumblrTab = new Array();
        if (media.type == 'photo' ) {
            const allPhotos = media.photos;
            allPhotos.forEach(dataPhoto => {
                return Promise.all([getTumblrImages(dataPhoto), getmediaObj(media)])
                .then(concatData)
                .then(embed => {
                    tumblrTab.push(embed)
                    if (allPhotos.length  === tumblrTab.length)
                        resolve(tumblrTab)
                })
            })     
        } else {
            let embed = {};
            embed = media;
            embed.type = media.type ? media.type : null;
            embed.title = media.summary ? media.summary : null;
            embed.providerId = media.id ? media.id : null;
            embed.embedUrl = media.video_url;
            embed.thumbnail = media.thumbnail_url;
            tumblrTab.push(embed);
            resolve(tumblrTab);
        }
    }) 
}

exports.getTumblrPosts = url => {
    return new Promise((resolve, reject) => {
        const id = getTumblrId(url), provider = 'tumblr', name = getTumblrName(url);
        if (id != null) {
            const url = config(provider).apiUrl + name + config(provider).paramsPost + id + config(provider).paramsKeyPost + credentials(provider).consumer_key;
            request.get(({url: url, json: true}), (e, r, media) => {
                if (r && r.statusCode == 429 || media && media.meta && media.meta.status == 429)
                    reject(providerError('tumblr', 'Exceed limit Tumblr\'s API'))
                else if (!e && (media && media != undefined && media.meta && media.meta.status == 200)) {
                    if (media.response.posts[0].type == 'photo' || media.response.posts[0].type == 'video') {
                        extractTumblrData(media.response.posts[0])
                            .then(tumblrTab => {
                                let embed = tumblrTab
                                embed.embedUrl = tumblrTab[0].embedUrl;
                                embed.thumbnail = tumblrTab[0].thumbnail;
                                embed.type = tumblrTab[0].type 
                                embed.title = tumblrTab[0].title
                                embed.providerId = tumblrTab[0].providerId
                                resolve(embed)   
                            })
                    } else reject(providerError('tumblr', 'Only photos and videos allowed'))           
                } else reject(providerError('tumblr', media))
            });
        } else reject(providerError('tumblr', null))   
    })  
}


exports.extractTumblr = extractTumblrData;