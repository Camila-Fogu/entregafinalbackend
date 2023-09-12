import express from "express";
import fs from "fs/promises";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => console.log("Servidor arriba en el puerto 8080"));
