const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = process.env.PORT || 3000;


let app = express();

app.use(bodyParser.json());

app.post('/mizerii', (req, res) => {

	let mesaj = {

		text: req.body.text
	};

	res.send(mesaj);

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