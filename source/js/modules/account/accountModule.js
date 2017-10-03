import * as routes  from './routes.js';
import authStore from './stores/authStore';
// import profileStore from './stores/profileStore';

export function getRoutes() {
	return routes.getRoutes();
}

export function getStores() {
	return {
		account: {
			authStore
		}
	}
}