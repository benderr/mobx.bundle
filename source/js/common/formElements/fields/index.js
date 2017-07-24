import PhoneField from './PhoneField'
import AmountField from './AmountField'
import NumberField from './NumberField'
import SelectField from './SelectField'
import InputField from './InputField'
import SwitchField from './SwitchField'
import normalizeKpp from './normalizeKpp'
import normalizeInn from './normalizeInn'
import {Field} from 'redux-form/immutable' //чтобы не импортить каждый раз филды из разныз мест

export {
	PhoneField,
	AmountField,
	NumberField,
	SelectField,
	InputField,
	SwitchField,
	Field,

	normalizeKpp,
	normalizeInn
};