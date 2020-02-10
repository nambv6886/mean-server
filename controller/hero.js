// let heroes = [
//   { id: 11, name: 'Dr Nice', attack: 3, defense: 4, heroClass: 'A' },
//   { id: 12, name: 'Narco', attack: 3, defense: 4, heroClass: 'A' },
//   { id: 13, name: 'Bombasto', attack: 3, defense: 4, heroClass: 'B' },
//   { id: 14, name: 'Celeritas', attack: 3, defense: 4, heroClass: 'B' },
//   { id: 15, name: 'Magneta', attack: 3, defense: 4, heroClass: 'C' },
//   { id: 16, name: 'RubberMan', attack: 3, defense: 4, heroClass: 'C' },
//   { id: 17, name: 'Dynama', attack: 3, defense: 4, heroClass: 'A' },
//   { id: 18, name: 'Dr IQ', attack: 3, defense: 4, heroClass: 'A' },
//   { id: 19, name: 'Magma', attack: 3, defense: 4, heroClass: 'B' },
//   { id: 20, name: 'Tornado', attack: 3, defense: 4, heroClass: 'C' },
//   { id: 20, name: 'Tornado', attack: 3, defense: 4, heroClass: 'C' },
//   { id: 20, name: 'Tornado', attack: 3, defense: 4, heroClass: 'D' },
//   { id: 20, name: 'Tornado', attack: 3, defense: 4, heroClass: 'D' },
//   { id: 20, name: 'Tornado', attack: 3, defense: 4, heroClass: 'A' }
// ];

const Hero = require('../models/hero');

exports.getAllHero = async (req, res) => {
  const heroes = await Hero.find();
  return res.json(heroes);
}

exports.updateHero = (req, res) => {
  const data = req.body;
  let isFound = false;
  heroes.forEach((hero, index) => {
    if (hero.id == data.id) {
      heroes[index] = data;
      isFound = true;
    }
  })
  if (isFound) {
    return res.status(200).json(heroes[hero]);
  }
  return res.status(500).json({
    message: 'Update failed'
  })
}

exports.addHero = async (req, res) => {
  try {
    const data = req.body;
    const url = req.protocol + "://" + req.get('host');
    let fileName = "";
    if (req.file) {
      fileName = req.file.filename
    }
    const newHero = new Hero({
      name: data.name,
      attack: data.attack,
      defense: data.defense,
      heroClass: data.heroClass,
      imagePath: fileName !== "" ? url + "/images/" + fileName : ""
    });
    const result = await newHero.save();
    return res.status(201).json(result);
  } catch (err) {
    console.log('Error: ', err);
    return res.status(500).json({
      message: "Server error"
    })
  }
}

exports.deleteHero = (req, res) => {
  const { id } = req.params;
  const index = heroes.findIndex(hero => hero.id == id);
  heroes.splice(index, 1)
  return res.status(200).json(heroes);
}


exports.getHeroById = (req, res) => {
  const { id } = req.params;
  const hero = heroes.find(hero => hero.id == id);
  if (!hero) {
    return res.status(404).json({
      message: 'Hero Not Found'
    })
  }
  return res.status(200).json(hero);
}

exports.search = (req, res) => {
  const { name } = req.query;
  const heroFound = [];
  heroes.forEach((hero) => {
    if (hero.name.includes(name)) {
      heroFound.push(hero);
    }
  });
  console.log(heroFound);
  return res.status(200).json(heroFound);
}
