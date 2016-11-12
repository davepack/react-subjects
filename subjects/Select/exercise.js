import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import './styles.css'

const { func, any } = PropTypes


////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>

class Select extends React.Component {
  static childContextTypes = {
    onSelect: func.isRequired,
  }

  static propTypes = {
    onChange: func,
    value: any,
    defaultValue: any
  }

  state = {
    isOpen: false,
  }

  getChildContext = () => {
    return {
      onSelect: this.onSelect,
    }
  }

  onSelect = (value) => {
    console.log(value)
    this.setState({value})
  }

  render() {
    let label
    React.Children.forEach(this.props.children, (child) => {
      if (child.props.value === this.state.value) {
        label = child.props.children
      }
    })

    return (
      <div className="select" onClick={() => this.setState({isOpen: !this.state.isOpen})}>
        <div className="label">{label} <span className="arrow">▾</span></div>
        <div className="options" style={{display: this.state.isOpen ? 'block' : 'none'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}


class Option extends React.Component {
  static contextTypes = {
    onSelect: func.isRequired,
  }
  render() {
    return (
      <div className="option" onClick={() => this.context.onSelect(this.props.value)}>{this.props.children}</div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  }

  setToMintChutney = () => {
   this.setState({selectValue: 'mint-chutney'})
  }

  render() {
    return (
      <div>
        <h1>Select/Option</h1>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={(selectValue) => this.setState({ selectValue })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
