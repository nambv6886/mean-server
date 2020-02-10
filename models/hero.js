const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
  id: Number,
  name: String,
  heroClass: String,
  attack: Number,
  defense: Number,
  imagePath: String
})

module.exports = mongoose.model('Hero', HeroSchema);