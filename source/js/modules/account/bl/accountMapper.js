export const toClientLogin = (data) => {
	return {
		token: data.Token,
		userId: data.UserId
	};
};