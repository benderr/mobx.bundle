import React from 'react';
import PropTypes from 'prop-types'

import {observer, inject} from 'mobx-react';
import {observable, action, runInAction} from 'mobx';
import {inAction} from 'mobx-utils';
import InviteEmployeeController from './InviteEmployeeController';
import {Button, LoaderPanel} from 'modul-components';
import {InputField, SelectField} from 'common/form/fields';


@inject("employeeStore")
@observer
class InviteEmployee extends React.Component {

  constructor(props) {
    super(props);
    this.form = new InviteEmployeeController({store: props.authStore, onClose: props.onClose});
  }

  componentDidMount() {
    this.form.loadData();
  }

  render() {
    const form = this.form;
    return (
      <form onSubmit={ form.onSubmit }>
        <div class="form_group">
          <InputField tipPlace="bottom" type="email" field={ form.$('email') } placeholder="E-mail"
                      class="column full"/>
        </div>
        <div class="form_group">
          <InputField tipPlace="bottom" type="text" field={ form.$('surname') } placeholder="Фамилия"
                      class="column half"/>
          <InputField tipPlace="bottom" type="text" field={ form.$('name') } placeholder="Имя" class="column half"/>
        </div>
        <div class="form_group">
          <SelectField field={ form.$('group') } placeholder="Выберите группу" options={[{label: '11', value: '22'}]} tipPlace="bottom"/>
        </div>

        <div class="form_buttons">
          <button class="button second middle icon-mail-sent">Отправить приглашение</button>
        </div>
      </form>);
  }

  static propTypes = {
    onClose: PropTypes.func
  }
}

export default InviteEmployee;
