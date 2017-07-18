export const MEASURE_OPTIONS = [
	{label: 'Штука', value: 'pcs'},
	{label: 'Килограмм', value: 'kg'},
	{label: 'Литр', value: 'ltr'}];

export const ALCOHOL_OPTIONS = [
	{label: 'Обычный', value: 'NO_ALCOHOL'},
	{label: 'Слабоалкогольный', value: 'LIGHT_ALCOHOL'},
	{label: 'Алкоголь', value: 'ALCOHOL'}];

export const VAT_TAG_OPTIONS = [
	{value: "0", label: 'по умолчанию (из настроек)'},
	{value: 1104, label: 'НДС 0%'},
	{value: 1103, label: 'НДС 10%'},
	{value: 1102, label: 'НДС 18%'},
	{value: 1105, label: 'НДС не облагается'},
	{value: 1107, label: 'НДС с рассч. ставкой 10%'},
	{value: 1106, label: 'НДС с рассч. ставкой 18%'}
];

export const getLabelByValue = (options, value, def = '') => {
	const val = options.filter(option => option.value == value);
	return val ? val[0].label : def;
};