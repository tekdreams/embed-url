const twitter = require('./providers/twitter'),
instagram = require('./providers/instagram'),
flickr = require('./providers/flickr'),
vimeo = require('./providers/vimeo'),
youtube = require('./providers/youtube'),
dailymotion = require('./providers/dailymotion'),
tumblr = require('./providers/tumblr/tumblr'),
pinterest = require('./providers/pinterest/pinterest'),
providerNews = require('./provider_news');

const providers = {
    instagram: {
        regexpdetect: /((http:\/\/(instagr\.am\/p\/.*|instagram\.com\/p\/.*|www\.instagram\.com\/p\/.*))|(https:\/\/(www\.instagram\.com\/p\/.*)))/i,
        multi: true,
        fcn: instagram.getInstagram,
        photo: [
            {name: 'mediaId', field: 'id'}, 
            {name: 'title', field: 'caption'}, 
            {name: 'embedUrl', field: 'images[0].url'}, 
            {name: 'thumbnail', field: 'images[0].url'}
        ],
        video: [
            {name: 'providerId', field: 'id'}, 
            {name: 'title', field: 'caption'}, 
            {name: 'embedUrl', field:'videos[0].url'}, 
            {name: 'thumbnail', field: 'images[0].url'}
        ]
    },
    twitter: {
        regexpdetect: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/,
        multi: true,
        fcn: twitter.getTwitter,
        photo: [
            {name: 'mediaId', field: 'id'}, 
            {name: 'title', field: 'title'}, 
            {name: 'embedUrl', field: 'embedUrl'}, 
            {name: 'thumbnail', field: 'thumbnail'}
        ],
        video: [
            {name: 'mediaId', field: 'id'}, 
            {name: 'title', field: 'title'}, 
            {name: 'embedUrl', field:'embedUrl'}, 
            {name: 'thumbnail', field:'thumbnail'}
        ],
        text: [
            {name: 'mediaId', field: 'id'}, 
            {name: 'title', field: 'title'}, 
            {name: 'embedUrl', field:'embedUrl'}, 
            {name: 'thumbnail', field:'thumbnail'}
        ]
    },
    flickr: {
        regexpdetect: /((http:\/\/(www\.flickr\.com\/photos\/.*|flic\.kr\/.*))|(https:\/\/(www\.flickr\.com\/photos\/.*|flic\.kr\/.*)))/,
        multi: false,
        fcn: flickr.getFlickr,
        fields: [
            {name: 'mediaId', field: 'photo[0].$.id'}, 
            {name: 'title', field: 'photo[0].title[0]'}, 
            {name: 'embedUrl', field: function(obj) {
                    return 'http://farm' + obj.photo[0].$.farm + '.staticflickr.com/' + obj.photo[0].$.server + '/' + obj.photo[0].$.id + '_' + obj.photo[0].$.secret + '_b.jpg';
                }
            }, 
            {name: 'thumbnail', field: function(obj) {
                    return 'http://farm' + obj.photo[0].$.farm + '.staticflickr.com/' + obj.photo[0].$.server + '/' + obj.photo[0].$.id + '_' + obj.photo[0].$.secret + '_c.jpg';
                }
            }
        ]
    },
    youtube: {
        regexpdetect: /((http:\/\/(.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|youtu\.be\/.*|.*\.youtube\.com\/user\/.*|.*\.youtube\.com\/.*#.*\/.*|m\.youtube\.com\/watch.*|m\.youtube\.com\/index.*|.*\.youtube\.com\/profile.*|.*\.youtube\.com\/view_play_list.*|.*\.youtube\.com\/playlist.*))|(https:\/\/(.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*)))/i,
        multi: false,
        fcn: youtube.getYoutube,
        fields: [
            {name: 'mediaId', field: 'id'}, 
            {name: 'title', field: 'snippet.title'}, 
            {name: 'embedUrl', field:'id', concat: 'http://www.youtube.com/embed/', pos: "before"}, 
            {name: 'thumbnail', field: 'snippet.thumbnails.high.url'}
        ]
    },
    vimeo: {
        regexpdetect: /((http:\/\/(www\.vimeo\.com\/groups\/.*\/videos\/.*|www\.vimeo\.com\/.*|vimeo\.com\/groups\/.*\/videos\/.*|vimeo\.com\/.*|vimeo\.com\/m\/#\/.*|player\.vimeo\.com\/.*))|(https:\/\/(www\.vimeo\.com\/.*|vimeo\.com\/.*|player\.vimeo\.com\/.*)))/i,
        multi: false,
        fcn: vimeo.getVimeo,
        fields: [
            {name: 'mediaId', field: 'raw.id'}, 
            {name: 'title', field: 'raw.title'}, 
            {name: 'embedUrl', field:'raw.id', concat: 'http://player.vimeo.com/video/', pos: "before"}, 
            {name: 'thumbnail', field:'raw.thumbnail_large'}
        ]
    },
    dailymotion: {
        regexpdetect: /http:\/\/(.*\.dailymotion\.com\/video\/.*|.*\.dailymotion\.com\/.*\/video\/.*)/i,
        multi: false,
        fcn: dailymotion.getDailymotion,
        fields: [
            {name: 'mediaId', field: 'id'}, 
            {name: 'title', field: 'title'}, 
            {name: 'embedUrl', field:'embed_url'}, 
            {name: 'thumbnail', field:'thumbnail_large_url'}
        ]
    },
    tumblr: {
        regexpdetect: /http:\/\/(.*\.tumblr\.com\/.*|.*\.tumblr\.com|.*\.tumblr\.com\/post\/.*|tumblr\.com\/post\/.*|.*\/post\/[0-9]+\/.*)/i,
        multi: true,
        fcn: tumblr.getTumblr,
        photo: [
            {name: 'mediaId', field: 'providerId'}, 
            {name: 'title', field: 'title'},  
            {name: 'embedUrl', field: 'embedUrl'}, 
            {name: 'thumbnail', field: 'thumbnail'},
        ],
        video: [
            {name: 'mediaId', field: 'providerId'}, 
            {name: 'title', field: 'title'}, 
            {name: 'embedUrl', field:'embedUrl'}, 
            {name: 'thumbnail', field:'thumbnail'},
        ]
    },
    Tumblr: {
        regexpdetect: /((http:\/\/(tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*))|(https:\/\/(tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*)))/i,
        multi: true,
        fcn: tumblr.getTumblr,
        photo: [
            {name: 'mediaId', field: 'providerId'}, 
            {name: 'title', field: 'title'},  
            {name: 'embedUrl', field: 'embedUrl'}, 
            {name: 'thumbnail', field: 'thumbnail'},
        ],
        video: [
            {name: 'mediaId', field: 'providerId'}, 
            {name: 'title', field: 'title'}, 
            {name: 'embedUrl', field:'embedUrl'}, 
            {name: 'thumbnail', field:'thumbnail'},
        ]
    },
    pinterest: {
        regexpdetect: /(?:(?:http|https):\/\/)?(?:www.)?(?:pinterest.com)\/([A-Za-z0-9-_]+)/,
        multi: false,
        fcn: pinterest.getPinterest,
        fields: [
            {name: 'mediaId', field: 'providerId'}, 
            {name: 'title', field: 'title'},  
            {name: 'embedUrl', field:'embedUrl'}, 
            {name: 'thumbnail', field:'thumbnail'}
        ]
    },
    other: {
        regexpdetect: null,
    }
};

function getMediaObj(url, raw, provider, type) {
    let obj = {}, fields = providers[provider] ? providers[provider] : providers['other'];
    if (fields.multi) {
        fields = fields[type];
    } else {
        fields = fields.fields;
    } try {
        for (field in fields) {
            let tmpField = fields[field], stringField = "raw.";
            if (typeof tmpField.field == 'function') {
                obj[tmpField.name] = tmpField.field(raw);
            } else {
                const evalField = eval(stringField+tmpField.field);
                if(tmpField.concat) {
                    if(tmpField.pos == "before")
                        obj[tmpField.name] = tmpField.concat + evalField;
                    else
                        obj[tmpField.name] = evalField + tmpField.concat;
                } else {
                    obj[tmpField.name] = evalField;
                }
            }
        }
    } catch(e) {
        console.log('error:', e.message);
    }
    obj.provider = provider;   
    const providIndex = providers[provider] ? provider : 'news';
    obj.url = url;
    obj.typeMedia = type;
    obj[providIndex] = raw;
    return obj;
};

exports.embedUrl = url => {
    return new Promise((resolve, reject) => {
        let iterator = 0;
        for (provider in providers) {
            if (iterator == 0 && (provider == "other" || providers[provider].regexpdetect.test(url))) {
                ++iterator;
                const providerTmp = provider;
                if (provider != 'other') {
                    providers[provider].fcn(url)
                    .then(data => resolve(getMediaObj(url, data, providerTmp, data.type)))
                    .catch(error => reject(error))
                } else {
                    reject({ "error": "Providers allowed : Dailymotion, Flickr, Instagram, Tumblr, Twitter, Youtube, Vimeo" })
                }
            }
        }
    })
};
