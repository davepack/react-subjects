////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a child render callback that passes
//   to <App> the latitude and longitude state
// - When you're done, <App> should no longer have anything but
//   a render method
// - now create a <GeoAddress> component that also uses a render
//   callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address, it returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render it
// - Make sure GeoAddress supports the user moving positions
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import LoadingDots from './utils/LoadingDots'
import getAddressFromCoords from './utils/getAddressFromCoords'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Geolocation</h1>
        <GeoPosition>
          {({coords, error}) => (
            error ? (
              <div>{error.message}</div>
            ) : (
              <div>
                <dl>
                  <dt>Latitude</dt>
                  <dd>{coords.latitude || <LoadingDots/>}</dd>
                  <dt>Longitude</dt>
                  <dd>{coords.longitude || <LoadingDots/>}</dd>
                </dl>
                {coords.latitude && (
                  <GeoAddress {...coords}>
                    {(address) => (
                      <div>{address}</div>
                    )}
                  </GeoAddress>
                )}
              </div>
            )
          )}
        </GeoPosition>
      </div>
    )
  }
}

class GeoPosition extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    }
  }

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      },
      (error) => {
        this.setState({ error })
      }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId)
  }

  render() {
    console.log(this.state)
    return this.props.children(this.state)
  }
}

class GeoAddress extends React.Component {
  state = {
    address: null
  }

  componentDidMount = () => {
    const { latitude, longitude } = this.props;
    if (latitude && longitude) {
      this.getAddress(latitude, longitude)
    }
  }

  getAddress = (latitude, longitude) => {
    console.log(latitude, longitude)
    const address = getAddressFromCoords(latitude, longitude).then(address => {
      console.log(address)
      this.setState({address})
    })
  }

  render() {
    return this.props.children(this.state.address)
  }
}

render(<App/>, document.getElementById('app'))
