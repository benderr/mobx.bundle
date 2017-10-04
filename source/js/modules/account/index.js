// Components
import SignInContainer from './containers/SignInContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';

// Stores
import authStore from './stores/authStore';

export const stores = {
	authStore
};

export const routes = {
	signin: {
		path: '/signin',
		exact: true,
		allowAnonymous: true,
		component: SignInContainer,
		layout: null
	},
	forgot: {
		path: '/forgot',
		exact: true,
		allowAnonymous: true,
		component: ForgotPasswordContainer,
		layout: null
	},
	home: {
		path: '/',
		exact: true,
		allowAnonymous: true,
		component: () => (<div>Home page</div>),
	},
	documents: {
		path: '/documents',
		exact: true,
		allowAnonymous: true,
		component: () => (<div>Documents page</div>),
	}
};

