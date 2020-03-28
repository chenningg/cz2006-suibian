import { Sequelize } from "sequelize";
import * as dotenv from "dotenv-extended";
import createRoomQuery from "./rooms";
const path = require("path");

dotenv.load({
    path: path.resolve(__dirname, "../../.env")
});

// //! placeholder db password info
// // connection to db - create models etc.
// const databaseName = process.env.DATABASENAME || "suibian";
// const databaseUsername = process.env.DATABASEUSERNAME || "";
// const databasePassword = process.env.DATABASEPASSWORD || "";
// const databaseUrl = process.env.DATABASEURL;
// const remoteUrl = process.env.REMOTEURL || "";

// let db: Sequelize;
// if (process.env.RUNMODE === "local") {
//     db = new Sequelize(databaseName, databaseUsername, databasePassword, {
//         host: databaseUrl,
//         dialect: "postgres",

//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     });
// } else {
//     console.log("remote database called");
// console.log(remoteUrl);
// const db = new Sequelize(remoteUrl, {
//     dialect: "postgres",
//     protocol: "postgres",
//     dialectOptions: {
//         ssl: true
//     }
// });
// // }

const runTest = async () => {
    console.time("runTest");

    await createRoomQuery().then(data => {
        console.log(`roomcode is ${data}`);
    });

    console.timeEnd("runTest");
};

const runTest2 = async () => {
    console.time("runTest2");

    await createRoomQuery().then(data => {
        console.log(`roomcode is ${data}`);
    });

    console.timeEnd("runTest2");
};

runTest();
runTest2();
