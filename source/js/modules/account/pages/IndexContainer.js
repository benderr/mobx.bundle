import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('authStore')
@observer
class IndexContainer extends React.Component {

  render() {
    return (
      <div>
        Tasks
      </div>
    );
  }
}

export default IndexContainer;
