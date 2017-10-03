import React, {Component, PropTypes} from 'react'
import { inject, observer } from 'mobx-react';


@inject(store => {
	console.log(store);
	return store.preview;
})
export default class extends Component {

	render() {
		return (
			<h1>Hello World!</h1>
		)
	}

}