import React from 'react';

// Components
import SignInContainer from './containers/SignInContainer';
import ProfileContainer from './containers/ProfileContainer';
import ProfileContainer2 from './containers/ProfileContainer2';
import RegistrationContainer from './containers/RegistrationContainer';

// Stores
import authStore from './stores/authStore';

export const stores = {
  authStore,
};

export const routes = {
  signin: {
    path: '/signin',
    exact: true,
    allowAnonymous: true,
    component: SignInContainer,
    layout: null,
  },
  profile: {
    path: '/profile',
    exact: true,
    allowAnonymous: true,
    component: ProfileContainer,
    layout: null,
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
    component: () => (<div>Home page</div>),
  },
  registration: {
    path: '/registration',
    exact: true,
    allowAnonymous: true,
    layout: null,
    component: RegistrationContainer,
  },
};

