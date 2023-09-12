import express from "express";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const cartsRouter = express.Router();
cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function findLastId() {
  try {
    const cartsFilePath = path.join(__dirname, "carts.json");
    const data = await fs.readFile(cartsFilePath, "utf8");
    const carts = JSON.parse(data);
    const ultimo = carts.length > 0 ? carts[carts.length - 1].id : 0;
    return ultimo;
  } catch {
    return 0;
  }
}

cartsRouter.post("/", async (req, res) => {
  try {
    const { products } = req.body;
    const ultimo = await findLastId();
    const lastId = ultimo > 0 ? ultimo + 1 : 1;

    const newCart = {
      id: lastId,
      products: products,
    };

    const cartsFilePath = path.join(__dirname, "carts.json");

    try {
      const data = await fs.readFile(cartsFilePath, "utf8");
      const carts = JSON.parse(data);
      carts.push(newCart);
      await fs.writeFile(cartsFilePath, JSON.stringify(carts), "utf-8");
    } catch (error) {
      const initialCarts = JSON.stringify([newCart]);
      await fs.writeFile(cartsFilePath, initialCarts, "utf-8");
    }

    res.status(201).json({
      status: "success",
      message: "Carrito creado con éxito",
    });
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear el carrito" });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    let idCart = parseInt(req.params.cid);

    const cartsFilePath = path.join(__dirname, "carts.json");
    const data = await fs.readFile(cartsFilePath, "utf8");
    const carts = JSON.parse(data);

    const cart = carts.find((cart) => cart.id === idCart);

    if (cart) {
      res.json(cart.products);
    } else {
      res.status(400).json({ error: "Carrito no encontrado" });
    }
  } catch {
    res
      .status(500)
      .json({ error: "Error al obtener los productos del carrito" });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const { quantity } = req.body;

    const cartsFilePath = path.join(__dirname, "carts.json");
    const data = await fs.readFile(cartsFilePath, "utf8");
    const carts = JSON.parse(data);

    const cart = carts.find((cart) => cart.id === cartId);
    if (cart) {
      const findProduct = cart.products.find((prod) => prod.id === productId);

      if (findProduct) {
        findProduct.quantity += 1 || quantity;
      } else {
        cart.products.push({ id: productId, quantity: quantity || 1 });
      }

      await fs.writeFile(
        cartsFilePath,
        JSON.stringify(carts, null, 2),
        "utf-8"
      );

      res.json(cart);
    } else {
      res.status(400).json({ error: "Carrito no encontrado" });
    }
  } catch {
    res.status(500).json({ error: "Error al agregar el producto del carrito" });
  }
});

export default cartsRouter;
