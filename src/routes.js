'use strict' 

import React from 'react'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'

import { history } from './store'

// top-level pages etc.
import App from './App.jsx'
import Home from './pages/Home.jsx'
import WorkEdit from './pages/WorkEdit.jsx'
import About from './pages/About.jsx'

import CollectionWrapper from './pages/CollectionWrapper.jsx'
import CollectionHome from './pages/CollectionHome.jsx'

const routes = (
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/about" component={About} />

			<Route path="/:collectionId" component={CollectionWrapper}>
				<IndexRoute component={CollectionHome} />
			</Route>

		</Route>
	</Router>
)

export default routes
