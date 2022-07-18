import {Sequelize} from "sequelize";
import pathHelper from "./pathHelper";
import {config} from "dotenv";

/**GET environmental configuration*/
config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${pathHelper}/database/${process.env.SQLITE_DB_NAME}`
});

export default sequelize;