// essentially wrapping yr store to yr main component
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from './actions/'
import Main from './layouts/Main.jsx'

function mapStateToProps (state, ownProps) {
	return {
		fetchingCollection: state.collection.isFetching,
		selectedCollection: state.collection.data,
		
		schema: state.collection.schema,

		fetchingWork: state.work.isFetching,
		selectedWork: state.work.data,
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App
