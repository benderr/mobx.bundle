export const toClientLogin = (data) => {
	return {
		company: {name: data.userCompanyName},
		user: {name: data.userName}
	};
};