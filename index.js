'use strict'
const getStar = require("./getStars.js");
const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 4200;

let db; 
const app = express();

async function sendStar(db) {
    let pornstar = await getStar.getStar(db,"name");
    console.log("res is: " + pornstar.name);
    return pornstar;
}

getStar.getDb().then(data => {
    console.log("ready");
    db = data;
    app.get('/getStar', (req, res) => {
        console.log("got req");
        sendStar(db)
            .then(pornstar => res.send(pornstar))
            .catch(err => console.log(err));
    })
}).catch(err => console.log("cant init db"));


app.listen(port,() => {
    console.log("started @ " + port);
});

