export const listDiscount = {
	toServer: (params) => {
		let options = {};

		if (params.q) options.q = params.q;
		if (params.coll) options.sortField = params.coll;
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

export const addDiscount = (props) => ({
	catalogType: 'SIMPLE_DISCOUNT',
	code: '',	// тут должен быть генератор случайного числа
	name: props.name,
	type: props.type || 'BUTTON',
	value: parseInt(props.value),
	valueType: props.valueType || 'PERCENT'
});