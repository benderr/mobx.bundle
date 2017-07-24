import {generateNumber} from 'infrastructure/utils/uuidGenerator';

export const getListContragent = {
	toServer: (props) => {
		let params = {};

		if (props.q) params.q = `name=="*${props.q}*"`;
		if (props.qField) params.q = props.qField;
		if (props.column) params.sortField = props.column;
		if (props.orderBy) params.sortDirection = props.orderBy;
		if (props.pos) params.start = props.pos;
		if (props.isCashier) params.isCashier = props.isCashier

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

export const createUpdateToServerr = (props) => ({
	catalogType: 'CONTRACTOR',
	code: props.code || generateNumber().toString(),
	locked: props.locked == 'off' ? 0 : 1,
	name: props.name,
	password: props.password,
	roles: props.roles
});