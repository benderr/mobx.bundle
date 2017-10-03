// Components
import PreviewComponent from './components/previewComponent'

// Stores
import preview01 from './stores/previewStore'
import preview02 from './stores/previewStore'
import preview03 from './stores/previewStore'
import preview04 from './stores/previewStore'
import preview05 from './stores/previewStore'


export const stores = {
	preview01,
	preview02,
	preview03,
	preview04,
	preview05
};

export const routes = [
	{
		path: '/preview',
		exact: true,
		component: PreviewComponent
	}
];

