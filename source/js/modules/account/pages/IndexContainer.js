import React from 'react';
import {observer, inject} from 'mobx-react';
import AddUser from 'modules/account/components/AddUser/AddUser';

@inject('authStore')
@observer
class IndexContainer extends React.Component {

  render() {
    return (
      <div>
        <AddUser/>
      </div>
    );
  }
}

export default IndexContainer;
