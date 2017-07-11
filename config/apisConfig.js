const conf = {
	dailymotion: {
		apiUrl: 'https://api.dailymotion.com/video/',
		regex: /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/,
		params: '?fields=comments_total,description%2Cduration%2Cembed_url%2Cid%2Crating%2Cratings_total%2Cthumbnail_large_url%2Ctitle%2Cviews_last_day%2Cviews_last_hour%2Cviews_last_month%2Cviews_last_week%2Cviews_total%2Clanguage'
	},
	flickr: {
		regex: /photos\/[^\/]+\/([0-9]+)/,
		method : 'flickr.photos.getInfo'
	},
	twitter: {
		apiUrl: 'https://api.twitter.com/1.1/statuses/show.json?',
		regex: /\/(\d+)$/,
		params: {
			include_entities: true,
         	count: 1000
		}
	},
	vimeo: {
		regex: /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/,
	},
	youtube : {
		apiUrl: 'https://www.googleapis.com/youtube/v3/videos?',
		regex: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
		part: 'snippet,statistics'
	},
	tumblr: {
		apiUrl: 'https://api.tumblr.com/v2/blog/',
		params: '/posts?api_key=',
		paramsPost: '/posts?id=',
		paramsKeyPost: '&api_key='
	},

};

exports.apisConfig = provider => {
	return (conf[provider]);
}