import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import AppContainer from './AppContainer';
import { BrowserRouter } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

useStrict(true);

class RootContainer extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    stores: PropTypes.object.isRequired,
  };

  render() {
    const { stores, routes } = this.props;
    return (
      <div>
        <Provider { ...stores } >
          <div className='poss'>
            <BrowserRouter>
              <AppContainer routes={ routes } />
            </BrowserRouter>
            {this.renderServices()}
            <DevTools />
          </div>
        </Provider>
      </div>
    );
  }

  renderServices() {
    return (<ReactTooltip id='globalTooltip' />);
  }
}

export default RootContainer;
