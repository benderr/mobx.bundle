export default (config, axios) => {
  const MockAdapter = require('axios-mock-adapter');
  const mock = new MockAdapter(axios, { delayResponse: 500 });
  if (config.account) {
    const accountMock = require('./accountMock').default;
    accountMock(mock);
  }
  if (config.clients) {
    const clientsMock = require('./clientsMock').default;
    clientsMock(mock);
  }
  return mock;
};
