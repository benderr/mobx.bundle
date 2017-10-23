import React from 'react'
import {observer, inject} from 'mobx-react';
import {NotifyService as Notif} from 'modul-components/lib/notify';
const Notifications = observer(Notif);

@inject("notifyStore")
@observer
class Notify extends React.Component {

  handleRemove(uid) {
    this.props.notifyStore.remove(uid);
  }

  render() {
    const {notifyStore}=this.props;

    return (<Notifications onRemove={::this.handleRemove}
                           notifications={notifyStore.notifications.slice()}/>)
  }
}

export default Notify;