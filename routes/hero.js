const express = require('express');
const HeroController = require('../controller/hero');

const Router = express.Router();

Router.get('', HeroController.getAllHero);
Router.get('/search', HeroController.search);
Router.get('/:id', HeroController.getHeroById);
Router.put('', HeroController.updateHero);
Router.post('', HeroController.addHero);
Router.delete('/:id', HeroController.deleteHero);


module.exports = Router;
