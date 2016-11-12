/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> "submits" the form
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onChange> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

class Form extends React.Component {
  static childContextTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    setFieldValue: React.PropTypes.func.isRequired,
  }

  getChildContext = () => {
    return {
      onSubmit: this.props.onSubmit,
      setFieldValue: this.setFieldValue,
    }
  }

  setFieldValue = (name, value) => {
    // console.log(name, value)
    const inputValues = this.state.inputValues.set(name, value)
    this.setState({inputValues})
  }

  state = {inputValues: new Map()}

  render() {
    const renderFieldValues = [];
    this.state.inputValues.forEach((val, key) => {
      renderFieldValues.push(<div key={key}>{key}: {val}</div>)
    })

    return (
      <div>
        {renderFieldValues}
        {this.props.children}
      </div>
    )
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    onSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    return <button onClick={this.context.onSubmit}>{this.props.children}</button>
  }
}

class TextInput extends React.Component {
  static contextTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    setFieldValue: React.PropTypes.func.isRequired,
  }

  state = {
    value: "",
  }

  onKeyUp = (e) => {
    const { keyCode } = e
    // console.log(keyCode)
    if (keyCode === 13) {
      this.context.onSubmit()
    } else if (keyCode > 31) {
      this.context.setFieldValue(this.props.name, this.field.value)
    }
  }

  render() {
    return (
      <input
        ref={(c) => this.field = c}
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyUp={this.onKeyUp}
      />
    )
  }
}

class App extends React.Component {
  handleSubmit = () => {
    alert('YOU WIN!')
  }

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
