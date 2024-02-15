const { Router } = require('express');
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const upload = multer(uploadConfig.MULTER)

const usersRoutes = Router(); //instanciando a classe Router

const usersController = new UsersController(); //instanciando a classe UsersController
const userAvatarController = new UserAvatarController();

usersRoutes.post('/',usersController.create);
usersRoutes.put('/',ensureAuthenticated,usersController.update);
usersRoutes.patch('/avatar',ensureAuthenticated, upload.single("avatar"),userAvatarController.update);

module.exports = usersRoutes

// quando o arquivo index.js de routes encaminha uma rota, ela vai para aqui nesse arquivo
// entao esse arquivo define qual operacao no banco de dados essa rota vai executar