import React from 'react'
import {Home, Gallery, ImageView} from './GalleryComponents'
import {Modal} from './Modal'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom'

class ModalSwitch extends React.Component {

	// We can pass a location to <Switch/> that will tell it to
	// ignore the router's current location and use the location
	// prop instead.
	//
	// We can also use "location state" to tell the app the user
	// wants to go to `/images/2` in a modal, rather than as the
	// main page, keeping the gallery visible behind it.
	//
	// Normally, `/images/2` wouldn't match the gallery at `/`.
	// So, to get both screens to render, we can save the old
	// location and pass it to Switch, so it will think the location
	// is still `/` even though its `/images/2`.
	previousLocation = this.props.location

	componentWillUpdate(nextProps) {
		const {location} = this.props
		// set previousLocation if props.location is not modal
		if (
			nextProps.history.action !== 'POP' &&
			(!location.state || !location.state.modal)
		) {
			this.previousLocation = this.props.location
		}
	}

	render() {
		const {location} = this.props
		const isModal = !!(
			location.state &&
			location.state.modal &&
			this.previousLocation !== location // not initial render
		)
		return (
			<div>
				<Switch location={isModal ? this.previousLocation : location}>
					<Route exact path='/modal' component={Home}/>
					<Route path='/modal/gallery' component={Gallery}/>
					<Route path='/modal/img/:id' component={ImageView}/>
				</Switch>
				{isModal ? <Route path='/modal/img/:id' component={Modal}/> : null}
			</div>
		)
	}
};

export {ModalSwitch}