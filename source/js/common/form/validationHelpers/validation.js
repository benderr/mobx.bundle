import {validateHelper} from 'modul-helpers';

export const isEmail = message => ({field}) => {
  const isValid = validateHelper.validEmail(field.value);
  return [isValid, message];
};

export const isRequired = message => ({field}) => {
  const isValid = !validateHelper.isEmpty(field.value);
  return [isValid, message];
};