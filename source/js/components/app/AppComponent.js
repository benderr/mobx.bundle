import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import NotFoundLayout from 'components/NotFoundLayout';
import InternalLayout from 'components/InternalLayout';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import ModulRouter from 'modul-ui-router';
import PrivateRoute from 'components/PrivateRoute'
import {observer, inject} from 'mobx-react';
import {LoaderPanel} from 'modul-components'

/**
 * Стартуем приложение
 */

const routeWrappers = [(route, props) => {
  if (!props.allowAnonymous)
    route = PrivateRoute(route);
  return route;
}];

@inject("appStore")
@withRouter
@observer
class AppContainer extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  };

  componentWillMount() {
    const {routes}=this.props;
    this.props.appStore.startApplication({routes});
  }

  render() {
    const {routes, appStore} = this.props;

    return (
      <LoaderPanel loading={!appStore.appReady}>
        {appStore.appReady &&
        <ModulRouter defaultLayerLayout={DefaultLayerLayout}
                     defaultLayout={InternalLayout}
                     routes={routes}
                     routeWrappers={routeWrappers}
                     notFound={NotFoundLayout}/>}
      </LoaderPanel>
    );
  }
}

export default AppContainer;
