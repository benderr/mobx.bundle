export const toClientContragent = (response) => {
	return {
		data: (response.data || []).map(res => {
			return {
				code: res.code,
				locked: res.locked,
				login: res.login,
				name: res.name,
				password: res.password,
				roles: res.roles || []
			}
		}),
		pos: response.pos,
		total_count: response.total_count
	};
};