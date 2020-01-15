const Dev = require('../models/Dev')
const parseArrayToString = require('../utils/parseStringToArray')


module.exports = {
    async index(resquest, response) {

        const { techs, latitude, longitude } = resquest.query;

        techsArray = parseArrayToString(techs);

        let devsList = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return response.json({ devsList });
    }
};