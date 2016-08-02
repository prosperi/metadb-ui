'use strict'

import React from 'react'

import Wrapper from './form-elements/FormElementWrapper.jsx'
import TextInputField from './form-elements/TextInputField.jsx'

const SEARCH_KEY = 'query'
const FIELD_KEY = 'field'
const COLLECTION_KEY = 'collection'

const T = React.PropTypes

const SearchForm = React.createClass({
	propTypes: {
		onSubmit: T.func.isRequired,
		collections: T.arrayOf(T.shape({
			name: T.string,
			id: T.string,
		})),
		fields: T.array,
		autocomplete: T.bool,
		submitEmpty: T.bool,
		allCollectionsText: T.string,
		allFieldsText: T.string,
		currentCollectionId: T.oneOfType([T.number, T.string]),
	},

	getDefaultProps: function () {
		return {
			autocomplete: false,
			collections: [],
			fields: [],
			submitEmpty: false,
			allCollectionsText: 'All collections',
			allFieldsText: 'Search across all fields'
		}
	},

	handleSubmit: function (ev) {
		ev.preventDefault()

		const val = this.search.value.trim()

		if (!this.search.value && !this.submitEmpty) return

		out[SEARCH_KEY] = this.search.value

		if (this.field.value) out[FIELD_KEY] = this.field.value
		if (this.collection.value) out[COLLECTION_KEY] = this.collection.value

		this.props.onSubmit(out)
	},

	renderCollectionDropdown: function () {
		if (!this.props.collections.length) return

		const activeProject = this.props.currentCollectionId

		const selectProps = {
			ref: e => (this.collection = e),
			key: 'projects',
		}

		if (activeProject) selectProps.value = activeProject

		const collections = this.props.collections.map((c,i) => (
			<option key={c.id+i} value={c.id} children={c.name} />
		))

		collections.unshift(
			<option key={'allcols'}>{this.props.allCollectionsText}</option>
		)

		const select = React.createElement('select', selectProps, collections)

		return (
			<Wrapper label="Choose collection">
				{select}
			</Wrapper>
		)
	},

	renderFieldsDropdown: function () {
		if (!this.props.fields.length) return

		const fields = this.props.fields.map((f,i) => (
			<option key={f+i} value={f} children={f} />
		))

		// add an 'all' field to the top
		fields.unshift(
			<option key={'allfields'}>{this.props.allFieldsText}</option>
		)

		return (
			<Wrapper>
				<select key="fields" name={FIELD_KEY} ref={e => (this.field = e)}>
					{fields}
				</select>
			</Wrapper>
		)
	},

	render: function () {
		return (
			<form onSubmit={this.handleSubmit}>
				<Wrapper>
					<TextInputField
						inputOpts={{
							name: SEARCH_KEY,
							ref: e => (this.search = e),
							autoComplete: this.props.autocomplete ? 'on' : 'off',
						}}
						placeholder="Enter search keywords"
					/>
				</Wrapper>

				{this.renderFieldsDropdown()}

				{this.renderCollectionDropdown()}

				<Wrapper>
					<button type="submit">Search</button>
				</Wrapper>
			</form>

		)
	}
})

export default SearchForm
