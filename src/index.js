'use strict'

// yr main app
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import routes from './routes'
import store from './store'

render(
<Provider store={store}>
	{routes}
</Provider>
, 
document.querySelector('#app'))
