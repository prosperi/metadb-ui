// essentially wrapping yr store to yr main component
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from './actions/'
import Main from './layouts/Main.jsx'

function mapStateToProps (state, ownProps) {
	return {
		collection: state.collection,
		collections: state.collections,

		error: state.error,

		schema: state.collection.schema,

		search: state.search,

		vocabulary: state.vocabulary,

		work: state.work,
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App
