import {isEmail, isRequired} from 'common/form/validationHelpers/validation'
import {observable, action, runInAction} from 'mobx';
import BaseForm from 'common/form/BaseForm';
import notifyStore from 'modules/core/stores/notifyStore'

const fields = [
  {
    name: 'email',
    validators: [isEmail('Введите корректный Email'), isRequired('Введите email')],
  },
  {
    name: 'name',
    validators: [isRequired('Введите имя')]
  },
  {
    name: 'surname',
    validators: [isRequired('Введите фамилию')]
  },
  {
    name: 'group',
    validators: [isRequired('Выберите группу')],
    initial: null,
    value: null
  }
];

class InviteEmployeeController extends BaseForm {
  @observable form;
  @observable tags = [];
  @observable searchLoading = false;

  constructor({store}) {
    ;
    super({fields}, {
      hooks: {
        onSuccess(form) {
          //store.saveTask(form.values());
          this.saveTask(form.values());
          console.log('ВСЁ НОРМ', form.values());
          notifyStore.success('Все норм ' + JSON.stringify(form.values()));
          //alert(form.values())
        },
        onError(form) {
          notifyStore.error('Ошибка');
          console.log('ЧТО-ТО НЕ ТАК');
        },
      },
    });
  }

  @action saveTask(form) {

  }

  @action handleChangePhone() {
    this.form.fields.get('phone').set('0987654321')
  }

  @action handleSearchOptions(text) {
    //this.form.fields.get('phone').set('0987654321');
    this.searchLoading = true;
    // setTimeout(() => {
    //   runInAction(() => {
    //     this.tags = options.filter(s => s.label.indexOf(text) > -1);
    //     this.searchLoading = false;
    //   });
    // }, 1000);
  }

  @action loadData() {
    setTimeout(() => {
      this.update({
        group: null
      });
    }, 2000);
    //
    // setTimeout(() => {
    //   runInAction(() => {
    //     this.tags = options;
    //   });
    // }, 0);
  }
}

export default InviteEmployeeController;