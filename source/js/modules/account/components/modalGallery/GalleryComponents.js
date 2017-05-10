import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom'

export const IMAGES = [
	{id: 0, title: 'Dark Orchid', color: 'DarkOrchid'},
	{id: 1, title: 'Lime Green', color: 'LimeGreen'},
	{id: 2, title: 'Tomato', color: 'Tomato'},
	{id: 3, title: 'Seven Ate Nine', color: '#789'},
	{id: 4, title: 'Crimson', color: 'Crimson'}
]

export const Image = ({color}) => (
	<div style={{
		width: '100%',
		height: 400,
		background: color
	}}></div>
)

export const Gallery = () => {
	console.log('RENDER BACK');
	return (
		<div>
			{new Date().getTime()}
			{IMAGES.map(i => (
				<Link
					key={i.id}
					to={{
						pathname: `/modal/img/${i.id}`,
						// this is the trick!
						state: {modal: true}
					}}
				>
					<Thumbnail color={i.color}/>
					<p>{i.title}</p>
				</Link>
			))}
		</div>
	)
}

export const ImageView = ({match}) => {
	const image = IMAGES[parseInt(match.params.id, 10)]
	if (!image) {
		return <div>Image not found</div>
	}

	return (
		<div>
			<h1>{image.title}</h1>
			<Image color={image.color}/>
		</div>
	)
}

export const Thumbnail = ({color}) =>
	<div style={{
		width: 50,
		height: 50,
		background: color
	}}/>

export const Home = () => (
	<div>
		<Link to='/modal/gallery'>Visit the Gallery</Link>
		<h2>Featured Images</h2>
		<ul>
			<li><Link to='/modal/img/2'>Tomato</Link></li>
			<li><Link to='/modal/img/4'>Crimson</Link></li>
		</ul>
	</div>
)