import { app } from "./app";
import AppDataSource from "./data-source";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error));
