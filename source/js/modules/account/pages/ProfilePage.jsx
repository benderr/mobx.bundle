import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('profileStore')
@observer
class ProfileContainer extends React.Component {

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default ProfileContainer;
