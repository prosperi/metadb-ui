'use strict'

// yr main app
import React from 'react'

import { Provider } from 'react-redux'
import reducers from './reducers'

import { render } from 'react-dom'
import routes from './routes'

import store from './store'

render(<Provider store={store}>{routes}</Provider>, document.querySelector('#app'))

// import React from 'react'
// import { render } from 'react-dom'

// // import yr components
// import TestApp from './components/TestApp'
// import Home from './components/Home'
// import ItemMetadataEditContainer from './components/ItemMetadataEditContainer'

// // router deps
// import Router from 'react-router/lib/Router'
// import Route from 'react-router/lib/Route'
// import IndexRoute from 'react-router/lib/IndexRoute'
// import hashHistory from 'react-router/lib/hashHistory'

// // import { Provider } from 'react-redux'
// // import store, { history } from './store'

// const router = (
// <Router history={hashHistory}>
// 	<Route path="/" component={TestApp}>
// 		<IndexRoute component={Home}/>
// 		<Route path="items/2227mp65f" component={ItemMetadataEditContainer}/>
// 	</Route>
// </Router>
// )

// render(router, document.querySelector('#app'))
