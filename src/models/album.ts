import Sequelize from "sequelize";
import sequelizePool from "../helpers/databaseHelper";
import Artist from "./artist";
import Track from "./track";

const Album = sequelizePool.define("album", {
    AlbumId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Title:{
        type: Sequelize.STRING(160),
        allowNull: false
    },
},{timestamps:false})

Album.hasMany(Track, {foreignKey: "AlbumId"})

export default Album;