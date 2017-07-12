import {generateNumber} from 'infrastructure/utils/uuidGenerator';

export const getList = {
	toServer: (props) => {
		let params = {};

		if (props.q) params.q = `name=="*${props.q}*"`;
		if (props.column) params.sortField = props.column;
		if (props.orderBy) params.sortDirection = props.orderBy;
		if (props.pos) params.start = props.pos;

		return params;
	},
	toClient: (response) => ({
		data: (response.data || []).map(res => {
			return {
				code: res.code,
				locked: res.locked ? "on" : "off",
				login: res.login,
				name: res.name,
				password: res.password,
				roles: res.roles || []
			}
		}),
		pos: response.pos,
		total_count: response.total_count
	})
};

export const createContragent = (props) => ({
	catalogType: 'CONTRACTOR',
	code: generateNumber().toString(),
	name: props.name,
	locked: props.locked === 'off' ? 0 : 1,
	password: props.password,
	roles: props.roles || [],
});

export const updateContragent = (props) => ({
	catalogType: 'CONTRACTOR',
	code: props.code,
	name: props.name,
	locked: props.locked === 'off' ? 0 : 1,
	password: props.password,
	roles: props.roles || [],
});