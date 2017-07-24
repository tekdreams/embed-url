"use strict"
const conf = {
	flickr: {
		consumer_key: "YOUR_FLICKR_CONSUMER_KEY",
		consumer_secret: "YOUR_FLICKR_CONSUMER_SECRET"
	},
	twitter: {
		oauth: { 
			consumer_key: "YOUR_TWITTER_CONSUMER_KEY", 
			consumer_secret: "YOUR_TWITTER_CONSUMER_SECRET",
	        token: "YOUR_TWITTER_TOKEN",
	        token_secret: "YOUR_TWITTER_TOKEN_SECRET"
	    }
	},
	youtube : {
		key: "YOUR_YOUTUBE_KEY",
	},
	instagram : {
		instagram_username: "YOUR_INSTAGRAM_USERNAME",
		instagram_password: "YOUR_INSTAGRAM_PASSWORD"
	},
	tumblr : {
		consumer_key : "YOUR_TUMBLR_CONSUMER_KEY"
	}
};

exports.credentialsConfig = provider => {
	return (conf[provider]);
}