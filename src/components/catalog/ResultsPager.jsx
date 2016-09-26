// uses values from `response.pages` object from Blacklight results
//
// "current_page": 2,
// "next_page": 3,
// "prev_page": 1,
// "total_pages": 924,
// "limit_value": 25,
// "offset_value": 25,
// "total_count": 23088,
// "first_page?": false,
// "last_page?": false

import React from 'react'
import { sprintf } from 'sprintf-js'
import assign from 'object-assign'
import commafy from 'number-with-commas'

const T = React.PropTypes

const ResultsPager = React.createClass({
	propTypes: {
		onNextClick: T.func.isRequired,
		onPreviousClick: T.func.isRequired,

		// there are more values passed from Blacklight, but these
		// are the only ones we really need to populate the
		// `(start) - (end) of (total)` message
		limit_value: T.number.isRequired,
		next_page: T.number,
		offset_value: T.number.isRequired,
		prev_page: T.number,
		total_count: T.number.isRequired,

		// sprintf-js formatted text (which may contain HTML) using named
		// arguments: `start`, `end`, `total`
		// (see: https://github.com/alexei/sprintf.js#named-arguments)
		// note: these are passed strings of EN-US formatted numbers
		// (comma-ed thousands)
		//
		// (default: '%(start)s &ndash; %(end)s of <strong>%(total)s</strong>')
		message: T.string,

		// text used for next/prev buttons 

		// (default: 'Next »')
		nextText: T.string,

		// (default: '« Previous')
		previousText: T.string,

		style: T.object,
	},

	getDefaultProps: function () {
		return {
			next_page: null,
			prev_page: null,
			message: '%(start)s &ndash; %(end)s of <strong>%(total)s</strong>',
			nextText: 'Next »',
			previousText: '« Previous',
		}
	},

	nextButton: function () {
		return this.positionButton(
			this.props.nextText,
			() => this.props.next_page === null,
			this.props.onNextClick,
			this.positionButtonStyles('next')
		)
	},

	pagerText: function () {
		const total = this.props.total_count
		const offset = this.props.offset_value
		const lower = offset + 1

		// prevent the upper-bounds from exceeding the total value
		const upper = Math.min(offset + this.props.limit_value, total)

		const args = {
			start: commafy(lower),
			end: commafy(upper),
			total: commafy(total),
		}

		const msg = sprintf(this.props.message, args)

		// the template currently uses HTML (for a <strong> tag), so we'll need
		// to `dangerouslySetInnerHTML`
		return React.createElement('span', {
			key: 'pager-message',
			dangerouslySetInnerHTML: {__html: msg}
		})
	},

	positionButton: function (text, positionCheck, onClick, style) {
		const atLimit = positionCheck()

		const props = {
			children: text,
			key: text.replace(/\W/g, ''),
			style: assign({}, {
				backgroundColor: 'transparent',
				border: 'none',
				fontSize: '1em',
				outline: 'none',
				cursor: (atLimit ? 'default' : 'pointer'),
			}, style),
		}

		if (!atLimit)
			props.onClick = onClick
		else
			props.disabled = true

		return React.createElement('button', props)
	},

	positionButtonStyles: function (direction) {
		const dir = direction === 'prev' ? 'prev' : 'next'
		const styleDir = dir === 'prev' ? 'Right' : 'Left'

		const style = {
			padding: '0 5px',
		}

		style['border' + styleDir] = '1px solid #000'
		style['margin' + styleDir] = '5px'

		return style
	},

	previousButton: function () {
		return this.positionButton(
			this.props.previousText,
			() => this.props.prev_page === null,
			this.props.onPreviousClick,
			this.positionButtonStyles('prev')
		)
	},

	render: function () {
		const style = assign({}, {
			display: 'inline-block',
		}, this.props.style)

		return React.createElement('div', {style}, [
			this.previousButton(),
			this.pagerText(),
			this.nextButton(),
		])
	}
})

export default ResultsPager
