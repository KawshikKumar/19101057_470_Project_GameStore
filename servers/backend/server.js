const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//uncaught error

process.on("uncaughtException",(err)=>{

    console.log(`Error: ${err.message}`);
    console.log(`Uncaught error, shutting server`);
    process.exit(1);

});

//config

dotenv.config({path: "backend/config/config.env" });

//Database connection

connectDatabase()

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});


// unhandled promise rejection error

process.on("unhandledRejection",(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting serever: Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});