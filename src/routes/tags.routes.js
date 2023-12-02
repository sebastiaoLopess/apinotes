const { Router } = require('express');

const TagsController = require("../controllers/TagsController");


const tagsRoutes = Router(); //instanciando a classe Router

const tagsController = new TagsController(); //instanciando a classe UsersController

tagsRoutes.get('/:user_id',tagsController.index);

module.exports = tagsRoutes  

// quando o arquivo index.js de routes encaminha uma rota, ela vai para aqui nesse arquivo
// entao esse arquivo define qual operacao no banco de dados essa rota vai executar