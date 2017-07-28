export const MEASURE_OPTIONS = [
	{label: 'Штука', value: 'pcs', short: 'шт'},
	{label: 'Килограмм', value: 'kg', short: 'кг'},
	{label: 'Литр', value: 'ltr', short: 'л'}];

export const ALCOHOL_OPTIONS = [
	{label: 'Обычный', value: 'NO_ALCOHOL'},
	{label: 'Слабоалкогольный', value: 'LIGHT_ALCOHOL'},
	{label: 'Алкоголь', value: 'ALCOHOL'}];

export const VAT_TAG_OPTIONS = [
	{value: "0", label: 'по умолчанию (из настроек)', short: 'из настроек'},
	{value: 1104, label: 'НДС 0%', short: '0%'},
	{value: 1103, label: 'НДС 10%', short: '10%'},
	{value: 1102, label: 'НДС 18%', short: '18%'},
	{value: 1105, label: 'НДС не облагается', short: 'не облагается'},
	{value: 1107, label: 'НДС с рассч. ставкой 10%', short: 'с рассч. ставкой 10%'},
	{value: 1106, label: 'НДС с рассч. ставкой 18%', short: 'с рассч. ставкой 18%'}
];

export const getLabelByValue = (options, value, def = {label: '', short: ''}) => {
	const val = options.filter(option => option.value == value);
	return val.length ? val[0] : def;
};