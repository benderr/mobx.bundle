import React from 'react'
import DefaultLayerLayout from './DefaultLayerLayout'

class LayerLayout extends DefaultLayerLayout {

	render() {
		return (
			<article className="page">
				<div className="page_header header_height_auto">
					<a className="page_close icon-close" onClick={::this.closeLayer}></a>
					<a className="page_expand icon-fullsize"></a>
					<h1>123234234</h1>
				</div>
				<div className="page_content">
					{this.props.children}
				</div>
			</article>
		);
	}
}

export default LayerLayout;