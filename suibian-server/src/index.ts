import * as dotenv from "dotenv-extended";
import express from "express";
import router from "./routes/Router";
import path from "path";

const PORT = process.env.PORT || 4000;
dotenv.load({ errorOnMissing: true, includeProcessEnv: true });

const app = express();
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../../suibian-app/public")));
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
