import React from 'react'

import FormElementContainer from '../FormElementContainer.jsx'
import TextInput from '../form-elements/TextInput.jsx'

const T = React.PropTypes

const VocabularyMetadataEdit = React.createClass({
	mapVocabKeys: function () {
		const keys = Object.keys(this.props.data)

		return keys.map((key, index) => {
			const vals = this.props.data[key]

			if (!Array.isArray(vals)) {
				return (
					<FormElementContainer
						label={key}
						multipleValues={false}
						>
						<TextInput
							inputProps={{type: 'readOnly'}}
							value={vals}
						/>
					</FormElementContainer>
				)
			}

			if (!vals.length) vals.push('')

			return (
				<FormElementContainer label={key} key={index}>
					{vals.map((val, index) => (
						<TextInput
							key={key+index+(val || 'empty')}
							value={val}
							/>
					))}
				</FormElementContainer>
			)
		})
	},

	render: function () {
		return (
			<div>
				{this.mapVocabKeys()}
			</div>
		)
	}
})

export default VocabularyMetadataEdit
