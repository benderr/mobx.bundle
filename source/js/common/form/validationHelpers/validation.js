import {validateHelper} from 'modul-helpers';

const isEmail = message => ({field}) => {
  const isValid = validateHelper.validEmail(field.value);
  return [isValid, message];
};

const isRequired = message => ({field}) => {
  const isValid = !validateHelper.isEmpty(field.value);
  return [isValid, message];
};

const isCorrectInn = message => ({field}) => {
  const isValid = validateHelper.isCorrectInn(field.value);
  return [isValid, message];
};

const isIncludeValidSymbols = message => ({field}) => {
  const isValid = /^[0-9a-zA-Zа-яА-ЯёЁ!"#$%&'( )*+,-./:;<=>?@[\]\\^_`{|}~№]+$/.test(field.value);
  return [isValid, message];
};

const isCyrillicAndSpaseOnly = message => ({field}) => {
  const isValid = /^[а-яА-ЯёЁ -–]+$/.test(field.value);
  return [isValid, message];
};

const isCorrectCity = message => ({field}) => {
  const isValid = /^[а-яА-ЯёЁ -–.:;]+$/.test(field.value);
  return [isValid, message];
};

const isOnlyNumbers = message => ({field}) => {
  const isValid = /^[0-9]+$/.test(field.value);
  return [isValid, message];
};

const isNotIncludeOnlyNumbersAndSpecials = message => ({field}) => {
  const isValid = !/^[0-9!"#$%&'( )*+,-./:;<=>?@[\]\\^_`{|}~№]+$/.test(field.value);
  return [isValid, message];
};


const isInnLength = message => ({field}) => {
  const isValid = field.value.length === 10 || field.value.length === 12;
  return [isValid, message];
};

export {
  isEmail,
  isRequired,
  isInnLength,
  isIncludeValidSymbols,
  isNotIncludeOnlyNumbersAndSpecials,
  isCyrillicAndSpaseOnly,
  isOnlyNumbers,
  isCorrectInn,
  isCorrectCity
};
