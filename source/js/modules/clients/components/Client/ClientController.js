import {isCorrectCity, isCorrectInn, isRequired, isIncludeValidSymbols, isNotIncludeOnlyNumbersAndSpecials, isCyrillicAndSpaseOnly, isOnlyNumbers, isInnLength} from 'common/form/validationHelpers/validation';
import {observable, action, runInAction} from 'mobx';
import BaseForm from 'common/form/BaseForm';

const connectStatusOptions = [
  {value: '0', label: 'Подключен', short: 'Подключен'},
  {value: '1', label: 'Отключен', short: 'Отключен'},
  {value: '2', label: 'В работе', short: 'В работе'},
];

const insuranceBuyOrderOptions = [
  {value: '0', label: 'Раз в квартал', short: 'Раз в квартал'},
  {value: '1', label: 'Раз в пол года', short: 'Раз в пол года'},
  {value: '2', label: 'Раз в год', short: 'Раз в год'},
];

const fields = {
  abbreviation: {
    label: 'Сокращенное наименование',
    validators: [
      isRequired('Укажите сокращенное наименование'),
      isIncludeValidSymbols('Недопустимые символы'),
      isNotIncludeOnlyNumbersAndSpecials('Наименование получателя не может состоять только из цифр и/или спецсимволов.'),
    ],
  },
  name: {
    label: 'Полное наименование',
    validators: [
      isRequired('Укажите полное наименование'),
      isIncludeValidSymbols('Недопустимые символы'),
    ],
  },
  opf: {
    label: 'Организационно-правовая форма',
    validators: [
      isRequired('Укажите организационно-правовую форму'),
      isIncludeValidSymbols('Недопустимые символы'),
    ],
  },
  inn: {
    label: 'ИНН',
    validators: [
      isRequired('Укажите ИНН компании'),
      isIncludeValidSymbols('Недопустимые символы'),
      isInnLength('ИНН юридического лица содержит 10 цифр, индивидуального предпринимателя – 12 цифр'),
      isCorrectInn('Некорректный номер ИНН. Проверьте, что ввели правильный номер'),
    ],
  },
  // todo: custom validators
  kpp: {
    label: 'КПП',
    validators: [
    ],
  },
  // todo: custom validators
  // Todo: validators
  orgn: {
    label: 'ОГРН',
    validators: [
      isRequired('Укажите ОГРН/ ОГРНИП компании'),
      isIncludeValidSymbols('Недопустимые символы'),
    ],
  },
  registrationDate: {
    label: 'Дата регистрации',
    validators: [
      isRequired('Укажите дату регистрации компании'),
    ],
  },
  city: {
    label: 'Город',
    validators: [
      isRequired('Укажите город компании'),
      isCorrectCity('Недопустимые символы'),
      isIncludeValidSymbols('Недопустимые символы'),
    ],
  },
  directorFullName: {
    label: 'ФИО директора (индивидуального предпринимателя)',
    validators: [
      isRequired('Укажите ФИО руководителя'),
      isCyrillicAndSpaseOnly('ФИО могут содержать только буквы на кириллице, пробел или дефис'),
    ],
  },
  // todo: custom validators
  contacts: {
    label: 'Контакты',
    fields: {
      directorFullName: {
        label: 'ФИО директора (индивидуального предпринимателя)',
        value: '',
      },
      post: {
        value: '',
      },
      email: {
        value: '',
      },
      phone: {
        value: '',
      },
      description: {
        value: '',
      },
    },
  },
  // Todo: validators, component
  okved: {
    label: 'Основной ОКВЭД',
    validators: [
      isRequired('Укажите основной ОКВЭД компании'),
    ],
  },
  // Todo: validators, component
  taxSystem: {
    label: 'Система налогообложения',
    fields: {
      taxSystem: {},
      usnRate: {},
      envd: {},
      psn: {},
    },
    validators: [
      isRequired('Укажите систему налогообложения компании'),
    ],
  },
  is1cBase: {
    label: 'Наличие своей базы 1С',
    validators: [],
  },
  connectDate: {
    label: 'Дата подключения',
    validators: [],
  },
  accountingStartDate: {
    label: 'Дата начала ведения учета',
    validators: [],
  },
  connectStatus: {
    label: 'Статус подключения',
    validators: [],
    extra: connectStatusOptions,
    value: '2',
  },
  tariff: {
    label: 'Тариф',
    validators: [],
  },
  isChargedForTariff: {
    label: 'Списано за тариф',
    validators: [],
  },
  is1cBaseCreated: {
    label: 'Наличие созданной базы 1С',
    validators: [],
  },
  is1cConnectStatus: {
    label: 'Статус подключения к 1С Отчетности',
    validators: [],
  },
  // Todo: validators, component
  checkingAccount: {
    label: 'Расчетный счет',
    fields: {
      bik: {},
      checkingAccount: {},
      correspondentAccount: {},
      description: {},
    },
  },
  employees: {
    fields: {
      employeesCount: {
        label: 'Количество сотрудников',
        validators: [
          isOnlyNumbers('Недопустимые символы'),
        ],
        hooks: {
          onChange(field) {
            const payDate = field.state.form.fields.get('payDate');
            const advanceDate = field.state.form.fields.get('advanceDate');
            if (field.value) {
              runInAction(() => {
                payDate.$validators = [isRequired('Укажите дату выплаты зарплаты')];
                payDate.$extra.containerClassName = '';
                advanceDate.$validators = [isRequired('Укажите дату выплаты аванса по зарплате')];
                advanceDate.$extra.containerClassName = '';
              });
            } else {
              runInAction(() => {
                payDate.$validators = [];
                payDate.resetValidation();
                payDate.$extra.containerClassName = 'hidden';
                advanceDate.$validators = [];
                advanceDate.resetValidation();
                advanceDate.$extra.containerClassName = 'hidden';
              });
            }
          },
        },
      },
      payDate: {
        label: 'Дата выплаты заработной платы',
        extra: {
          containerClassName: 'hidden',
        },
      },
      advanceDate: {
        label: 'Дата выплаты аванса по зарплате',
        extra: {
          containerClassName: 'hidden',
        },
      },
    },
  },
  // Todo: validators, component
  cashRegistersCount: {
    label: 'Количество кассовых аппаратов (БСО)',
    fields: {
      value: {
        validators: [
          isOnlyNumbers('Недопустимые символы'),
        ],
      },
      description: {},
    },
  },
  // Todo: validators, component
  acquiring: {
    label: 'Эквайринг',
    fields: {
      value: {
        validators: [
          isOnlyNumbers('Недопустимые символы'),
        ],
      },
      description: {},
    },
  },
  internetAcquiring: {
    label: 'Интернет-эквайринг',
    fields: {
      value: {
        validators: [
          isOnlyNumbers('Недопустимые символы'),
        ],
      },
      description: {},
    },
  },
  isAgencySchemes: {
    label: 'Агентские схемы',
    fields: {
      value: {
        validators: [
          isOnlyNumbers('Недопустимые символы'),
        ],
      },
      description: {},
    },
  },
  otherAccountingSystems: {
    label: 'Другие системы Бухучета',
    hint: 'Если клиент использует другие системы бухучета, запросите ссылку, а также логин и пароль.',
  },
  insuranceBuyOrder: {
    label: 'Порядок уплаты страховых взносов',
    extra: insuranceBuyOrderOptions,
    value: '2',
    validators: [],
  },
  // Todo: validators, component
  snils: {
    label: 'СНИЛС',
    validators: [],
  },
  disconnectDate: {
    label: 'Дата отключения',
    validators: [],
    fields: {
      value: {
        validators: [
          isOnlyNumbers('Недопустимые символы'),
        ],
      },
      description: {
        label: 'Причина отключения'
      },
    },
    // hooks: {
    //   onChange(field) {
    //     const disconnectCause = field.state.form.fields.get('disconnectCause');
    //     if (field.value) {
    //       runInAction(() => {
    //         disconnectCause.$validators = [isRequired('')];
    //         disconnectCause.$extra.containerClassName = '';
    //       });
    //     } else {
    //       runInAction(() => {
    //         disconnectCause.$validators = [];
    //         disconnectCause.resetValidation();
    //         disconnectCause.$extra.containerClassName = 'hidden';
    //       });
    //     }
    //   },
    // },
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
      },
    };

    super({fields}, {hooks});
  }
}
