const { Router } = require('express');

const NotesController = require("../controllers/NotesController");


const notesRoutes = Router(); //instanciando a classe Router

const notesController = new NotesController(); //instanciando a classe UsersController

notesRoutes.get('/',notesController.index);
notesRoutes.post('/:user_id',notesController.create);
notesRoutes.get('/:id',notesController.show);
notesRoutes.delete('/:id',notesController.delete);

module.exports = notesRoutes  

// quando o arquivo index.js de routes encaminha uma rota, ela vai para aqui nesse arquivo
// entao esse arquivo define qual operacao no banco de dados essa rota vai executar