import {isEmail, isRequired} from 'common/form/validationHelpers/validation'
import {observable, action, runInAction} from 'mobx';
import BaseForm from 'common/form/BaseForm';

const fields = [
  {
    name: 'email',
    label: 'InputField',
    placeholder: 'InputField',
    validators: [isEmail('Введите корректный Email'), isRequired('Введите email')],
  },
  {
    name: 'phone',
    label: 'PhoneField',
    placeholder: 'PhoneField',
    validators: [isRequired('Введите телефон')]
  },
  {
    name: 'select',
    label: 'SelectField',
    placeholder: 'SelectField',
    validators: [isRequired('Выберите вариант')],
    options: [],
    bindings: 'SelectField'
  },
  {
    name: 'NumberField',
    label: 'NumberField',
    placeholder: 'NumberField',
    validators: [isRequired('Введите число')],
  },
  {
    name: 'AmountField',
    label: 'AmountField',
    placeholder: 'AmountField',
    validators: [isRequired('Введите сумму')],
  },
  {
    name: 'date',
    label: 'DatePickerField',
    placeholder: 'DatePickerField',
    validators: [isRequired('Выбериту дату')]
  },
];

const options = [{value: '0', label: 'по умолчанию (из настроек)', short: 'из настроек'},
  {value: 1104, label: 'НДС 0%', short: '0%'},
  {value: 1103, label: 'НДС 10%', short: '10%'},
  {value: 1102, label: 'НДС 18%', short: '18%'},
  {value: 1105, label: 'НДС не облагается', short: 'не облагается'},
  {value: 1107, label: 'НДС с рассч. ставкой 10%', short: 'с рассч. ставкой 10%'},
  {value: 1106, label: 'НДС с рассч. ставкой 18%', short: 'с рассч. ставкой 18%'}];

class AddUserController {
  @observable form;
  @observable tags = [];
  @observable searchLoading = false;

  constructor({store}) {
    const self=this;
    this.form = new BaseForm({fields}, {
      hooks: {
        onSuccess(form) {
          //store.saveTask(form.values());
          self.saveTask(form.values());
          console.log('ВСЁ НОРМ', form.values());
          //alert(form.values())
        },
        onError(form) {
          console.log('ЧТО-ТО НЕ ТАК');
        },
      },
    });
  }

  @action saveTask(form){

  }

  @action handleChangePhone() {
    this.form.fields.get('phone').set('0987654321')
  }

  @action handleSearchOptions(text) {
    //this.form.fields.get('phone').set('0987654321');
    this.searchLoading = true;
    setTimeout(() => {
      runInAction(() => {
        this.tags = options.filter(s => s.label.indexOf(text) > -1);
        this.searchLoading = false;
      });
    }, 1000);
  }

  @action loadData() {
    setTimeout(() => {
      this.form.update({
        phone: '1234567890',
        email: 'fff@mail.com',
        date: new Date()
      });
    }, 2000);

    setTimeout(() => {
      runInAction(() => {
        this.tags = options;
      });
    }, 0);
  }
}

export default AddUserController;