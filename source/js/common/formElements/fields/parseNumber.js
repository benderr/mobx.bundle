export default (value) => {
	if (!value)
		return value;
	//if (!(+value))
	//	return '';
	if (value.replace)
		value = value.replace(/[^0-9\.,]+/g, '').replace(',', '.');
	const num = parseFloat(value);
	return isNaN(num) ? null : num;
};