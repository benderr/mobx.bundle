import React from 'react';
import {observer, inject} from 'mobx-react';
import {LoaderPanel} from 'modul-components';

export default (RouteComponent) => {
  @inject('profileStore', 'historyStore')
  @observer
  class PrivateRoute extends React.Component {
    render() {
      const {profileStore, historyStore, ...props} = this.props;

      if (profileStore.profileReady && profileStore.profile != null) {
        return (<RouteComponent { ...props } />);
      } else if (!profileStore.profileReady) {
        return (<LoaderPanel loading={ true } />);
      }
      setTimeout(() => historyStore.fullReload('/signin'), 500);
      return (<LoaderPanel loading={ true } />);
    }
  }

  return PrivateRoute;
};
