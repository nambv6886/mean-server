let heroes = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

exports.getAllHero = (req, res) => {
  return res.status(200).json(heroes);
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

exports.addHero = (req, res) => {
  const id = heroes[heroes.length - 1].id + 1;
  const data = req.body;
  const newHero = {
    name: data.name,
    id
  }
  heroes.push(newHero);
  return res.status(201).json(newHero);
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
