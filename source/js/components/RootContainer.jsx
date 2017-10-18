import React from 'react';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx';
import { Router } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import AppContainer from './AppContainer';

useStrict(true);

class RootContainer extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    stores: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { stores, routes, history } = this.props;
    return (
      <Provider { ...stores } >
        <div className='poss'>
          <Router history={ history }>
            <AppContainer routes={ routes } />
          </Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default RootContainer;
