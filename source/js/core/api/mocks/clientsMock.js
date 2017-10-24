export default (mock) => {
  return mock
  .onPost('/api/clients').reply(config => {
    return [200, Math.random().toString(36).substring(7)];
  })
  .onGet('/api/clients').reply(client => {
    return [200, client];
  })
  .onPut('/api/clients').reply(config => {
    return [200];
  });
};
