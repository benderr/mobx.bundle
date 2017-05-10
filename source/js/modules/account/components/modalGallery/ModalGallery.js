import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom'

import {ModalSwitch} from './ModalSwitch'
// This example shows how to render two different screens
// (or the same screen in a different context) at the same url,
// depending on you got there.
//
// Click the colors and see them full screen, then "visit the
// gallery" and click on the colors. Note the URL and the component
// are the same as before but now we see them inside a modal
// on top of the old screen.





const ModalGallery = () => (
	<Router>
		<Route component={ModalSwitch} />
	</Router>
)

export default ModalGallery