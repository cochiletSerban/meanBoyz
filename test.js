const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const  cors = require('cors');
const port = process.env.PORT || 3000;


let app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/mizerii', (req, res) => {
	
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
			let listRet = [];
			if (response.data.status === 'ZERO_RESULTS') {
				res.send('No matches found');
			}
			
			response.data.results.forEach((result) => {
				//console.log(result);
				let locatie = [];
				//console.log(result.geometry.location);
				locatie.push(result.geometry.location.lat);
				locatie.push(result.geometry.location.lng);
				let obj = {
					name: result.name,
					location: locatie
				};
				listRet.push(obj);
			});
			res.send(listRet);
		}).catch((e) => {
			if (e.code === 'ENOTFOUND') {
				res.send('Unable to connect to API servers');
			} else {
				res.send(e.message);
			}
		});
	} else {

		let lat = req.body.location.lat;
		let lng = req.body.location.lng;
		let radius = req.body.radius;
		let types = req.body.types;
		let name = req.body.name;

		//console.log(lat, lng, radius, types, name);
		let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&types=${types}&name=${name}&key=AIzaSyD338tPvWw4Oot4eQZ2UNukpjMzyo5jVWM`;
		//console.log("URL: ", placesUrl);
		return axios.get(placesUrl).then((response) => {
			let listRet = [];
			if (response.data.status === 'ZERO_RESULTS') {
				res.send('No matches found');
			}
			
			response.data.results.forEach((result) => {
				//console.log(result);
				let locatie = [];
				//console.log(result.geometry.location);
				locatie.push(result.geometry.location.lat);
				locatie.push(result.geometry.location.lng);
				let obj = {
					name: result.name,
					location: locatie
				};
				listRet.push(obj);
			});
			res.send(listRet);
		}).catch((e) => {
			if (e.code === 'ENOTFOUND') {
				res.send('Unable to connect to API servers');
			} else {
				res.send(e.message);
			}
		});
	}
});

app.get('/cacat', (req, res) => {
	res.send('Ia ba niste pula de la sefu tau');
});

app.post('/weather', (req, res) => {
	let encoded_addr = encodeURIComponent(req.body.address);
	let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_addr}&key=AIzaSyD338tPvWw4Oot4eQZ2UNukpjMzyo5jVWM`
	axios.get(geocodeUrl).then((response) => {
		if (response.data.status === 'ZERO_RESULTS') {
			res.send('No matches found');
		}
		let lat = response.data.results[0].geometry.location.lat;
		let lng = response.data.results[0].geometry.location.lng;
		let weatherUrl = `https://api.darksky.net/forecast/168b93124cf6a91acdb4e172d0226021/${lat},${lng}?units=si`;
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherUrl);
	}).then((response) => {
		let temperature = response.data.currently.temperature;
		let summary = [];
		let temperatureMax = [];
		for(let i = 0; i < 7; i++) {
			summary.push(response.data.daily.data[i].summary);
			temperatureMax.push(response.data.daily.data[i].temperatureMax);
		}
		res.send({
			temperature: `Temperature right now ${temperature}`,
			forecast: {
				Day1: `${summary[0]} Average temperature throughout the day ${temperatureMax[0]}`,
				Day2: `${summary[1]} Average temperature throughout the day ${temperatureMax[1]}`,
				Day3: `${summary[2]} Average temperature throughout the day ${temperatureMax[2]}`,
				Day4: `${summary[3]} Average temperature throughout the day ${temperatureMax[3]}`,
				Day5: `${summary[4]} Average temperature throughout the day ${temperatureMax[4]}`,
				Day6: `${summary[5]} Average temperature throughout the day ${temperatureMax[5]}`,
				Day7: `${summary[6]} Average temperature throughout the day ${temperatureMax[6]}`
			}
		});

	}).catch((e) => {
		if (e.code === 'ENOTFOUND') {
			res.send('Unable to connect to API servers');
		} else {
			res.send(e.message);
		}
	})
});

app.listen(port, () => {
	console.log('Trimiteti fratii mei pe portul 3000');
});