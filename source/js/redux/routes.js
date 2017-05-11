import React from 'react';

/**
 * Разбор флагов роута
 * - index - главная страница
 * - path - v4-docs
 * - exact - v4-docs
 * - strict - v4-docs
 * - component - v4-docs
 * - isLayer - флаг если страница является слоем
 * - layout - мастер-страница, если не указана то берется дефолтная
 * 				(у обычной страницы - своя, у слоя - своя),
 * 				если layout: null, то рендерится без мастера
 */

export default function getRoutes(modules, store) {
	return modules.filter((m) => isFunc(m.getRoutes))
		.reduce((routes, module) => {
			const routesObject = module.getRoutes();
			const routesArray = Object.keys(routesObject).reduce((prev, key) => {
				const route = routesObject[key];
				return [...prev, {...route, name: key}]
			}, []);
			return [...routes, ...routesArray];
		}, []);
}

function isFunc(f) {
	return typeof f === 'function';
}