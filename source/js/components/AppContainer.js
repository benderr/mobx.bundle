import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import NotFoundLayout from 'components/NotFoundLayout';
import InternalLayout from 'components/InternalLayout';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import RadRouter from 'components/RadRouter/RadRouter';

@withRouter
class AppContainer extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  };

  render() {
    const { routes } = this.props;

    return (
      <div class="poss">
        <RadRouter
          defaultLayerLayout={ DefaultLayerLayout }
          defaultLayout={ InternalLayout }
          routes={ routes }
          notFound={ NotFoundLayout } />
      </div>
    );
  }
}

export default AppContainer;
