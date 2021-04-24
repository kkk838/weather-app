const request = require('request')

const weatherReport = ({ latitude, longitude }={}, callback) => {
  url = 'http://api.weatherstack.com/current?access_key=25844a810ca619d333f3f70a0b4449c5&query=' + latitude + ',' + longitude + '&units=m'
  request({ url, json: true }, (error, { body }={}) => {
    if (error) {
      callback('Connection problem', undefined)
    } else if (body.error) {
      callback('try with different valid location', undefined)
    } else {
      callback(undefined, body.current)
    }
  })
}

module.exports = weatherReport