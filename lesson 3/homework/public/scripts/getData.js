const fs = require('fs');
const path = require('path');

function readData() {
    try {
        let getData = JSON.parse(fs.readFileSync(path.join(__dirname, '../sourses/data.json')));
        return getData;
    } catch (error) {
        console.error(error.message);
        fs.writeFileSync(path.join(__dirname, '../sourses/data.json'), JSON.stringify({index: 0, about: 0}, null, 2));
        console.log('File created successfully');
        return JSON.parse(fs.readFileSync(path.join(__dirname, '../sourses/data.json')));
    }
}

function updateData(data) {
    let saveData = JSON.stringify(data, null, 2);
    try {
        fs.writeFileSync(path.join(__dirname, '../sourses/data.json'), saveData);
        console.log('Data updated successfully');
    } catch (error) {
        console.log('Couldn\'t update data' + error.message);
    }
}


function get(source) {
    let data = readData();
    let counter = 0;
    if (source == 'index') {
        counter = data.index;
        updateData(data, data.index++);
    } else {
        counter = data.about;
        updateData(data, data.about++);
    }
    return counter;
}

module.exports = { get };