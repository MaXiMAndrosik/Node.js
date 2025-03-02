const createPerson = require('./writePerson');
const changePerson = require('./changePerson');
const fs = require('fs');
const path = require('path');

let createResult = createPerson.createPerson();
// let createResult = createPerson.createPerson('testName','testSurname', 23, 'testCity');
console.log(createResult);

let changedPerson = JSON.parse(changePerson.changePerson());

createResult = createPerson.createPerson(changedPerson.name, changedPerson.surname, changedPerson.age, changedPerson.city);
console.log(createResult);
