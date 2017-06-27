import React from 'react';
import PropTypes from 'prop-types';
import * as actions from './actions';
import NotifySystem from 'react-notification-system';
import {connect} from 'react-redux';

class NotifyService extends React.Component {

	componentWillReceiveProps(nextProps) {
		if (!this.notify)
			return;
		const {notifications, dispatch} = nextProps;

		const notificationIds = notifications.map(notification => notification.uid);
		const systemNotifications = this.notify.state.notifications || [];

		if (notifications.length > 0) {
			// Get all active notifications from react-notification-system
			/// and remove all where uid is not found in the reducer
			(systemNotifications).forEach(notification => {
				if (notificationIds.indexOf(notification.uid) < 0) {
					this.notify.removeNotification(notification.uid);
				}
			});

			notifications.forEach(notification => {
				this.notify.addNotification({
					...notification,
					onRemove: () => {
						dispatch(actions.hide(notification.uid));
						notification.onRemove && notification.onRemove();
					}
				});
			});
		}

		if ((this.props.notifications !== notifications) && notifications.length === 0) {
			this.notify.clearNotifications();
		}
	}

	shouldComponentUpdate(nextProps) {
		return this.props !== nextProps;
	}

	render() {
		const {notifications, ...rest} = this.props;

		return (
			<NotifySystem ref={notify => this.notify = notify} { ...rest } />
		);
	}
}

NotifyService.propTypes = {
	notifications: PropTypes.array,
	style: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.object
	]),
	noAnimation: PropTypes.bool,
	allowHTML: PropTypes.bool
};

export default connect(null, (dispatch) => ({
	dispatch
}))(NotifyService)