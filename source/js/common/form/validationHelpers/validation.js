import { validateHelper } from 'modul-helpers';

const isEmail = message => ({ field }) => {
  const isValid = validateHelper.validEmail(field.value);
  return [isValid, message];
};

const isRequired = message => ({ field }) => {
  const isValid = !validateHelper.isEmpty(field.value);
  return [isValid, message];
};

export {
  isEmail,
  isRequired,
};
