export default (config, axios) => {
  const MockAdapter = require('axios-mock-adapter');
  const mock = new MockAdapter(axios);
  if (config.account) {
    const accountMock = require('./accountMock').default;
    accountMock(mock);
  }
  return mock;
};
