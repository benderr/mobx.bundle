import { observer } from 'mobx-react';
import { PhoneInput, AmountInput, NumberInput  } from 'modul-components';
import {inputFieldHoc, radValidateHoc} from '../validationHelpers';
import InputField from './InputField';
// import SelectField from './SelectField';
// import TextAreaField from './TextAreaField';
// import SwitchField from './SwitchField';
// import DatePickerField from './DatePickerField';
// import normalizeKpp from './normalizeKpp';
// import normalizeInn from './normalizeInn';

const PhoneField = observer(radValidateHoc()(inputFieldHoc()(PhoneInput)));
const AmountField = observer(radValidateHoc()(inputFieldHoc()(AmountInput)));
const NumberField = observer(radValidateHoc()(inputFieldHoc()(NumberInput)));
export {
    PhoneField,
    AmountField,
    NumberField,
    InputField,
    // SwitchField,
    // Field,
    // FieldArray,
    // TextAreaField,
    // DatePickerField,

    // normalizeKpp,
    // normalizeInn,
};
