import SignInContainer from './containers/SignInContainer';
import ProfileContainer from './containers/ProfileContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import IndexContainer from './containers/IndexContainer';
import DemoFieldsContainer from './containers/DemoFieldsContainer';

export default {
  signin: {
    path: '/signin',
    exact: true,
    allowAnonymous: true,
    component: SignInContainer,
    layout: null
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
    isLayer: true,
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
  demo: {
    path: '/demo',
    exact: true,
    allowAnonymous: true,
    component: DemoFieldsContainer,
  },
};
