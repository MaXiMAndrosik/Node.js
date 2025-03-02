const fs = require('fs');
const path = require('path');

function createPerson(name = 'John', surname = 'Doe', age = 30, city = 'New York') {

    person = {
        name: name,
        surname: surname,
        age: age,
        city: city
    };

    try {
        fs.writeFileSync(path.join(__dirname, 'person.json'), JSON.stringify(person, null, 2));
        result = 'Person ' + person.name + ' ' + person.surname + ' created successfully';
    } catch (error) {
        result = 'Couldn\'t create Person' + error.message;
    }

    return result;
}

module.exports = { createPerson };
