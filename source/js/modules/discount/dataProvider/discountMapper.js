import {generateNumber} from 'infrastructure/utils/uuidGenerator';

export const listDiscount = {
	toServer: (params) => {
		let options = {};

		if (params.q) options.q = params.q;
		if (params.column) options.sortField = params.column;
		if (params.orderBy) options.sortDirection = params.orderBy;

		return options;
	},
	toClient: (response) => ({
		data: response.data.map(item => ({
			type: item.type,	// тип откуда была добавлена скидка (потом будут варианты)
			code: item.code,
			name: item.name,
			value: item.value
		})),
		pos: response.pos,
		total_count: response.total_count
	})
};

export const createDiscount = (props) => ({
	catalogType: 'SIMPLE_DISCOUNT',
	code: generateNumber().toString(),
	name: props.name,
	type: props.type || 'BUTTON',
	value: props.value,
	valueType: props.valueType || 'PERCENT'
});

export const updateDiscount = (props) => ({
	catalogType: 'SIMPLE_DISCOUNT',
	code: props.code,
	name: props.name,
	type: props.type || 'BUTTON',
	value: props.value,
	valueType: props.valueType || 'PERCENT'
});