import sequelizePool from "../helpers/databaseHelper";
import Sequelize from "sequelize";
import Genre from "./genre";

const Track = sequelizePool.define("track",{
    TrackId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name:{
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    MediaTypeId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Composer: Sequelize.STRING(220),
    Milliseconds:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Bytes:Sequelize.INTEGER,
    UnitPrice: {
        type:Sequelize.DOUBLE(10,2),
        allowNull: false
    }

},{timestamps:false})

Track.belongsTo(Genre,{foreignKey: "GenreId"});


export default Track;