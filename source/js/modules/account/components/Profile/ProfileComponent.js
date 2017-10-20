import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {LoaderPanel} from 'modul-components';
import createBrowserHistory from 'history/createBrowserHistory';

@inject(({profileStore}) => ({
  getProfile: profileStore.getProfile,
  inProgress: profileStore.inProgress,
  profile: profileStore.profile,
}))
@withRouter
@observer
class SignInContainer extends React.Component {

  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    getProfile: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const {profile, inProgress} = this.props;
    return (
      <LoaderPanel loading={ inProgress }>
        <ul>
          <li>email: {profile.email}</li>
          <li>firstName: {profile.firstName}</li>
          <li>gender: {profile.gender}</li>
          <li>lastName: {profile.lastName}</li>
          <li>middleName: {profile.middleName}</li>
        </ul>
      </LoaderPanel>
    );
  }
}

export default SignInContainer;
