// Components
import PreviewComponent from './components/previewComponent'

// Stores
import preview2 from './stores/previewStore'


export const stores = {
	preview2
};

export const routes = [
	{
		path: '/preview',
		exact: true,
		component: PreviewComponent
	}
];

