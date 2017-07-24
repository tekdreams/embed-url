"use strict"
const embedurl = require('../embedurl.js');

  describe('Embed url endpoints test', function() {
    this.timeout(50000)
    it('should call the Instagram embed url  endpoint', () => {
      return embedurl.url('https://www.instagram.com/p/BWK9J6vFLSy/?tagged=lascoloradas')
        .then(res => console.log("Embed url", res.embedUrl))
        .catch(err => console.error("Error", err))
    });
    it('should call the Dailymotion embed url  endpoint', () => {
      return embedurl.url('http://www.dailymotion.com/video/x1ray2q_le-zap-de-spi0n-n-216-zapping-du-web_fun')
        .then(res => console.log("Embed url", res.embedUrl))
        .catch(err => console.error(err))
    });
    it('should call the Flickr embed url  endpoint', () => {
      return embedurl.url('https://www.flickr.com/photos/bmse/33877401593/in/album-72157681958239290/')
        .then(res => console.log("Embed url", res.embedUrl))
        .catch(err => console.error(err))
    });
    it('should call the Vimeo embed url  endpoint', () => {
      return embedurl.url('http://vimeo.com/65399779')
        .then(res => console.log("Embed url", res.embedUrl))
        .catch(err => console.error(err))
    });
    it('should call the Twitter embed url  endpoint', () => {
      return embedurl.url('https://twitter.com/kevingameiro9/status/832967514787299330')
        .then(res => console.log("Embed url", res.embedUrl))
        .catch(err => console.error("Error", err))
    });
    it('should call the Youtube embed url  endpoint', () => {
      return embedurl.url('http://www.youtube.com/watch?v=-ywcu1rzPik')
        .then(res => console.log("Embed url", res.embedUrl))
        .catch(err => console.error("Error", err))
    });
    it('should call the Pinterest embed url  endpoint', () => {
      return embedurl.url('https://fr.pinterest.com/pin/198158452334441627/')
        .then(res => console.log("Embed url", res.embedUrl))
        .catch(err => console.error(err))
    });
    it('should call the Tumblr embed url  endpoint', () => {
      return embedurl.url('http://yoonmin.tumblr.com/post/162738266362')
        .then(res => console.log("Embed url", res.embedUrl))
        .catch(err => console.error("Error", err))
    });
  });