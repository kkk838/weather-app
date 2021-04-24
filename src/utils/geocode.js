const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2trLTgzOCIsImEiOiJja24xMXJrY3owcmpuMndwY3JvMjJqNHpxIn0.o2o2q75xZHgiIBIQOlm1ag'
	request({ url, json: true }, (error, { body }={}) => {
		if (error) {
			callback('There is connection problem', undefined)

		} else if (body.features.length === 0) {
			callback('Please enter different valid location', undefined)
		} else {
		const data = {
			 latitude: body.features[0].center[1],
			 longitude: body.features[0].center[0],
			 location: body.features[0].place_name
		}
		callback(undefined, data)
		}
	})
}
module.exports = geocode
