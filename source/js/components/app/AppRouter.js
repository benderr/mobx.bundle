import React from 'react';
import PropTypes from 'prop-types';
import {Router} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import AppComponent from './AppComponent';

/**
 * Монтируем роутер и историю браузера
 */

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
        <AppComponent routes={ routes }/>
      </Router>
    );
  }
}

export default AppRouter;