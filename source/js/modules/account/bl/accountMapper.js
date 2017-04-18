export const toClientLogin = (data) => {
	return {
		token: data.Token,
		userId: data.UserId
	};
};

export const toClientLoginInfo = (data) => {
	return {
		firstName: data.FirstName,
		lastName: data.LastName
	}
}