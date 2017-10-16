import SignInContainer from './pages/SignInContainer';
import ProfileContainer from './pages/ProfileContainer';
import AddUserPage from './pages/AddUserPage';
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
    layout: null,
  },
  settings: {
    path: '/settings',
    exact: true,
    component: ProfileContainer,
    isLayer: true
  },
  addUser: {
    path: '/add-user',
    exact: true,
    isLayer: true,
    layout: AddUserPage
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
