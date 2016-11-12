const api = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
// const KEY = 'AIzaSyBjxmKCSzOCMM_jqaMD9LyDhVgZKYVb7OY'
// const api = `https://maps.googleapis.com/maps/api/geocode/json?key=${KEY}&latlng=`

const getAddressFromCoords = (latitude, longitude) => {
  const url = `${api}${latitude},${longitude}`
  return fetch(url).then(res => res.json()).then(json => {
    return json.results[0].formatted_address
  })
}

export default getAddressFromCoords
