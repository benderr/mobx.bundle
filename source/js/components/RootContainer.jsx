import React from 'react';
import PropTypes from 'prop-types';
import {useStrict} from 'mobx';
import {Router} from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import {Provider} from 'mobx-react';
import AppContainer from './AppContainer';
import {observer, inject} from 'mobx-react';
useStrict(true);

class RootContainer extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    stores: PropTypes.object.isRequired,
  };

  render() {
    const {stores, routes} = this.props;
    return (
      <Provider { ...stores } >
        <div className="poss">
          <AppRouter routes={routes}/>
          <DevTools />
        </div>
      </Provider>
    );
  }
}



@inject("historyStore")
@observer
class AppRouter extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  render() {
    const {routes, historyStore} = this.props;
    return (
      <Router history={ historyStore.history }>
        <AppContainer routes={ routes }/>
      </Router>
    );
  }
}


export default RootContainer;
