import api from 'infrastructure/api/api';

export function logout() {
  return api.auth().killtoken().post({});
}

export function login({ password, email }) {
  return api.auth().post({
    password, email,
  });
}

export const forgotPass = ({ email }) => {
  return api.auth().killtoken().post({ email });
};

export const getAccount = () => {
  return api.account().get();
};
