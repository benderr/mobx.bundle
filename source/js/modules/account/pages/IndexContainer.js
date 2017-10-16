import React from 'react';
import { observer, inject } from 'mobx-react';
import { PhoneInput } from 'modul-components';

@inject('authStore')
@observer
class IndexContainer extends React.Component {

  render() {
    return (
      <div>
        <PhoneInput />
      </div>
    );
  }
}

export default IndexContainer;
