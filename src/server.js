require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
const cors = require("cors");

const express = require("express"); //importando o express

const routes = require("./routes"); // importando o arquivo routes

migrationsRun();

const app = express(); //inicializando o express
app.use(cors()); // habilitando o cors para possibilitar a integracao com o frontend
app.use(express.json());

app.use('/files',express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes); // apontando para routes



app.use((error,request,response,next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        });
    } //tratando erro de cliente

    console.log(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server"
    }) // tratando erro de servidor
})

const PORT = 3333; // definindo a porta

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); //"avisando" que o servidor esta online