function* catchServerError(error, cb) {
	// function* _cb(e) {
	// 	yield cb(e);
	// }

	if (error && error.data && error.data.status >= 400) {
		yield cb(error.data);
	} else {
		throw error;
	}
}

export default catchServerError;