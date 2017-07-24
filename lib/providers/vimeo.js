"use strict"
const video = require('n-vimeo').video,
logger = require(__dirname+'/../../util/logger'),
providerError = require(__dirname+'/../../util/errors').providerError,
config = require(__dirname+ '/../../config/apisConfig.js').apisConfig;

exports.getVimeo = url => {
    return new Promise((resolve, reject) => {
        const provider = 'vimeo', vimeo_reg = config(provider).regex;
        const match = url.match(vimeo_reg);
        if (match && match[3]) {
            const id = match[3]
            video(id, (err, obj) => {
                if (obj && obj.statusCode && obj.statusCode == 404) {
                    reject(providerError('vimeo', err))
                } else {
                    let embed = obj
                    embed.type = 'video';
                    resolve(embed);
                }  
            });
        } else
            reject(providerError('vimeo', null))
    })   
};