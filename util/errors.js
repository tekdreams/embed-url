"use strict"
exports.providerError = function(provider, error) {
	const error = {
		'provider': provider,
		'error': error ? error : 'invalid url'
	};
	return (error);
};