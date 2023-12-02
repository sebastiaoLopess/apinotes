
const createUsers = `

create table if not exists users(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)

`;

module.exports = createUsers;

// arquivo com o codigo sql que cria uma tabela que sera usado no arquivo que executa a migration

