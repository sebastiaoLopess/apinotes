require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");

const express = require("express"); //importando o express

const routes = require("./routes");

migrationsRun();

const app = express(); //inicializando o express
app.use(express.json());

app.use(routes);



app.use((error,request,response,next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        });
    }

    console.log(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server"
    })
})

const PORT = 3333; // definindo a porta

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); //"avisando" que o servidor esta online