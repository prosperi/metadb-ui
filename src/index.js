// yr main app
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import Redirect from 'react-router/lib/Redirect'

import store, { history } from './store'

// pages / wrappers
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Vocabularies from './pages/Vocabularies.jsx'
import WorkEdit from './pages/WorkEdit.jsx'

import CollectionWrapper from './pages/CollectionWrapper.jsx'
import CollectionHome from './pages/collection/Home.jsx'
import CollectionBulkEdit from './pages/collection/BulkEdit.jsx'
import EditCollection from './pages/collection/EditCollection.jsx'
import ImportMetadata from './pages/collection/ImportMetadata.jsx'
import ExportMetadata from './pages/collection/ExportMetadata.jsx'

const MetaDB = (
<Provider store={store}>
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />

			<Route path="collections/:collectionId" component={CollectionWrapper}>
				<IndexRoute component={CollectionHome} />

				<Route path="bulk-edit" component={CollectionBulkEdit} />
				<Route path="edit" component={EditCollection} />
				<Route path="import" component={ImportMetadata} />
				<Route path="export" component={ExportMetadata} />

				<Route path="works" onEnter={onEnterCollectionWorks}>
					<Route path=":workId" component={WorkEdit} />
				</Route>
			</Route>

			<Route path="works">
				<Route path=":workId" component={WorkEdit} />
			</Route>

			<Route path="search" component={Search} />

			<Route path="vocabularies" component={Vocabularies} />
		</Route>
	</Router>
</Provider>
)

render(MetaDB, document.querySelector('#app'))

function onEnterCollectionWorks (nextState, replace) {
	const { workId, collectionId } = nextState.params
	if (!workId)
		return replace(`/collections/${collectionId}`)
}
