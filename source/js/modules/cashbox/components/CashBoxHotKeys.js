import React from 'react'
import PropTypes from 'prop-types'
import * as hotKeyHelper from '../helpers/hotKeyHelper'
import HotKeyEmptyBlock from './hotKeyTypes/HotKeyEmptyBlock'
import HotKeyWrapper from './hotKeyTypes/HotKeyWrapper'
import KeyShape from './KeyShape';
import {getCordsMask, isValidCord} from '../helpers/hotKeyHelper'

class CashBoxHotKeys extends React.Component {
	constructor(props) {
		super(props);
		const {gridSize}=props;
		const matrix = hotKeyHelper.generateMatrix(gridSize);
		this.state = {gridSize, matrix};
	}

	componentWillReceiveProps(props) {
		const {gridSize}=props;
		const {gridSize:_gridSize}=this.state || {};
		if (_gridSize.width == gridSize.width && _gridSize.height == gridSize.height)
			return;
		const matrix = hotKeyHelper.generateMatrix(gridSize);
		this.setState({gridSize, matrix});
	}

	render() {
		const {keys, selectedKey, onSelectProduct, onOpenCategory, onSelectEmptyKey, onBackFromCategory, loadingProducts}=this.props;
		const {matrix}=this.state;
		const className = ['gk_panel_buttons', selectedKey ? 'cell_selected' : '', loadingProducts ? 'loading_block' : ''].join(' ');

		const otherKeys = keys.filter(s => s.id != (selectedKey || {}).id);
		const testMask = getCordsMask(this.props.gridSize, otherKeys);
		const testMask2 = selectedKey ? getCordsMask(this.props.gridSize, [selectedKey]) : '';
		console.log(testMask);
		console.log(testMask2);

		//let process = true;
		let valid = true;
		let i = 0;
		while (valid && i <= testMask.length - 1) {
			valid = (testMask[i] & testMask2[i]) === 0;
			i++;
		}

		console.log(valid ? 'VALID' : 'INVALID');


		return (
			<div class={className}>
				{matrix.map((arr, i) =>
					arr.map((cords, j) =>
						<HotKeyEmptyBlock cords={cords}
										  selected={selectedKey}
										  onSelectEmptyKey={onSelectEmptyKey}/>)
				)}

				{keys.map((model, i) => (<HotKeyWrapper key={i}
														onBackFromCategory={onBackFromCategory}
														onOpenCategory={onOpenCategory}
														onSelectProduct={onSelectProduct}
														model={model}
														selected={selectedKey}/>))}
			</div>
		)
	}
}

CashBoxHotKeys.propTypes = {
	gridSize: PropTypes.shape({
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired
	}),
	keys: PropTypes.arrayOf(KeyShape).isRequired,
	selectedKey: PropTypes.shape({
		id: PropTypes.string
	}),
	onSelectEmptyKey: PropTypes.func.isRequired,
	onOpenCategory: PropTypes.func.isRequired,
	onBackFromCategory: PropTypes.func.isRequired,
	onSelectProduct: PropTypes.func.isRequired,
	loadingProducts: PropTypes.bool
};

export default CashBoxHotKeys;


