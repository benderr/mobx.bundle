export default (api) => {
  const auth = api.addResource('auth');
  api.addResource('account');
  api.addResource('clients');
  auth.addResource('killtoken');
  auth.addResource('passwordrecover');
};
