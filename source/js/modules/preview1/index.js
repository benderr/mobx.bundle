// Components
import PreviewComponent from './components/previewComponent'

// Stores
import preview1 from './stores/previewStore'


export const stores = {
	preview1
};

export const routes = [
	{
		path: '/preview',
		exact: true,
		component: PreviewComponent
	}
];

