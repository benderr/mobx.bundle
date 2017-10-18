import React from 'react';
import {observer, inject} from 'mobx-react';
import {observable, action, runInAction} from 'mobx';
import {inAction} from 'mobx-utils';
import AddUserView from './AddUserView';
import AddUserController from './AddUserController';


@observer
class AddUser extends React.Component {

  @observable controller;

  constructor(props) {
    super(props);
    this.controller = new AddUserController({store: props.authStore, onClose: props.onClose});
  }

  componentDidMount() {
    this.controller.loadData();
  }

  render() {

    return (
      <div>
        <AddUserView
          changePhone={::this.controller.handleChangePhone}
          searchOptions={::this.controller.handleSearchOptions}
          searchLoading={this.controller.searchLoading}
          options={this.controller.tags.slice()}
          form={ this.controller.form }
          buttonName={ 'check' }/>
      </div>
    );
  }
}

export default AddUser;
