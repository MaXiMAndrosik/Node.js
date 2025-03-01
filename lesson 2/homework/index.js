const redBookAnimals = require('./red-book-animals-ru.json')
const http = "https://ru.wikipedia.org/wiki/";

function getRandomAnimal() {
    let randomAnimalName = redBookAnimals[~~(Math.random() * redBookAnimals.length)];

    let url = `${http}${randomAnimalName.replaceAll(/\s+/g, '_')}`;

    let result = {
        name: randomAnimalName,
        url: url
    };

    return result;
}

module.exports = { get : getRandomAnimal };