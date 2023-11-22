const express = require("express"); //importando o express

const app = express(); //inicializando o express
app.use(express.json());

/*app.get("/",(request,response) => {
    response.send("Hello Word");
}) // definindo a rota get raiz / ou seja se o usuario acessar somente a url do site vai retornar por padrao oq tiver no raiz */

app.post("/users",(request,response) => {
    const {name,email,password} = request.body;
    //response.send("voce chamou o metodo POST");

    response.json({name,email,password});
}) //definindo uma rota POST para a rota /users, se o usuario chamar a rota /users com o metodo post ira retornar a funcao que definimos

const PORT = 3333; // definindo a porta

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); //"avisando" que o servidor esta online