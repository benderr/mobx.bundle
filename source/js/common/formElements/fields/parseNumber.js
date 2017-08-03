export default (value) => {
	if (!value)
		return value;
	if (!(+value))
		return '';
	if (value.replace)
		value = value.replace(/[^0-9\.,]+/g, '').replace(',', '.');
	return parseFloat(value);
};