import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv-extended";
import path from "path";

dotenv.load({
  includeProcessEnv: true,
  path: path.resolve(__dirname, "../.env")
});

const databaseName = process.env.DATABASENAME || "suibian";
const databaseUsername = process.env.DATABASEUSERNAME || "";
const databasePassword = process.env.DATABASEPASSWORD || "";
const databaseUrl = process.env.DATABASEURL;
const remoteUrl = process.env.REMOTEURL || "";

const matchModels = (filename: string, member: string) => {
  return (
    filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
  );
};

let db: Sequelize;
if (process.env.RUNMODE === "local") {
  db = new Sequelize(databaseName, databaseUsername, databasePassword, {
    host: databaseUrl,
    dialect: "postgres",
    modelMatch: matchModels,
    models: [__dirname + "/models"],
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
    modelMatch: matchModels,
    models: [__dirname + "/models"],
    dialectOptions: {
      ssl: true
    }
  });
}

export { db };
