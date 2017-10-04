import { observable, action, runInAction } from 'mobx';
import { logout, login } from './../dataProvider/testMobxContext';

class AuthStore {
	@observable inProgress = false;
	@observable authError = undefined;
	@observable token = undefined;

	@observable
	values = {
		username: '123',
		email: '123',
		password: '123',
	};

	@observable
	user = {
		username: '',
		email: '',
		password: '',
	};


	@action
	setUsername(username) {
		this.values.username = username;
	}

	@action
	setEmail(email) {
		this.values.email = email;
	}

	@action
	setPassword(password) {
		this.values.password = password;
	}

	@action
	reset() {
		this.values.username = '';
		this.values.email = '';
		this.values.password = '';
	}

	// @action
	// login() {
	// 	this.inProgress = true;
	// 	login(this.values.email, this.values.password)
	// 		.then(() => {
	// 			this.inProgress = false;
	// 		});
	// }

	@action
	login = async () => {
		this.inProgress = true;
		this.authError = undefined;
		// try {
			await login(this.values.email, this.values.password)
			// console.log(user);
			// runInAction(() => {
			this.inProgress = false;
			// })
		// } catch (error) {
			// runInAction(() => {
			// 	this.authError = "error"
			// })
		// }
	}

	@action
	register() {
		this.inProgress = true;
		this.errors = undefined;
		// return agent.Auth
		//   .register(this.values.username, this.values.email, this.values.password)
		//   .then(({ user }) => commonStore.setToken(user.token))
		//   .then(() => userStore.pullUser())
		//   .catch(
		//     action(err => {
		//       this.errors =
		//         err.response && err.response.body && err.response.body.errors;
		//       throw err;
		//     })
		//   )
		//   .finally(
		//     action(() => {
		//       this.inProgress = false;
		//     })
		//   );
	}

	@action
	forgot() {
		this.inProgress = true;
		this.errors = undefined;
		// return agent.Auth
		//   .register(this.values.username, this.values.email, this.values.password)
		//   .then(({ user }) => commonStore.setToken(user.token))
		//   .then(() => userStore.pullUser())
		//   .catch(
		//     action(err => {
		//       this.errors =
		//         err.response && err.response.body && err.response.body.errors;
		//       throw err;
		//     })
		//   )
		//   .finally(
		//     action(() => {
		//       this.inProgress = false;
		//     })
		//   );
	}

	@action
	logout() {
		// commonStore.setToken(undefined);
		// userStore.forgetUser();
		// return new Promise(res => res());
	}
}

export default new AuthStore();
