import React from 'react';
import {observable, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import CreateClient from './CreateClient';
import UpdateClient from './UpdateClient';

@inject(({clientsStore}) => ({
  inProgress: clientsStore.inProgress,
  error: clientsStore.error,
  clients: clientsStore.clients,
  create: clientsStore.create,
  getClient: clientsStore.getClient,
  update: clientsStore.update,
}))
@observer
class ClientsContainer extends React.Component {

  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    error: PropTypes.object,
    clients: PropTypes.object.isRequired,
    create: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  };

  openCreateForm() {
    this.createList.wrappedInstance.create();
  }
// {/**/}
  getClientList() {
    const clients = [];
    this.props.clients.forEach((client, key) => {
      clients.push(
        <li key={key}
            onClick={() => this.updateClient.wrappedInstance.update(key)}>
          {client.name}
        </li>);
    });
    return clients;
  }

  render() {
    return (
      <div>
        {this.props.clients.size > 0 ? this.getClientList() : null}
        <button class='button second'
          onClick={::this.openCreateForm}>
          Новый клиент
        </button>
        <CreateClient ref={p => this.createList = p} />
        <UpdateClient ref={p => this.updateClient = p} />
      </div>
    );
  }
}

export default ClientsContainer;
