import React from 'react';

// Components
import SignInContainer from './containers/SignInContainer';
import Profile from './containers/ProfileContainer';

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
  forgot: {
    path: '/profile',
    exact: true,
    allowAnonymous: true,
    component: Profile,
    layout: null,
  },
  home: {
    path: '/',
    exact: true,
    allowAnonymous: true,
    component: () => (<div>Home page</div>),
  },
  documents: {
    path: '/documents',
    exact: true,
    allowAnonymous: true,
    component: () => (<div>Documents page</div>),
  },
};

