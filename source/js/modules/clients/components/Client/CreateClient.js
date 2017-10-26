import React from 'react';
import {observable, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {ContentPopup} from 'modul-components/lib/dialogs';

import ClientController from './ClientController';
import ClientView from './ClientView';

@inject(({clientsStore}) => ({
  inProgress: clientsStore.inProgress,
  create: clientsStore.create,
}))
@observer
class CreateClient extends React.Component {

  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    create: PropTypes.func.isRequired,
  };

  @observable form = new ClientController(::this.createClient);

  createClient(props) {
    this.props.create(props);
    this.content.close();
  }

  @action
  create() {
    this.form = new ClientController(::this.createClient);
    this.content.open();
  }

  render() {
    return (
      <ClientView form={this.form} />
    );
  }
}

//   <ContentPopup ref={p => this.content = p}>
//     <ClientView form={this.form} />
//   </ContentPopup>

export default CreateClient;
