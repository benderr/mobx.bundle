import {isEmail, isRequired} from 'common/form/validationHelpers/validation';
import {observable, action, runInAction} from 'mobx';
import BaseForm from 'common/form/BaseForm';

const fields = [
  {
    name: 'name',
    label: 'Полное название',
    placeholder: 'Полное название',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'abbreviation',
    label: 'Сокращенное название',
    placeholder: 'Сокращенное название',
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
    name: 'connectDate',
    label: 'Дата подключения',
    placeholder: 'Дата подключения',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'accountingStartDate',
    label: 'Дата начала ведения учета',
    placeholder: 'Дата начала ведения учета',
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
    name: 'connectStatus',
    label: 'Статус подключения',
    placeholder: 'Статус подключения',
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
    name: 'is1cBaseCreated',
    label: 'Наличие созданной базы 1С',
    placeholder: 'Наличие созданной базы 1С',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
  },
  {
    name: 'is1cConnectStatus',
    label: 'Статус подключения к 1С Отчетности',
    placeholder: 'Статус подключения к 1С Отчетности',
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
