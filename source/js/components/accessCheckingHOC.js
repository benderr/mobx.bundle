import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

export default (Component) => {
	@withRouter
	@connect((state) => ({accessChecking: state.auth.get('accessChecking')}))
	class AccessCheckingHOC extends React.Component {
		static propTypes = {
			accessChecking: PropTypes.bool.isRequired
		};

		render() {
			let className = 'poss';
			if (this.props.accessChecking) {
				className += ' loading_block';
			}

			return (
				<div className={className}>
					{!this.props.accessChecking && <Component {...this.props}/>}
				</div>
			);
		}
	}
	return AccessCheckingHOC;
}