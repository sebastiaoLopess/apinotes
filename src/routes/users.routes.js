const { Router } = require('express');

const UsersController = require("../controllers/UsersController");


const usersRoutes = Router(); //instanciando a classe Router

const usersController = new UsersController(); //instanciando a classe UsersController

usersRoutes.post('/',usersController.create);
usersRoutes.put('/:id',usersController.update);

module.exports = usersRoutes  