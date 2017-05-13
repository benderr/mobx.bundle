export const toClientLogin = (data) => {
	return {
		companyName: data.userCompanyName,
		user: {name: data.userName}
	};
};

export const toClientLoginInfo = (data) => {
	return {
		firstName: data.FirstName,
		lastName: data.LastName
	}
}