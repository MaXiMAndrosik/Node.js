const fs = require('fs');
const path = require('path');

function changePerson() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'person.json'));
        let chPerson = JSON.parse(data);
        chPerson.age -= 10;
        chPerson.city = 'Ekaterinburg';
        person = chPerson;
    } catch (error) {
        console.error(error);
    }
    return JSON.stringify(person);
}

module.exports = { changePerson };

