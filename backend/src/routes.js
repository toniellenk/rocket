const { Router } = require('express');
const DevController = require('./controllers/DevControllers')
const SearchController = require('./controllers/SearchControllers')

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.store);
routes.delete('/devs/:github_username', DevController.delete);
routes.get('/search', SearchController.index);

module.exports = routes;