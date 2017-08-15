import React from 'react';
import DefaultLayerLayout from 'components/DefaultLayerLayout';

class TestLayer1 extends DefaultLayerLayout {
	componentDidMount() {
		super.componentDidMount();
		logger.log('TestLayer1 componentDidMount')
	}

	render() {
		logger.log('TestLayer1 render')
		return (
			<article class="page" {...this.layerOptions}>
				<div class="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Title</h1>
				</div>
				<div>Test layer1 page {new Date().toTimeString()}</div>
			</article>)
	}
}


export default TestLayer1;