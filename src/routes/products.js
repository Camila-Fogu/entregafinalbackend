import express from "express";
//import { uploader } from "../utils.js";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let products = [];
let nextUserId = 1;

router.get("/", (req, res) => {});

router.post("/", (req, res) => {
  try {
    const product = req.body;

    //validaciones

    res.status(201).json({ status: "success", message: "User created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
