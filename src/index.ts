import express from 'express'
import Router from './routes/routes'
import {config} from "dotenv";
import sequelize from "./helpers/databaseHelper";
import bodyParser from "body-parser";

config();

const app = express();
const port = process.env.PORT || 3001;

app.use('/',bodyParser.json());
app.use('/',Router);


/**
 * Initialize object-relation mapper
 */
sequelize.sync()
    .then(result =>{
        app.listen(port);
    })
    .catch(error=>{console.log(error,1)});


