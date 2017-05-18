import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'

class AddProductLayout extends DefaultLayerLayout {

	render() {
		return (
			<article className="page">
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToogleButton()}
					<h1>Добавление товара</h1>
				</div>
				{this.props.children}
			</article>
		);
	}
}

export default AddProductLayout;