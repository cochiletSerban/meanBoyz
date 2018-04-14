const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = process.env.PORT || 3000;


let app = express();

app.use(bodyParser.json());

app.post('/mizerii', (req, res) => {
	
	// console.log(req.body.tip);
	// console.log(req.body.address);
	// console.log(req.body.types);
	// console.log(req.body.radius);
	// console.log(req.body.name);
	//let numeRestaurant;

	if (req.body.tip) {
		let encoded_addr = encodeURIComponent(req.body.address);
		let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_addr}&key=AIzaSyD338tPvWw4Oot4eQZ2UNukpjMzyo5jVWM`
		axios.get(geocodeUrl).then((response) => {
		if (response.data.status === 'ZERO_RESULTS') {
			throw new Error('Unable to find that address');
		}
		let lat = response.data.results[0].geometry.location.lat;
		let lng = response.data.results[0].geometry.location.lng;
		let radius = req.body.radius;
		let types = req.body.types;
		let name = req.body.name;

		//console.log(lat, lng, radius, types, name);
		let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&types=${types}&name=${name}&key=AIzaSyD338tPvWw4Oot4eQZ2UNukpjMzyo5jVWM`;
		//console.log("URL: ", placesUrl);
		return axios.get(placesUrl);
		}).then((response) => {
			if (response.data.status === 'ZERO_RESULTS') {
				res.send('No matches found');
			}
			res.send(response.data.results[0].name);
		}).catch((e) => {
			if (e.code === 'ENOTFOUND') {
				console.log('Unable to connect to API servers');
			} else {
				console.log(e.message);
			}
		});
	}
});

app.listen(port, () => {
	console.log('Trimiteti fratii mei pe portul 3000');
});

// let encoded_addr = encodeURIComponent(argv.address);

// let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_addr}&key=AIzaSyD338tPvWw4Oot4eQZ2UNukpjMzyo5jVWM`

// axios.get(geocodeUrl).then((response) => {
// 	if (response.data.status === 'ZERO_RESULTS') {
// 		throw new Error('Unable to find that address');
// 	}
// 	let lat = response.data.results[0].geometry.location.lat;
// 	let lng = response.data.results[0].geometry.location.lng;
// 	let weatherUrl = `https://api.darksky.net/forecast/168b93124cf6a91acdb4e172d0226021/${lat},${lng}`;
// 	console.log(response.data.results[0].formatted_address);
// 	return axios.get(weatherUrl);
// }).then((response) => {
// 	let temperature = response.data.currently.temperature;
// 	let apparentTemperature = response.data.currently.apparentTemperature;
// 	console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
// }).catch((e) => {
// 	if (e.code === 'ENOTFOUND') {
// 		console.log('Unable to connect to API servers');
// 	} else {
// 		console.log(e.message);
// 	}
// });