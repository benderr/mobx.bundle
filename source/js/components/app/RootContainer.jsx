import React from 'react';
import PropTypes from 'prop-types';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import AppRouter from './AppRouter';

/**
 * Монтируем сторы мобкс
 */

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
          {this.renderDevTools()}
        </div>
      </Provider>
    );
  }

  renderDevTools() {
    let devTools = false;
    if (__DEV_TOOLS__) {
      const DevTools = require('mobx-react-devtools').default;
      devTools = (<DevTools />)
    }

    return devTools;
  }
}


export default RootContainer;
