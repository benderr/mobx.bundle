import api from 'core/api';

export function create(params) {
  return api.clients().post(params);
}

export function update(params) {
  return api.clients().put(params);
}
