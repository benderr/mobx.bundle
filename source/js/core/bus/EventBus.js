import postal from 'postal'

class EventBus {
  channel;

  constructor(channelName) {
    if (!channelName)
      throw  'Must set channel name';


    this.channel = postal.channel(channelName);
  }

  publish(event, data) {
    this.channel.publish(event, data);
  }

  subscribe(event, func) {
    if (typeof func !== 'function') {
      throw '`func` parameter must be function';
    }
    return this.channel.subscribe(event, func);
  }

  unsubscribeAll() {
    postal.unsubscribeFor();
  }

}

export default EventBus;
