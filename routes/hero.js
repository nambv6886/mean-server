const express = require('express');
const HeroController = require('../controller/hero');
const fileMiddleware = require('../middleware/storage-image');
const checkAuth = require("../middleware/check-auth");

const Router = express.Router();

Router.get('', HeroController.getAllHero);
Router.get('/search', checkAuth, HeroController.search);
Router.get('/:id', checkAuth, HeroController.getHeroById);
Router.put('', checkAuth, HeroController.updateHero);
Router.post('', checkAuth, fileMiddleware, HeroController.addHero);
Router.delete('/:id', HeroController.deleteHero);


module.exports = Router;
