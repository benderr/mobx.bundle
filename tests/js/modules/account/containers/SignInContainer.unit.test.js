import { shallow } from 'enzyme';
import React from 'react';

import SignInContainer from '../../../../../source/js/modules/account/containers/SignInContainer';
import authStore from '../../../../../source/js/modules/account/stores/authStore';

describe('SignInContainer', () => {
  beforeEach(function () {
    this.authStore = authStore;
  });

  it('renders filtered todos', function () {
    const wrapper = shallow(<SignInContainer authStore={ this.authStore } />);
  });
});
