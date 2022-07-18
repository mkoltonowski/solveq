import Sequelize from "sequelize";
import sequelizePool from "../helpers/databaseHelper";
import Album from "./album";

const Artist = sequelizePool.define('artist', {
    ArtistId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: true
    }
}, { timestamps: false })

Artist.hasMany(Album,{foreignKey:"ArtistId"})

export default Artist;