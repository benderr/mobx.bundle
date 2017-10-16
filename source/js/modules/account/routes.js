import SignInContainer from './pages/SignInPage';
import ProfileContainer from './pages/ProfilePage';
import RegistrationContainer from './pages/RegistrationContainer';
import IndexContainer from './pages/IndexContainer';
import DemoFieldsContainer from './pages/DemoFieldsContainer';

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
