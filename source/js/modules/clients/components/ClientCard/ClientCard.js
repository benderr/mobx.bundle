import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {ContentPopup} from 'modul-components/lib/dialogs';

import ClientCardController from './ClientCardController';
import ClientCardView from './ClientCardView';
import qs from 'qs';

// @inject(({authStore}) => ({
//   inProgress: authStore.inProgress,
//   error: authStore.error,
//   login: authStore.login,
//   errorReset: authStore.errorReset,
// }))
// @withRouter
@observer
class SignInContainer extends React.Component {

  static propTypes = {
    // inProgress: PropTypes.bool.isRequired,
    // error: PropTypes.object,
    // login: PropTypes.func.isRequired,
    // errorReset: PropTypes.func.isRequired,
  };


  constructor(props) {
    super(props);
  }

  handleOpenContentPopup() {
    this.content.open();
  }

  render() {
    return (
      <div>
        <button
          class='button second'
          onClick={ ::this.handleOpenContentPopup }>Content dialog
        </button>
        <ContentPopup ref={ p => this.content = p } closeName={ 'Закрыть' }>
          <ClientCardView/>
        </ContentPopup>

      </div>
    );
  }
}

export default SignInContainer;
