import React, { PropTypes } from 'react'
import CreateContactForm from './CreateContactForm'
import connect from '../mini-redux/connect'

const App = React.createClass({
  handleCreateContact(contact) {
    this.props.dispatch({
      type: 'CREATE_CONTACT',
      contact,
    })
  },

  render() {
    return (
      <div>
        <h1>Contacts!</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {this.props.contacts.map((contact) => (
            <li key={contact.id}>
              <img src={contact.avatar} height="50"/>{' '}
              {contact.first} {contact.last}
            </li>
          ))}
          <li><CreateContactForm onCreate={this.handleCreateContact}/></li>
        </ul>

      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  }
}

export default connect(mapStateToProps)(App)
