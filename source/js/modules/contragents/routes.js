import React from 'react';

export function getRoutes() {
	return {
		contragents: {
			path: '/contragents',
			exact: true,
			component: ({location}) => (<h2> Contragents list</h2>)
		}
	}
}