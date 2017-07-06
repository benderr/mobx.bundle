import {generateNumber} from 'infrastructure/utils/uuidGenerator';

export const getListContragent = {
	toServer: (props) => {
		let params = {};

		if (props.q) params.q = props.q;
		if (props.column) params.sortField = props.column;
		if (props.orderBy) params.sortDirection = props.orderBy;
		if (props.start) params.start = props.start;

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

export const createContragent = {
	toServer: (contragent) => {
		return {
			catalogType: 'CONTRACTOR',
			code: contragent.code !== 'new' ? contragent.code : generateNumber().toString(),
			locked: contragent.locked === 'off' ? 0 : 1,
			login: '',
			name: contragent.name,
			password: contragent.password,
			roles: contragent.roles || []
		}
	}
}