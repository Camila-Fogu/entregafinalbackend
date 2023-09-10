import express from "express";
//import { uploader } from "../utils.js";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let carts = [];
let cartId = 0;

router.post("/", async (req, res) => {
  try {
    const { products } = req.body;
    cartId = cartId++;

    const newCart = {
      id: cartId,
      products: products,
    };

    /*let cartsData;

        let carts; // Declara 'carts' aquí

        const cartsFilePath = path.join(__dirname, 'carts.json');

        try {

            cartsData = await fs.readFile(cartsFilePath, 'utf-8');

            carts = JSON.parse(cartsData); // Asigna 'carts' aquí

        } catch (error) {

            const initialCartsData = '[]';

            await fs.writeFile(cartsFilePath, initialCartsData, 'utf-8');

            cartsData = initialCartsData;

        }*/

    //leer archivo carts.json (try y catch-> o lee y parsea lo que tiene, y si no lee nada lo crea)

    //pushear nuevo cart

    // escribir lista actualizada al carts.json

    //status 200

    res.status(201).json({
      status: "success",
      message: `Carrito creado con éxito: ${newCart} `,
    });
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear el carrito" });
  }
});

router.get("/", (req, res) => {});

export default router;
