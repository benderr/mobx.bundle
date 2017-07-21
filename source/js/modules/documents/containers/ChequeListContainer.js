import React from 'react'
import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'

import ChequeList from '../components/cheque/ChequeList'


class ChequeListContainer extends React.Component {

	handleOpenFilter() {
		console.log('handleOpenFilter');
	}

	render() {
		return (
			<div>
				<TitlePanel>
					<TitleActions onClick={::this.handleOpenFilter}/>
				</TitlePanel>

				<ChequeList />
				
			</div>
		);
	}

}

export default ChequeListContainer;