import EventBus from './EventBus'
const bus = new EventBus('modulbuh.channel');
export default bus;

export const events = {
  ACCESS_DENIED: 'APP.ACCESS_DENIED',
  ACCESS_FORBIDDEN: 'APP.ACCESS_FORBIDDEN',
  APP_READY: 'APP.APP_READY',
  LOGOUT: 'APP.LOGOUT'
};