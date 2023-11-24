const AppError = require("../utils/AppError");
const {hash,compare} = require("bcryptjs");

const sqliteConnection = require("../database/sqlite"); // importando arquivo de conexao com BD

class UsersController{
    async create(request,response){
        const {name,email,password} = request.body; // desestruturando o objeto
        const database = await sqliteConnection(); // instanciando a classe de conexao com BD, usando await por é uma promise
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        console.log(checkUserExists);

        if (checkUserExists){ // verificando se existe algum retorno na consulta feita
            throw new AppError("Este email já existe");
        }

        const hashedPassword = await hash(password, 8); // criptografando senha


        await database.run("INSERT INTO users (name,email,password) VALUES (?,?,?)", [name,email,hashedPassword]); //insert

        return response.status(201).json({name,email,password});

    }

    async update(request, response){
        const {name,email,password,old_password} = request.body;
        const {id} = request.params;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if (!user){
            throw new AppError("usuario nao existe");
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)",[email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("este email ja existe"); 
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;
    

        if(password && !old_password){
            throw new AppError("Voce precisa informar a senha antiga para definir a nova senha");
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password,user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga nao confere");
            }

            user.password = await hash(password,8)
        }



        await database.run("UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') where id = ?",[user.name, user.email,user.password, id]);

        return response.json();
    }
}

module.exports = UsersController

// a classe Controller é uma classe que é responsável por fazer a conexao com o banco de dados e executar os comandos
// de manipulação no banco de dados, geralmente em cada classe Controller tem um insert, um update, um delete, um select