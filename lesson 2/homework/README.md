# Random animal names package

Package for generating names and links (wiki) to animals listed in the Red Book of Russia

## Installation

npm i random-animal-generator

## Usage

    import getAnimal from 'random-animal-generator';

#### Get json

    let animal = getAnimal.get();

Output

    Console.log(animal);

Result

    {
        name: 'Обыкновенный хомяк',

        url: 'https://ru.wikipedia.org/wiki/Обыкновенный_хомяк'
    }

