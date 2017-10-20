import api from 'core/api';
import {profileMapper} from './accountMapper';

export function logout() {
  return api.auth().killtoken().post({});
}

export function login({password, email}) {
  return api.auth().post({
    password, email,
  });
}

export const forgotPass = ({email}) => {
  return api.auth().passwordrecover().post({email});
};

export const getAccount = () => {
  return api
    .account()
    .get()
    .then((res) => profileMapper(res));
};
