import React from 'react'
import {observer, inject} from 'mobx-react';
import {LoaderPanel} from 'modul-components'

export default (RouteComponent) => {

  @inject("profileStore")
  @observer
  class PrivateRoute extends React.Component {
    render() {
      const {profileStore, ...props}=this.props;

      if (profileStore.profile != null)
        return (<RouteComponent {...props}/>);
      else {
        setTimeout(() => window.location.href = '/signin', 500);
        return (<LoaderPanel loading={true}/>)
      }

      //return (<RouteComponent {...props}/>);
    }
  }

  return PrivateRoute;
};
