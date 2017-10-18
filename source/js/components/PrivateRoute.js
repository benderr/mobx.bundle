import React from 'react'
import {observer, inject} from 'mobx-react';
import {LoaderPanel} from 'modul-components'

export default (RouteComponent) => {

  @inject("profileStore", "historyStore")
  @observer
  class PrivateRoute extends React.Component {
    render() {
      const {profileStore, historyStore, ...props}=this.props;

      if (profileStore.profile != null)
        return (<RouteComponent {...props}/>);
      else {
        setTimeout(() => historyStore.fullReload('/signin'), 500);
        return (<LoaderPanel loading={true}/>)
      }

      //return (<RouteComponent {...props}/>);
    }
  }

  return PrivateRoute;
};
