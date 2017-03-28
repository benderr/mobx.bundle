const basePath = '/';

export default {
	ACTIONS: {
		TEST_ACTION: 'TEST_ACTION',
		TEST_ASYNC_ACTION_START: 'TEST_ASYNC_ACTION_START',
		TEST_ASYNC_ACTION_ERROR: 'TEST_ASYNC_ACTION_ERROR',
		TEST_ASYNC_ACTION_SUCCESS: 'TEST_ASYNC_ACTION_SUCCESS',
		TEST_ACTION2: 'TEST_ACTION2'
	}
};

export const ROUTES = {
	SIGN_IN: `${ basePath }signin`,
	LIST_EXAMPLE: `${ basePath }list-example`,
	FINANCE: `${ basePath }finance`,
	HOME: basePath
};

