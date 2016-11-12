import React from 'react'
import { render } from 'react-dom'
import createStore from './mini-redux/createStore'
import Provider from './mini-redux/Provider'
import App from './components/App'

const initialState = {
  contacts: [
    { id: 'ryan', first: 'Ryan', last: 'Florence', avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/ryan.jpg' },
  ],
}

const store = createStore((state = initialState, action) => {
  if (action.type === 'CREATE_CONTACT') {
    return Object.assign({}, state, {contacts: [...state.contacts, action.contact]})
  } else {
    return state
  }
})

render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// - shared state (add sidebar)
// - drilling holes (remove action)
// - make store
// - show solution API
