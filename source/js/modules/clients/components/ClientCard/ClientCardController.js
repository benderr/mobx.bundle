import {isEmail, isRequired} from 'common/form/validationHelpers/validation';
import {observable, action, runInAction} from 'mobx';
import BaseForm from 'common/form/BaseForm';

const fields = [
  {
    name: 'abbreviation',
    label: 'Сокращенное наименование',
    placeholder: 'Сокращенное наименование',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'name',
    label: 'Полное наименование',
    placeholder: 'Полное наименование',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'opf',
    label: 'Организационно-правовая форма',
    placeholder: 'Организационно-правовая форма',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'inn',
    label: 'ИНН',
    placeholder: 'ИНН',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'orgn',
    label: 'ОГРН',
    placeholder: 'ОГРН',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'registrationDate',
    label: 'Дата регистрации',
    placeholder: 'Дата регистрации',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'city',
    label: 'Город',
    placeholder: 'Город',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'directorFullName',
    label: 'ФИО директора (индивидуального предпринимателя)',
    placeholder: 'ФИО директора (индивидуального предпринимателя)',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'okved',
    label: 'Основной ОКВЭД',
    placeholder: 'Основной ОКВЭД',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'taxSystem',
    label: 'Система налогообложения',
    placeholder: 'Система налогообложения',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'is1cBase',
    label: 'Наличие своей базы 1С',
    placeholder: 'Наличие своей базы 1С',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Дата подключения',
    placeholder: 'Дата подключения',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Дата начала ведения учета',
    placeholder: 'Дата начала ведения учета',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Статус подключения',
    placeholder: 'Статус подключения',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Тариф',
    placeholder: 'Тариф',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Списано за тариф',
    placeholder: 'Списано за тариф',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Наличие созданной базы 1С',
    placeholder: 'Наличие созданной базы 1С',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Статус подключения к 1С Отчетности',
    placeholder: 'Статус подключения к 1С Отчетности',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Расчетный счет',
    placeholder: 'Расчетный счет',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Количество сотрудников',
    placeholder: 'Количество сотрудников',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Дата выплаты заработной платы',
    placeholder: 'Дата выплаты заработной платы',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Дата выплаты аванса по зарплате',
    placeholder: 'Дата выплаты аванса по зарплате',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Количество кассовых аппаратов (БСО)',
    placeholder: 'Количество кассовых аппаратов (БСО)',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Эквайринг',
    placeholder: 'Эквайринг',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Интернет-эквайринг',
    placeholder: 'Интернет-эквайринг',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Агентские схемы',
    placeholder: 'Агентские схемы',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Другие системы Бухучета',
    placeholder: 'Другие системы Бухучета',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Порядок уплаты страховых взносов',
    placeholder: 'Порядок уплаты страховых взносов',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'СНИЛС',
    placeholder: 'СНИЛС',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Дата отключения',
    placeholder: 'Дата отключения',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: '',
    label: 'Причина отключения',
    placeholder: 'Причина отключения',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },


];

export default class ClientCardController extends BaseForm {
  constructor() {
    const hooks = {
      onSuccess(form) {
        console.log(form);
      },
      onError(form) {
        console.log('Ошибка');
        console.log(form);
        // errorReset();
      },
    };
    super({fields}, {hooks});
  }
}
