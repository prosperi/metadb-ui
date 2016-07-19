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

const routes = (
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="works/:workId" component={WorkEdit}/>
		</Route>
	</Router>
)

export default routes
