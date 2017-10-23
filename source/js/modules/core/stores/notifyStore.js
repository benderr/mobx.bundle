import {observable, action} from 'mobx';
import {notifyFactory} from 'modul-components/lib/notify';

/**
 * Стор для управления нотификациями
 */
class NotifyStore {

  @observable notifications = [];

  @action
  success(message, title = '') {
    const item = notifyFactory.success(message, title);
    this.notifications.push(item);
  }

  @action
  error(message, title = '') {
    const item = notifyFactory.error(message, title);
    this.notifications.push(item);
  }

  @action
  warning(message, title = '') {
    const item = notifyFactory.warning(message, title);
    this.notifications.push(item);
  }

  @action
  info(message, title = '') {
    const item = notifyFactory.info(message, title);
    this.notifications.push(item);
  }

  @action
  create(opts = {level: 'success'}) {
    const item = notifyFactory.create(opts, opts.level);
    this.notifications.push(item);
  }

  @action
  remove(uid) {
    this.notifications = this.notifications.filter(s => s.uid != uid);
  }
}

export default new NotifyStore();
