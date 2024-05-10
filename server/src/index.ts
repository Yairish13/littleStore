import { AppDataSource } from "./data-source";
import { app } from "./app";
import "reflect-metadata";
import { BulkController } from "./controllers/bulk.controller";

const { PORT = 3000 } = process.env;

const start = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    await BulkController.fetchAndCreateBulkData({} as any, {} as any, () => { });

    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  } catch (err) {
    console.log(err, 'err')
    // throw new Error(`Something bad occurred - ${err.message}`);
  }
};

start();