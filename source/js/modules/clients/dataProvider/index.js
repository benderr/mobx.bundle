
const testUser = {
  token: Math.random().toString(36).substring(7),
  name: 'username',
};

const existUserEmail = 'example@exmpl.ru';

export function logout() {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve({}), 1000)
  );
}

export function login(email, password) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve({ ...testUser, email, password }), 1000)
  );
}

export function register(email, password) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (email === existUserEmail) {
        reject(new Error('Такой пользователь уже зарегестрирован'));
      } else {
        resolve('Успешно');
      }
    }, 1000)
  );
}
