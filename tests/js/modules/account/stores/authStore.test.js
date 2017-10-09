import authStore from '../../../../../source/js/modules/account/stores/authStore';

describe('authStore', () => {
  it('setEmail, setPassword actions valid', () => {
    authStore.setEmail('exapmle@mail.ru');
    authStore.setPassword('123321');
    expect(authStore.user.email).toBe('exapmle@mail.ru');
    expect(authStore.user.password).toBe('123321');
  });

  it('async login actions', done => {
    authStore.login().then(() => {
      expect(authStore.token).not.toBeUndefined();
      done();
    });
  });

  it('async logout actions', done => {
    authStore.login().then(() => {
      expect(authStore.token).not.toBeUndefined();
      done();
    });
  });
});
