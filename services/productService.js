const db = require('../database/db');

async function getAllProducts() {
  return await db.readDb();
}

async function getProductById(id) {
  const products = await db.readDb();
  return products.find((item) => item.id === Number(id));
}

async function createProduct(productData) {
  const products = await db.readDb();
  const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: nextId, ...productData };
  products.push(newProduct);
  await db.writeDb(products);
  return newProduct;
}

async function updateProduct(id, productData) {
  const products = await db.readDb();
  const index = products.findIndex((item) => item.id === Number(id));
  if (index === -1) return null;

  const updatedProduct = { id: Number(id), ...productData };
  products[index] = updatedProduct;
  await db.writeDb(products);
  return updatedProduct;
}

async function patchProduct(id, productData) {
  const products = await db.readDb();
  const index = products.findIndex((item) => item.id === Number(id));
  if (index === -1) return null;

  const patchedProduct = { ...products[index], ...productData, id: Number(id) };
  products[index] = patchedProduct;
  await db.writeDb(products);
  return patchedProduct;
}

async function deleteProduct(id) {
  const products = await db.readDb();
  const index = products.findIndex((item) => item.id === Number(id));
  if (index === -1) return null;

  const [deletedProduct] = products.splice(index, 1);
  await db.writeDb(products);
  return deletedProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};
