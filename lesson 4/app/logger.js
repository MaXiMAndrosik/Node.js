const path = require('path')
const fs = require('fs');

function log(params) {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const data = `${day}-${month}-${year} ${hour}:${minutes} ${params.method} ${params.url}`;
    console.log(data);
    fs.appendFile(path.join(__dirname, '../storage/logs/server.log'), data + "\n", function (error) {
        if (error) return console.log(error.message); // если возникла ошибка    
    });
}

module.exports = { log }

