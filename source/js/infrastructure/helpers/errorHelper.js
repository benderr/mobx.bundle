export const isServerError = error => {
	if (!error)
		return false;
	const status = error.status || (error.data || {}).status;
	return status >= 400;
};

export const isNetworkError = error => {
	return error && error.message && error.message.toLowerCase() == 'network error';
};