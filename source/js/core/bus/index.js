import EventBus from './EventBus'
const bus = new EventBus('modulbuh.channel');
export default bus;

export const events = {
  ACCESS_DENIED: 'APP.ACCESS_DENIED',
  APP_READY: 'APP.APP_READY',
  LOGOUT: 'APP.LOGOUT'
};