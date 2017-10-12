export default (api) => {
  const auth = api.addResource('auth');
  api.addResource('account');
  auth.addResource('killtoken');
  auth.addResource('passwordrecover');
};
