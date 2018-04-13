
const googleImages = require("google-images");
const request = require("request-promise-native");
const _ = require('lodash');

const client = new googleImages('014687730034597538767:cssm6aogojs','AIzaSyAeiMksjWcX26bqvJorGZfGNaARgbjS5MU');
const url = "https://www.pornhub.com/webmasters/stars_detailed";

module.exports.getDb = async function getDb() {
    let response  = await request.get({url,json:true});
    let newStars = [];
    for (let i=0;i<response.stars.length;i++)
        if (response.stars[i].star.videos_count_all > 250 && response.stars[i].star.gender=="female")
            newStars.push(response.stars[i].star.star_name); 
    return newStars;
};

module.exports.getStar = async function getStar(stars, mode) {
    let i = Math.floor(Math.random()*stars.length);
    let name = stars[i];
    if(mode == undefined) {
        let q = `${name}  pornstar lingerie `;
        let imageUrl = await client.search(q, {size:'xlarge'});
        let pornStar = {
            name: name,
            url: imageUrl[0].url
        }
        return pornStar;
    } else 
        return {name};
};