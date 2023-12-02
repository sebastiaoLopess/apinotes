const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join("");

    sqliteConnection()
        .then(db => db.exec(schemas))
        .catch(error => console.error(error));
}

module.exports = migrationsRun

// arquivo que executa a migration para criacao de uma tabela automatizada