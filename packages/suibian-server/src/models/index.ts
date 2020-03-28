import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv-extended";
import path from "path";

dotenv.load({
    path: path.resolve(__dirname, "../../.env")
});

const databaseName = process.env.DATABASENAME || "suibian";
const databaseUsername = process.env.DATABASEUSERNAME || "";
const databasePassword = process.env.DATABASEPASSWORD || "";
const databaseUrl = process.env.DATABASEURL;
const remoteUrl = process.env.REMOTEURL || "";

let db: Sequelize;
if (process.env.RUNMODE === "local") {
    db = new Sequelize(databaseName, databaseUsername, databasePassword, {
        host: databaseUrl,
        dialect: "postgres",

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
} else {
    db = new Sequelize(remoteUrl, {
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
            ssl: true
        }
    });
}

db.addModels([__dirname + "*.model.ts"]);

export default db;
