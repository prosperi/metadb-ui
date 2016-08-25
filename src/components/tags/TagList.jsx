import React from 'react'
import Tag from './Tag.jsx'

const T = React.PropTypes

const TagList = React.createClass({
	propTypes: {
		tags: T.arrayOf(T.string).isRequired,

		className: T.string,
		tagClassName: T.string,

		onTagClick: T.func,
		onTagRemove: T.func,
		readOnly: T.bool,
	},

	getDefaultProps: function () {
		return {
			className: '',
			tagClassName: '',
			readOnly: false,
		}
	},

	handleTagClick: function (tag) {
		this.props.onTagClick && this.props.onTagClick.call(null, tag)
	},

	handleTagRemove: function (tag) {
		this.props.onTagRemove && this.props.onTagRemove.call(null, tag)
	},

	mapTags: function () {
		return this.props.tags.map((tag, index) => {
			const props = {
				key: tag + index,
				readOnly: this.props.readOnly,
				value: tag,
			}

			if (this.props.tagClassName)
				props.className = this.props.className

			if (this.props.onTagRemove)
				props.onRemove = this.handleTagRemove.bind(null, tag)

			if (this.props.onTagClick)
				props.onClick = this.handleTagClick.bind(null, tag)

			return (
				<li className="tag-list-item" key={tag+index}>
					<Tag {...props} />
				</li>
			)
		})
	},

	render: function () {
		return (
			<ul className={[].concat('tag-list', this.props.className).join(' ')}>
				{this.mapTags()}
			</ul>
		)
	}
})

export default TagList
