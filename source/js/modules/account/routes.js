import SignInPage from './pages/SignInPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import IndexContainer from './pages/IndexContainer';
import AddUserPage from './pages/AddUserPage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';

export default {
  signin: {
    path: '/signin',
    exact: true,
    allowAnonymous: true,
    component: SignInPage,
    layout: null,
  },
  forgot: {
    path: '/forgot',
    exact: true,
    allowAnonymous: true,
    component: PasswordRecoveryPage,
    layout: null,
  },
  profile: {
    path: '/profile',
    exact: true,
    component: ProfilePage,
  },
  settings: {
    path: '/settings',
    exact: true,
    component: ProfilePage,
    isLayer: true,
  },
  addUser: {
    path: '/add-user',
    exact: true,
    isLayer: true,
    layout: AddUserPage,
  },
  home: {
    path: '/',
    exact: true,
    component: IndexContainer,
  },
  registration: {
    path: '/registration',
    exact: true,
    allowAnonymous: true,
    layout: null,
    component: RegistrationPage,
  },
};
