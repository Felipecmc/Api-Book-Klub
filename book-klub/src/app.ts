import "reflect-metadata";
import express from "express";
import "express-async-errors";
import categoryRoutes from "./routes/categoriesRoutes";
import clubRouter from "./routes/clubsRoutes";
import userRouter from "./routes/userRoutes";
import booksRoutes from "./routes/bookRoutes";

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/categories", categoryRoutes);
app.use("/clubs", clubRouter);
app.use("/books", booksRoutes);

export default app;
