"use strict"
const providerError = require(__dirname+'/../../../util/errors').providerError,
getPosts = require(__dirname + '/getPosts').getTumblrPosts;

exports.getTumblr = url => {
    return new Promise((resolve, reject) => {
        const tabUrl = url.split('/');
        if (url.indexOf("/post/") >= 0) {
            getPosts(url)
            .then(tumblrTab => resolve(tumblrTab))
            .catch(err => reject(err))      
        } else reject(providerError('tumblr', null))  
    })  
};






