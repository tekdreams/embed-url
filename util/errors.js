
exports.providerError = function(provider, error) {
	var error = {
		'provider': provider,
		'error': error ? error : 'invalid url'
	};
	return (error);
};