import {isEmail, isRequired} from 'common/form/validationHelpers/validation';
import {observable, action, runInAction} from 'mobx';
import BaseForm from 'common/form/BaseForm';

const fields = [
  {
    name: 'name',
    label: 'Полное название',
    placeholder: 'Полное название',
  },
  {
    name: 'abbreviation',
    label: 'Сокращенное название',
    placeholder: 'Сокращенное название',
  },
  {
    name: 'registrationDate',
    label: 'Дата регистрации',
    placeholder: 'Дата регистрации',
  },
  {
    name: 'connectDate',
    label: 'Дата подключения',
    placeholder: 'Дата подключения',
  },
  {
    name: 'accountingStartDate',
    label: 'Дата начала ведения учета',
    placeholder: 'Дата начала ведения учета',
  },
  {
    name: 'opf',
    label: 'Организационно-правовая форма',
    placeholder: 'Организационно-правовая форма',
  },
  {
    name: 'connectStatus',
    label: 'Статус подключения',
    placeholder: 'Статус подключения',
  },
  {
    name: 'is1cBase',
    label: 'Наличие своей базы 1С',
    placeholder: 'Наличие своей базы 1С',
  },
  {
    name: 'is1cBaseCreated',
    label: 'Наличие созданной базы 1С',
    placeholder: 'Наличие созданной базы 1С',
  },
  {
    name: 'is1cConnectStatus',
    label: 'Статус подключения к 1С Отчетности',
    placeholder: 'Статус подключения к 1С Отчетности',
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
