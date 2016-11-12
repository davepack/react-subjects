////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import './styles'

class RainbowList extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  }

  state = {
    scrollTop: 0,
    viewHeight: window.innerHeight,
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = (e) => {
    const { clientHeight } = e.target
    this.setState({ clientHeight })
  }

  onScroll = (e) => {
    const { scrollTop, clientHeight: viewHeight } = e.target
    console.log(viewHeight)
    this.setState({scrollTop, viewHeight})
    // console.log(e.target.scrollTop)
  }

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const totalHeight = numRows * rowHeight

    const items = []

    const { viewHeight, scrollTop } = this.state
    const scrollBottom = scrollTop + viewHeight

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 20)
    const endIndex = Math.min(numRows, Math.ceil(scrollBottom / rowHeight) + 20)


    let index = startIndex
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
        <div onScroll={this.onScroll}
          style={{ height: '100%', overflow: 'scrollY' }}
          >
          <ol
            style={{ height: totalHeight, paddingTop: this.state.scrollTop }}>
            {items}
          </ol>
        </div>
    )
  }
}

render(
  <RainbowList
    numRows={5000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
