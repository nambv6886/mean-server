const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
  name: String,
  heroClass: String,
  attack: Number,
  defense: Number,
  imagePath: String
})

module.exports = mongoose.Model('Hero', HeroSchema);