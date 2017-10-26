import {isEmail, isRequired} from 'common/form/validationHelpers/validation';
import {observable, action, runInAction} from 'mobx';
import BaseForm from 'common/form/BaseForm';

const fields = {
  name: {
    label: 'Полное название',
    placeholder: 'Полное название',
    validators: [isRequired('Укажите полное наименование')],
  },
  abbreviation: {
    label: 'Сокращенное название',
    placeholder: 'Сокращенное название',
    validators: [isRequired('Укажите сокращенное наименование')],
  },
  registrationDate: {
    label: 'Дата регистрации',
    placeholder: 'Дата регистрации',
    validators: [isRequired('Укажите дату регистрации компании')],
  },
  connectDate: {
    label: 'Дата подключения',
    placeholder: 'Дата подключения',
  },
  accountingStartDate: {
    label: 'Дата начала ведения учета',
    placeholder: 'Дата начала ведения учета',
  },
  opf: {
    label: 'Организационно-правовая форма',
    placeholder: 'Организационно-правовая форма',
    validators: [isRequired('Укажите организационно-правовую форму')],
  },
  connectStatus: {
    label: 'Статус подключения',
    placeholder: 'Статус подключения',
  },
  is1cBase: {
    label: 'Наличие своей базы 1С',
    placeholder: 'Наличие своей базы 1С',
  },
  is1cBaseCreated: {
    label: 'Наличие созданной базы 1С',
    placeholder: 'Наличие созданной базы 1С',
  },
  is1cConnectStatus: {
    label: 'Статус подключения к 1С Отчетности',
    placeholder: 'Статус подключения к 1С Отчетности',
  },
};

export default class ClientsController extends BaseForm {
  constructor(onSuccess, initParams) {
    if (initParams) {
      Object.keys(fields).forEach(key =>
        fields[key].value = initParams[key]
      );
    }
    const hooks = {
      onSuccess(form) {
        onSuccess(form.values());
      },
      onError(form) {
        onError(form);
        console.log('Ошибка');
        // console.log(form);
      },
    };

    super({fields}, {hooks});
  }
}
