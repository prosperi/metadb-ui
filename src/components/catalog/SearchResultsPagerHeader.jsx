import React from 'react'
import ResultsPager from './ResultsPager.jsx'
import Select from '../form-elements/Select.jsx'
import { RESULTS_PAGER as RESULTS_PAGER_MESSAGE} from '../../messages/results'

const T = React.PropTypes

const SearchResultsPagerHeader = React.createClass({
	propTypes: {
		data: T.object.isRequired,
		onNextPage: T.func.isRequired,
		onPreviousPage: T.func.isRequired,
		onPerPageChange: T.func.isRequired,

		perPage: T.number,
		perPageOptions: T.array,
	},

	getDefaultProps: function () {
		return {
			perPage: 25,
			perPageOptions: [25, 50, 100, 250],
		}
	},

	handlePerPageChange: function (val) {
		this.props.onPerPageChange(val)
	},

	perPageOption: function (amount, index) {
		return React.createElement('option', {
			children: amount,
			key: 'per-page-' + index + amount,
			value: amount,
		})
	},

	renderPerPage: function () {
		const containerProps = {
			style: {
				float: 'right',
				width: '75px',
			}
		}

		const selectProps = {
			children: this.props.perPageOptions.map(this.perPageOption),
			key: 'per-page-select',
			onChange: this.handlePerPageChange,
			value: this.props.perPage,
		}

		return (
			<div {...containerProps}>
				<Select {...selectProps} />
			</div>
		)
	},

	render: function () {
		const pagerProps = {
			...this.props.data,
			message: RESULTS_PAGER_MESSAGE,
			onNextClick: this.props.onNextPage,
			onPreviousClick: this.props.onPreviousPage,
		}

		return (
			<div>
				<ResultsPager {...pagerProps}/>

				{this.renderPerPage()}
			</div>
		)
	}
})

export default SearchResultsPagerHeader
