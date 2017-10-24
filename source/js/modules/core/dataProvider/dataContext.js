import api from 'core/api';

export const checkToken = () => {
  return api.account().get()
};
