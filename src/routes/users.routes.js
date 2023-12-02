const { Router } = require('express');

const UsersController = require("../controllers/UsersController");


const usersRoutes = Router(); //instanciando a classe Router

const usersController = new UsersController(); //instanciando a classe UsersController

usersRoutes.post('/',usersController.create);
usersRoutes.put('/:id',usersController.update);

module.exports = usersRoutes  

// quando o arquivo index.js de routes encaminha uma rota, ela vai para aqui nesse arquivo
// entao esse arquivo define qual operacao no banco de dados essa rota vai executar