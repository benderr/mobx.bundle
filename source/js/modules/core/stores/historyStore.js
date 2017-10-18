import {createBrowserHistory} from 'history';

class HistoryStore {
  history;

  constructor() {
    this.history = createBrowserHistory();
  }
  
  fullReload(path) {
    window.location.href = path;
  }
}

export default new HistoryStore();
