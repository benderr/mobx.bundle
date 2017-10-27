import React from 'react';
import {observable, action, runInAction} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {ContentPopup} from 'modul-components/lib/dialogs';

import ClientController from './ClientController';
import ClientView from './ClientViews/ClientView';

@inject(({clientsStore}) => ({
  inProgress: clientsStore.inProgress,
  getClient: clientsStore.getClient,
  update: clientsStore.update,
}))
@observer
class ClientsContainer extends React.Component {

  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    error: PropTypes.object,
    update: PropTypes.func.isRequired,
    getClient: PropTypes.func.isRequired,
  };

  @observable form = new ClientController();
  @observable key;

  constructor(props) {
    super(props);
  }

  updateClient(props) {
    this.props.update(this.key, props);
    this.content.close();
  }

  @action
  update(key) {
    this.key = key;
    this.props.getClient(key)
      .then((client) => runInAction(() => {
        this.form = new ClientController(::this.updateClient, client);
        this.content.open();
      })
    );
  }

  render() {
    return (
      <ContentPopup ref={p => this.content = p}>
        <ClientView form={this.form} />
      </ContentPopup>
    );
  }
}

export default ClientsContainer;
