
const testUser = {
  token: Math.random().toString(36).substring(7),
  name: 'username',
};

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
