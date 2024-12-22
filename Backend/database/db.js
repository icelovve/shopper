import mysql from "mysql2";
import config from "./config.js";


    const connection = mysql.createConnection(config)

    connection.connect((err) => {
        if(err){
            console.error({error:"Error to conneection with database"});
            return;
        }
            console.log("Connect to MySQL database");
            console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_DATABASE, process.env.DB_PORT);
    })


export default connection
