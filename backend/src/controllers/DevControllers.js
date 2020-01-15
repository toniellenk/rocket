const axios = require('axios');
const Dev = require('../models/Dev')
const parseArrayToString = require('../utils/parseStringToArray')

module.exports = {
    async index(request, response) {
        const listDevs = await Dev.find();
        return response.json(listDevs);
    },

    async delete(request, response) {
        let message = "Dev not found";
        const { github_username } = request.params;

        const devFind = await Dev.findOne({ github_username });

        if (devFind) {
            message = "User Deleted";
            await Dev.deleteOne({ github_username });
        }

        return response.json({ message });
    },

    async store(request, response) {

        const { name, bio, github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username });

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        const techsArray = parseArrayToString(techs);

        if (!dev) {
            const responseGit = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = responseGit.data;

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            console.log(name, avatar_url, bio, github_username, techs);
        }
        else {
            dev = await Dev.updateOne(
                { github_username },
                {
                    name,
                    bio,
                    techs: techsArray,
                    location
                }
            );
        }

        return response.json(dev);
    }
};