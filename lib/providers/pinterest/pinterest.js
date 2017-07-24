"use strict"
const getPin = require(__dirname + '/getPin').getPin,
getBoard = require(__dirname + '/getBoard').getBoard,
providerError = require(__dirname+'/../../../util/errors').providerError;

exports.getPinterest = url => {
    return new Promise((resolve, reject) => {
        url = url && url.substring(url.length-1) == "/" ? url.substring(0, url.length-1) : url;
        const tab = url.split('/');
        if (url.indexOf("/pin/") > 0) {
            getPin(url, tab)
            .then(returnedPin => resolve(returnedPin))
            .catch(err => err)      
        } else if (tab.length <= 5) { 
            getBoard(url, tab)
            .then(returnedPin => resolve(returnedPin))
            .catch(err => err)    
        } else
            reject(providerError('pinterest', 'Invalid Pinterest url (only pins and boards are allowed)'))
    });
}
