import React from 'react';
import SignInContainer from './containers/SignInContainer';
import ProfileContainer from './containers/ProfileContainer';
import ProfileContainer2 from './containers/ProfileContainer2';
import RegistrationContainer from './containers/RegistrationContainer';
import IndexContainer from './containers/IndexContainer'

export default {
  signin: {
    path: '/signin',
    exact: true,
    allowAnonymous: true,
    component: SignInContainer
  },
  profile: {
    path: '/profile',
    exact: true,
    allowAnonymous: true,
    component: ProfileContainer,
    layout: null,
  },
  settings: {
    path: '/settings',
    exact: true,
    component: ProfileContainer,
    isLayer: true
  },
  profile2: {
    path: '/profile2',
    exact: true,
    allowAnonymous: true,
    component: ProfileContainer2,
    layout: null,
  },
  home: {
    path: '/',
    exact: true,
    allowAnonymous: true,
    component: IndexContainer,
  },
  registration: {
    path: '/registration',
    exact: true,
    allowAnonymous: true,
    layout: null,
    component: RegistrationContainer,
  },
};