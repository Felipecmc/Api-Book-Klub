import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

(async () => {
  await AppDataSource.initialize().catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor executando");
  });
})();
