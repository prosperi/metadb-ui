import React from 'react'
import assign from 'object-assign'
import { NotificationStack } from 'react-notification'

import Navbar from '../components/Navbar.jsx'


const Main = React.createClass({
	// NotificationStack setup
	// (maybe move this to its own component?)
	getNotifications: function () {
		if (!this.props.notifications.length)
			return

		const notifications = this.props.notifications.map((notification, index) => {
			return {
				dismissAfter: (1000 * 10),
				isActive: true,
				key: 'notification-'+index,
				message: notification.message,
				onClick: this.props.clearNotification.bind(null, index),
				__notificationIndex: index,
			}
		})

		const props = {
			notifications,
			onDismiss: notification => {
				this.props.clearNotification(notification.__notificationIndex)
			},
		}

		return <NotificationStack {...props} />
	},

	render: function () {
		return (
		<div>
			<Navbar />
			{React.Children.map(this.props.children, c => {
				const props = assign({}, this.props, c.props)
				return React.cloneElement(c, props, c.props.children)
			})}

			{this.getNotifications()}
		</div>

		)
	}
})

export default Main
