import fs from "fs";

export default class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.nextId = 1;
    this.path = filePath;
  }

  updateProduct(id, updatedFields) {
    const data = fs.readFileSync(this.path, "utf8");
    this.products = JSON.parse(data);
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
      };
      fs.writeFileSync(this.path, JSON.stringify(this.products), "utf8");
      console.log("Producto actualizado:", this.products[productIndex]);
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const data = fs.readFileSync(this.path, "utf8");
    this.products = JSON.parse(data);
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1)[0];
      fs.writeFileSync(this.path, JSON.stringify(this.products), "utf8");
      console.log("Producto eliminado:", deletedProduct);
    } else {
      console.log("Producto no encontrado");
    }
  }
}

/*



productManager.addProduct({
  title: "Producto 1",
  description: "Descripcion de producto 1",
  price: 20,
  thumbnail: "img1.jpg",
  code: "P1",
  stock: 8,
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripcion de producto 2",
  price: 150,
  thumbnail: "img2.jpg",
  code: "P2",
  stock: 10,
});

productManager.addProduct({
  description: "Descripcion de producto 3",
  price: 75,
  thumbnail: "img3.jpg",
  code: "P3",
  stock: 15,
});

console.log("Lista de productos:", productManager.getProduct());

let productById = "";
productById = productManager.getProductById(3);
if (productById) {
  console.log("Producto encontrado", productById);
}

productById = productManager.getProductById(2);
if (productById) {
  console.log("Producto encontrado", productById);
}

productManager.updateProduct(1, {
  title: "Producto 1 Actualizado",
  price: 30,
});

productManager.deleteProduct(2);

console.log("Lista de productos finales:", productManager.getProduct());
*/
