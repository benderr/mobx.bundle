
/**
 * Разбор флагов роута
 * - index.js - главная страница
 * - path - v4-docs
 * - exact - v4-docs
 * - strict - v4-docs
 * - component - v4-docs
 * - isLayer - флаг если страница является слоем
 * - layout - мастер-страница, если не указана то берется дефолтная
 *                (у обычной страницы - своя, у слоя - своя),
 *                если layout: null, то рендерится без мастера
 */

function getRoutes(modules) {
  return modules.filter((m) => m.routes).reduce((routes, module) => {
    const routesObject = module.routes;
    const routesArray = getRouteFromSection(routesObject);
    return [...routes, ...routesArray];
  }, []);
}

function getRouteFromSection(routesObject) {
  return Object.keys(routesObject).reduce((prev, key) => {
    const route = routesObject[key];
    route.name = key;
    if (route.nested) {
      route.nested = getRouteFromSection(route.nested);
    }
    return [...prev, route];
  }, []);
}

function getStores(modules, otherStores) {
  return modules.filter((m) => m.stores).reduce((stores, m) => {
    const moduleStores = m.stores;
    return {...stores, ...moduleStores};
  }, {...otherStores});
}

export default function configure(modules) {
  const routes = getRoutes(modules);
  const stores = getStores(modules, {});
  //аттеншн костыль
  return {stores, routes, history};
}
