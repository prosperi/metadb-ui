// yr main app
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'

import store, { history } from './store'

// pages / wrappers
import App from './App.jsx'
import Home from './pages/Home.jsx'
import WorkEdit from './pages/WorkEdit.jsx'
import About from './pages/About.jsx'

import CollectionWrapper from './pages/CollectionWrapper.jsx'
import CollectionHome from './pages/CollectionHome.jsx'

const MetaDB = (
<Provider store={store}>
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/about" component={About} />

			<Route path="/:collectionId" component={CollectionWrapper}>
				<IndexRoute component={CollectionHome} />
			</Route>

		</Route>
	</Router>
</Provider>
)

render(MetaDB, document.querySelector('#app'))
