import {createBrowserHistory} from 'history';
import pathToRegexp from 'path-to-regexp'

class HistoryStore {
  history;

  constructor() {
    this.history = createBrowserHistory();
  }

  fullReload(path) {
    window.location.href = path;
  }

  getRoute(routes, location) {
    return routes.filter(s => {
      const re = pathToRegexp(s.path, []);
      return re.exec(location.pathname) != null;
    })[0];
  }

  isAnonymousLocation(location, routes) {
    const route = this.getRoute(routes, location);
    return route && route.allowAnonymous;
  }
}

export default new HistoryStore();
