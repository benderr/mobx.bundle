const basePath = '/';

export default {
	ACTIONS: {
		TEST_ACTION: 'TEST_ACTION',
		TEST_ASYNC_ACTION_START: 'TEST_ASYNC_ACTION_START',
		TEST_ASYNC_ACTION_ERROR: 'TEST_ASYNC_ACTION_ERROR',
		TEST_ASYNC_ACTION_SUCCESS: 'TEST_ASYNC_ACTION_SUCCESS'
	}
};

export const ROUTES = {
	SIGN_IN: `${ basePath }signin`,
	LIST_EXAMPLE: `${ basePath }list-example`,
	HOME: basePath
};