// essentially wrapping yr store to yr main component
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from './actions/'
import Main from './layouts/Main.jsx'

function mapStateToProps (state, ownProps) {
	return {
		collection: state.collection,

		error: state.error,

		fetchingCollection: state.collection.isFetching,
		fetchingWork: state.work.isFetching,
		
		schema: state.collection.schema,

		work: state.work,
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App
