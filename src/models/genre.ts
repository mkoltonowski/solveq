import sequelizePool from "../helpers/databaseHelper";
import Sequelize from "sequelize";
import Track from "./track";

const Genre = sequelizePool.define("genre", {
        GenreId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Name:{
            type: Sequelize.STRING(120),
            allowNull: true
        }
    },
    {timestamps:false})

export default Genre;