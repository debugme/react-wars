import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

import Header from 'Header'
import Content from 'Content'
import Footer from 'Footer'
import reducers from 'Reducers'

import 'GeneralStyle'
import 'LayoutStyle'
import 'ResponsiveStyle'

const Application = () =>
  <div className="container">
    <Header />
    <Content />
    <Footer />
  </div>

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Application />
  </Provider>,
  document.querySelector('#application')
)
