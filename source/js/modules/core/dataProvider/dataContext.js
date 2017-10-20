import api from 'core/api';

export const checkToken = () => api.account().get();
